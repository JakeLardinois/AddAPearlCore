import { Component } from '@angular/core';

@Component({
  selector: 'pearl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public pageTitle: string = `Welcome to Add-A-Pearl!`;
}
