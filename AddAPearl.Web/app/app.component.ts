import { Component } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

@Component({
    selector: 'pearl-app',
    template: `
    <div><h1>{{pageTitle}}</h1>
    <pearl-companies></pearl-companies>
    </div>
    `
})
export class AppComponent {
    pageTitle: string = `Welcome to Add-A-Pearl!`;    
}