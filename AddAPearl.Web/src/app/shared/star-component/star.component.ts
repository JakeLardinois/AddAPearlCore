import  { Component, OnChanges, Input,
          Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ai-star',
    moduleId: module.id,
    templateUrl: 'star.component.html',
    styleUrls: ['star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;
    starFontSize: number = 20;
    @Output() ratingClicked: EventEmitter<string> =
        new EventEmitter<string>();

    ngOnChanges(): void {
        // A 20px starFontSize evenly divisible for a 5 star max is going to be 100, then a 2px border on each side of the star gives 20
        // 20px font size X 5 star Max = 100 Plus 2px X 2 sides for each star X 5 stars = 20 Which equals 120
        this.starWidth = this.rating * 120 / 5;
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}
