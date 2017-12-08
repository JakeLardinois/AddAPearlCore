import {
	Component,
} from '@angular/core';

@Component({
	moduleId: module.id,
	styles: ['h2 {color: blue;}'],
	templateUrl: 'welcome.component.html',
})
export class WelcomeComponent {
	public pageTitle: string = 'Welcome';
}
