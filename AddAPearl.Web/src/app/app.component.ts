import {
	Component,
} from '@angular/core';

@Component({
    moduleId: module.id,
	selector: 'pearl-app',
    styleUrls: ['app.component.css'],
	templateUrl: 'app.component.html',
})
export class AppComponent {
	public pageTitle: string = `Welcome to Add-A-Pearl!`;
}
