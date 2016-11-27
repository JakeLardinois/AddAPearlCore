import { Component } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

@Component({
    selector: 'pearl-app',
    template: `
    <h1>{{pageTitle}}</h1>
    <button md-icon-button [md-menu-trigger-for]="menu">
        <md-icon>more_vert</md-icon>
    </button>
    <md-menu #menu="mdMenu">
        <a md-menu-item [routerLink]="['/welcome']">Home</a>
        <a md-menu-item [routerLink]="['/companies']">Company List</a>
    </md-menu>
    <div class='container'>
        <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent {
    pageTitle: string = `Welcome to Add-A-Pearl!`;    
}