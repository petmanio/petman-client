import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { extend } from 'lodash';
import { google } from 'google-maps';

import { environment } from '../../../../environments/environment';
import { Pin } from '../../../../../common/shared';

const GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = environment.mapApiKey;

const MAP_DEFAULT_OPTIONS: google.maps.MapOptions = {
  center: {
    lat: 51.014331,
    lng: 14.807052
  },
  zoom: 5
};
const MAP_DEFAULT_ICON = '/assets/icons/placeholder.png';

export interface IGoogleMapComponent {
  createMap(): void;

  initMap(): void;

  triggerResize(): void;

  panToPin(pin: Pin): void;

  panToMarker(marker: google.maps.Marker): void;

  setZoom(level): void;

  clearMap(): void;
}

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnChanges, IGoogleMapComponent {
  @Input() fitBounds = true;
  @Input() options: google.maps.MapOptions;
  @Input() pins: Pin[];
  google: google;
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  bounds: google.maps.LatLngBounds;
  infoWindow: google.maps.InfoWindow;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    GoogleMapsLoader.load(g => {
      this.google = g;
      this.createMap();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.initMap();
    }
  }

  createMap(): void {
    this.map = new this.google.maps.Map(this.el.nativeElement, extend({}, MAP_DEFAULT_OPTIONS, this.options));
    this.bounds = new google.maps.LatLngBounds();
    this.infoWindow = new google.maps.InfoWindow();
    this.initMap();
  }

  initMap(): void {
    this.clearMap();
    this.markers = this.pins.map(pin => {
      const marker = this.createMarker(pin);
      if (this.fitBounds) {
        this.bounds.extend(marker.getPosition());
      }
      return marker;
    });

    if (this.fitBounds) {
      this.map.fitBounds(this.bounds);
    }
  }

  createMarker(pin: Pin): google.maps.Marker {
    const pinMarkerOptions = {
      position: new this.google.maps.LatLng(pin.lat, pin.lng),
      map: this.map,
      title: pin.title,
      icon: {
        url: (pin.icon && pin.icon.path) || MAP_DEFAULT_ICON,
        scaledSize: new google.maps.Size(
          (pin.icon && pin.icon.width) || 32,
          (pin.icon && pin.icon.height) || 32,
        )
      },
      pin
    };

    const marker = new this.google.maps.Marker(pinMarkerOptions);

    if (pin.infoWindow) {
      marker.addListener('click', () => {
        this.infoWindow.setOptions({
          content: pin.infoWindow.contentFn(pin),
          maxWidth: pin.infoWindow.maxWidth
        });
        this.infoWindow.open(this.map, marker);
        this.panToMarker(marker);
      });
    }

    return marker;
  }

  triggerResize(): void {
    if (this.map) {
      this.google.maps.event.trigger(this.map, 'resize');
    }
  }

  panToPin(pin: Pin): void {
    const found = this.markers.find(marker => marker['pin'] === pin);
    if (found) {
      this.map.panTo(found.getPosition());
    }
  }

  panToMarker(marker: google.maps.Marker): void {
    this.map.panTo(marker.getPosition());
  }

  setZoom(level): void {
    this.map.setZoom(level);
  }

  clearMap(): void {
    while (this.markers.length) {
      this.markers.pop().setMap(null);
    }
  }
}
