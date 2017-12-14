import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerListComponent } from './customer-list.component';
import { MaterialModule } from '../shared/material.module';
import { MdlModule } from '@angular-mdl/core';
import { CustomerFilterPipe } from './customer-filter.pipe';
import {  HttpClient, HttpHandler } from '@angular/common/http';
import { Logger } from 'angular2-logger/core';
import {
  CustomerService,
} from '../shared/index';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('CustomerListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        MdlModule,
      ],
      declarations: [
        CustomerListComponent,
        CustomerFilterPipe,
      ],
      providers: [
        CustomerService,
        HttpClient,
        HttpHandler,
        Logger,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CustomerListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
