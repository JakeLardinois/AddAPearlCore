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
var company_service_1 = require('./company.service');
var CompanyListComponent = (function () {
    function CompanyListComponent(_companyService) {
        this._companyService = _companyService;
        this.pageTitle = 'Company List';
    }
    CompanyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._companyService.getCompanies()
            .subscribe(function (companies) { return _this.companies = companies; }, function (error) { return _this.errorMessage = error; });
    };
    CompanyListComponent.prototype.clicked = function (address) {
        alert(address.addressLine1);
    };
    CompanyListComponent = __decorate([
        core_1.Component({
            selector: 'pearl-companies',
            templateUrl: 'app/companies/company-list.component.html'
        }), 
        __metadata('design:paramtypes', [company_service_1.CompanyService])
    ], CompanyListComponent);
    return CompanyListComponent;
}());
exports.CompanyListComponent = CompanyListComponent;
//# sourceMappingURL=company-list.component.js.map