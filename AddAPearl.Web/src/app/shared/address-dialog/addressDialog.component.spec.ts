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
  AddressService,
  AddressDialog
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

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent],
})
class TestModule {}

describe('AddressDialog', () => {
  let overlayContainerElement: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        TestModule,
      ],
      declarations: [
        AddressDialog,
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
        AddressService,
        Logger,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AddressDialog],
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
    expect(overlayContainerElement.innerHTML).toContain(`Address Line 1`);


    // const fixture = TestBed.createComponent(AddressDialog);
    // const app = fixture.debugElement.componentInstance;
    // expect(app).toBeTruthy();
  }));

});
