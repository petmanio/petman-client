import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharedService {
  constructor(private http: HttpClient) {
  }
}
