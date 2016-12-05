import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'welcome.component.html',
    styles: ['h2 {color: blue;}']
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
}
