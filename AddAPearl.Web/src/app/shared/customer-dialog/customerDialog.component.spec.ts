import {
    TestBed,
    async
  } from '@angular/core/testing';
  import {
    MaterialModule
  } from '../../shared/material.module';
  import {
    HttpClientModule
  } from '@angular/common/http';
  import {
    Logger
  } from 'angular2-logger/core';
  import {
    CustomerService,
    CompanyService,
    CustomerDialog
  } from '../../shared/index';
  import {
    NO_ERRORS_SCHEMA,
    NgModule
  } from '@angular/core';
  import {
    OverlayContainer
  } from '@angular/cdk/overlay';
  import {
    BrowserDynamicTestingModule
  } from '@angular/platform-browser-dynamic/testing';
  import {
    TestComponent
  } from './test.component';
  import {
    BrowserAnimationsModule
  } from '@angular/platform-browser/animations';
  import {
    FormsModule,
    ReactiveFormsModule,
  } from '@angular/forms';
  
  @NgModule({
    declarations: [TestComponent],
    entryComponents: [TestComponent],
    exports: [TestComponent],
  })
  class TestModule {}
  
  describe('CustomerDialog', () => {
    let overlayContainerElement: HTMLElement;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          HttpClientModule,
          MaterialModule,
          TestModule,
          FormsModule,
          ReactiveFormsModule,
        ],
        declarations: [
            CustomerDialog,
        ],
        providers: [{
            provide: OverlayContainer,
            useFactory: () => {
              overlayContainerElement = document.createElement('div');
              return {
                getContainerElement: () => overlayContainerElement
              };
            }
          },
          CustomerService,
          CompanyService,
          Logger,
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [CustomerDialog],
        },
      }).compileComponents();
    }));
    beforeEach(async(() => {
  
    }));
    it('should create the app', async(() => {
      let component = TestBed.createComponent(TestComponent);
      component.componentInstance.upgrade();
      let dialogRef = component.componentInstance.dialogRef;
  
      //expect(overlayContainerElement.textContent).toContain(`Address Line 1`);
      expect(overlayContainerElement.innerHTML).toContain(`First Name`);
  
  
      // const fixture = TestBed.createComponent(AddressDialog);
      // const app = fixture.debugElement.componentInstance;
      // expect(app).toBeTruthy();
    }));
  
  });
  