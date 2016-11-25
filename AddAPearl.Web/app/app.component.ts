import { Component } from '@angular/core';

@Component({
    selector: 'pearl-app',
    template: `
    <div><h1>{{pageTitle}}</h1>
    <button md-button>My Angular Material Button!!</button>
    </div>
    `
})
export class AppComponent {
    pageTitle: string = `Welcome to Add-A-Pearl!`;
}