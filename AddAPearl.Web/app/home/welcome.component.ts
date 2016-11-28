import { Component } from '@angular/core';

@Component({
    templateUrl: 'app/home/welcome.component.html',
    styles: ['h2 {color: blue;}']
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
}