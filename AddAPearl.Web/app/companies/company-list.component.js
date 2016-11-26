"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var CompanyListComponent = (function () {
    function CompanyListComponent() {
        this.pageTitle = 'Company List';
        this.companies = [
            {
                "companyId": 1,
                "companyName": "Jake Lardinois LLC"
            },
            {
                "companyId": 2,
                "companyName": "Draeb Jewelers"
            },
            {
                "companyId": 3,
                "companyName": "Connor Jewelers"
            }
        ];
    }
    CompanyListComponent.prototype.clicked = function (message) {
        alert(message);
    };
    CompanyListComponent = __decorate([
        core_1.Component({
            selector: 'pearl-companies',
            templateUrl: 'app/companies/company-list.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CompanyListComponent);
    return CompanyListComponent;
}());
exports.CompanyListComponent = CompanyListComponent;
//# sourceMappingURL=company-list.component.js.map