import * as MediumEditor from 'medium-editor';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-medium-editor',
  templateUrl: './medium-editor.component.html',
  styleUrls: ['./medium-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MediumEditorComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MediumEditorComponent), multi: true }
  ]
})
export class MediumEditorComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Input()
  value = '';
  @Input()
  readonly = false;
  @Input()
  options: MediumEditor.CoreOptions = {
    placeholder: false,
    targetBlank: true,
    spellcheck: false,
    toolbar: {
      buttons: ['bold', 'italic', 'quote', 'orderedlist', 'unorderedlist', 'anchor', 'removeFormat']
    }
  };
  @ViewChild('editor')
  el: ElementRef;
  editor: MediumEditor.MediumEditor;
  propagateChange: any = () => {};
  propagateTouch: any = () => {};
  validateFn: any = () => {};

  constructor() {}

  get valueLocal() {
    return this.value;
  }

  set valueLocal(val) {
    this.value = val;
    this.propagateChange(val);
  }

  @HostListener('click')
  click() {
    this.propagateTouch();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.readonly) {
      return;
    }
    this.editor = new MediumEditor(this.el.nativeElement, this.options);
    this.editor.subscribe('editableInput', (event, editable) => {
      this.valueLocal = editable.innerHTML;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.propagateChange(this.value);
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouch = fn;
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }
}
