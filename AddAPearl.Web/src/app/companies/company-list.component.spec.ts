import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyListComponent } from './company-list.component';
import { MaterialModule } from '../shared/material.module';
import { MdlModule } from '@angular-mdl/core';
import { CompanyFilterPipe } from './company-filter.pipe';
import {  HttpClient, HttpHandler } from '@angular/common/http';
import { Logger } from 'angular2-logger/core';
import {
  CompanyService,
} from '../shared/index';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('CompanyListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        MdlModule,
      ],
      declarations: [
        CompanyListComponent,
        CompanyFilterPipe,
      ],
      providers: [
        CompanyService,
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
    const fixture = TestBed.createComponent(CompanyListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
