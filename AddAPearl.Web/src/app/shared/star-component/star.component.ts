import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
} from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'ai-star',
	styleUrls: ['star.component.css'],
	templateUrl: 'star.component.html',
})

export class StarComponent implements OnChanges {
	@Input() public rating: number;
	public starWidth: number;
	public starFontSize: number = 20;
	@Output() public ratingClicked: EventEmitter < string > = new EventEmitter < string > ();

	public ngOnChanges(): void {
		// A 20px starFontSize evenly divisible for a 5 star max is going to be 100, then a 2px border on each side of the star gives 20
		// 20px font size X 5 star Max = 100 Plus 2px X 2 sides for each star X 5 stars = 20 Which equals 120
		this.starWidth = this.rating * 120 / 5;
	}

	public onClick(): void {
		this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
	}
}
