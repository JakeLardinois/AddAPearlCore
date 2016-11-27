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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var router_1 = require('@angular/router');
var company_service_1 = require('./company.service');
var company_list_component_1 = require('./company-list.component');
var CompanyModule = (function () {
    function CompanyModule() {
    }
    CompanyModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                material_1.MaterialModule.forRoot(),
                router_1.RouterModule.forChild([
                    { path: 'companies', component: company_list_component_1.CompanyListComponent }
                ])
            ],
            declarations: [
                company_list_component_1.CompanyListComponent
            ],
            providers: [
                company_service_1.CompanyService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CompanyModule);
    return CompanyModule;
}());
exports.CompanyModule = CompanyModule;
//# sourceMappingURL=company.module.js.map