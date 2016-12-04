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
var material_1 = require('@angular/material');
var addressDialog_component_1 = require('../shared/addressDialog.component');
var company_service_1 = require('../shared/services/company.service');
var CompanyListComponent = (function () {
    function CompanyListComponent(_companyService, dialog, snackBar) {
        this._companyService = _companyService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.pageTitle = 'Company List';
        this.listFilter = null;
    }
    CompanyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._companyService.getCompanies()
            .subscribe(function (companies) { return _this.companies = companies; }, function (error) { return _this.errorMessage = error; });
    };
    CompanyListComponent.prototype.clicked = function (companyName, address) {
        var _this = this;
        //alert(address.addressLine1);
        this.dialogRef = this.dialog.open(addressDialog_component_1.AddressDialog, {
            disableClose: false
        });
        this.dialogRef.componentInstance.addressName = companyName;
        this.dialogRef.componentInstance.address = address;
        this.dialogRef.afterClosed().subscribe(function (result) {
            console.log('result: ' + result);
            _this.dialogRef = null;
        });
    };
    CompanyListComponent.prototype.onRatingClicked = function (message) {
        var config = new material_1.MdSnackBarConfig();
        //config.duration = 1;
        this.snackBar.open(message, 'Dismiss', config);
        this.pageTitle = 'Product List: ' + message;
    };
    CompanyListComponent = __decorate([
        core_1.Component({
            selector: 'pearl-companies',
            moduleId: module.id,
            templateUrl: 'company-list.component.html',
            styleUrls: ['company-list.component.css']
        }), 
        __metadata('design:paramtypes', [company_service_1.CompanyService, material_1.MdDialog, material_1.MdSnackBar])
    ], CompanyListComponent);
    return CompanyListComponent;
}());
exports.CompanyListComponent = CompanyListComponent;
//# sourceMappingURL=company-list.component.js.map