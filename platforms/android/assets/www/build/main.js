webpackJsonp([0],{

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic2_pincode_input__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, pincodeCtrl, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pincodeCtrl = pincodeCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.storage = navParams.get('storage');
    }
    SettingsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.storage.get('password_encrypt').then(function (pwd) {
            _this.pincode = String(pwd);
        });
        this.storage.get('faio').then(function (result) {
            if (result !== undefined) {
                _this.faio = result;
            }
        });
    };
    SettingsPage.prototype.toggleFaio = function () {
        this.storage.set('faio', this.faio);
        this.presentAlert("Touch ID", "Nova configuração de Touch ID efetuada. Reinicie a aplicação para concluir.");
    };
    SettingsPage.prototype.resetPassword = function () {
        this.openPinCode(false);
    };
    SettingsPage.prototype.cleanReset = function () {
        this.storage.remove('password_encrypt');
        this.storage.set('faio', false);
        this.storage.remove('token');
        this.storage.remove('key');
        this.storage.remove('users');
        this.presentAlert("Feito", "Todos os seus dados foram removidos. Reinicie a aplicação para terminar.");
    };
    SettingsPage.prototype.cleanHistory = function () {
        var _this = this;
        this.storage.remove('history').then(function (val) {
            _this.storage.set('history', []);
            _this.presentAlert("Feito", "O seu histórico foi removido.");
        });
    };
    SettingsPage.prototype.cleanToken = function () {
        this.storage.remove('token');
        this.storage.remove('key');
        this.presentAlert("Feito", "Chave única apagada. Reinicie a aplicação para terminar.");
    };
    SettingsPage.prototype.openPinCode = function (register) {
        var _this = this;
        var title = "Insira o seu PIN";
        if (register)
            title = "Insira o seu novo PIN";
        var pinCode = this.pincodeCtrl.create({
            title: title,
            passSize: 6,
            hideForgotPassword: true,
            hideCancelButton: false,
            enableBackdropDismiss: true
        });
        pinCode.present();
        pinCode.onDidDismiss(function (code, status) {
            // If user enter a password and the fase if confirm
            // do a login
            if (status === 'done' && !register) {
                _this.login(code);
            }
            else if (status === 'done' && register) {
                _this.newPincode = code;
                // Confirm if pincodes match
                _this.confirmCode();
            }
        });
    };
    SettingsPage.prototype.login = function (pincode) {
        var _this = this;
        var entered_pincode = String(__WEBPACK_IMPORTED_MODULE_3_crypto_js___default.a.SHA256(pincode));
        this.storage.get('password_encrypt').then(function (pwd) {
            var stored_pincode = String(pwd);
            console.log("Stored password: " + stored_pincode);
            if (entered_pincode == stored_pincode) {
                _this.presentAlert("Novo PIN", "Configure o seu novo PIN");
                _this.openPinCode(true);
            }
            else {
                _this.presentAlert("Erro", "PIN errado");
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    SettingsPage.prototype.confirmCode = function () {
        var _this = this;
        var pinCode = this.pincodeCtrl.create({
            title: 'Confirme o seu novo PIN',
            passSize: 6,
            hideForgotPassword: true,
            hideCancelButton: false,
            enableBackdropDismiss: true
        });
        pinCode.present();
        pinCode.onDidDismiss(function (code, status) {
            if (status === 'done') {
                if (_this.newPincode == code) {
                    // if match send a message and do a registration of pin code
                    _this.presentAlert("PIN", "Novo PIN configurado!");
                    _this.register();
                }
                else {
                    _this.presentAlert("Erro!", "Os PINs inseridos não são iguais. Tente novamente.");
                    _this.openPinCode(true);
                }
            }
        });
    };
    SettingsPage.prototype.resetToken = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Apagar chave",
            subTitle: "Tem a certeza que quer apagar a chave? Esta ação não pode ser desfeita.",
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Apagar',
                    handler: function () {
                        _this.cleanToken();
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsPage.prototype.resetAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Apagar dados",
            subTitle: "Tem a certeza que quer apagar os dados? Esta ação não pode ser desfeita.",
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Apagar',
                    handler: function () {
                        _this.cleanReset();
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsPage.prototype.presentAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ["OK"]
        });
        alert.present();
    };
    SettingsPage.prototype.register = function () {
        var _this = this;
        var hash = String(__WEBPACK_IMPORTED_MODULE_3_crypto_js___default.a.SHA256(this.newPincode));
        this.storage.remove('password_encrypt').then(function (done) {
            console.log("Nova password");
            _this.storage.set('password_encrypt', hash);
            console.log(hash);
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'settings',template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar color="favorite">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title text-center>\n      Definições\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-list-header>\n      Segurança e Privacidade\n    </ion-list-header>\n    <button ion-item (click)="resetPassword()">\n      <ion-icon name="lock" item-start></ion-icon>\n      Alterar o PIN\n    </button>\n    <ion-item>\n        <ion-label>Touch ID</ion-label>\n        <ion-icon name="finger-print" item-start></ion-icon>\n        <ion-toggle [(ngModel)]="faio" (ionChange)="toggleFaio()"></ion-toggle>\n    </ion-item>\n    <ion-list-header>\n      Dados pessoais\n    </ion-list-header>\n    <button ion-item block outline color="danger" (click)="cleanHistory()">\n      Apagar histórico\n  </button>\n    <button ion-item block outline color="danger" (click)="resetToken()">\n        Apagar chave única\n    </button>\n    <button ion-item block outline color="danger" (click)="resetAlert()">\n        Apagar todos os dados\n    </button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic2_pincode_input__["PincodeController"], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 225:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 225;

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DetailsPage = /** @class */ (function () {
    function DetailsPage(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.colors = {
            alerta: 'orange',
            notificacao: '#143363'
        };
        this.item = params.get('item');
        this.date1 = new Date(Date.parse(this.item.validade[1]));
    }
    DetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/details/details.html"*/'<ion-header>\n  <ion-navbar color="primary">\n      <ion-title>\n        Mensagem\n      </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <b><h2>{{item.titulo}}</h2></b>\n  <div [ngStyle]="{\'border-color\': colors[item.tipo]}" style="border:solid; display: inline-block; border-radius: 10px">\n    <h6 [ngStyle]="{\'color\': colors[item.tipo]}" style="padding: 8px 2px 2px 0px">{{item.tipo}}</h6>\n  </div>\n  <h4 style="color:gray"> {{item.entidade}}</h4>\n  <ion-card-content>\n    {{item.conteudo}}\n  </ion-card-content>\n  <div style="border: solid; border-color:gray; padding: 20px 10px">\n      <h6 style="color:gray">{{item["linha-1"]}}</h6>\n      <h6 style="color:gray">{{item["linha-2"]}}</h6>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/details/details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], DetailsPage);
    return DetailsPage;
}());

//# sourceMappingURL=details.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage(navParams, menuCtrl) {
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */];
        this.tabParams = {
            storage: this.navParams.get('storage')
        };
    }
    TabsPage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/tabs/tabs.html"*/'<!--<ion-tabs color="favorite">\n  <ion-tab [root]="tab1Root" [rootParams]="tabParams" tabTitle="Início" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" [rootParams]="tabParams" tabTitle="QR" tabIcon="qr-scanner"></ion-tab>\n  <ion-tab [root]="tab3Root" [rootParams]="tabParams" tabTitle="Histórico" tabIcon="paper"></ion-tab>\n  <ion-tab [root]="tab4Root" [rootParams]="tabParams" tabTitle="Definições" tabIcon="construct"></ion-tab>\n</ion-tabs>-->\n'/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_home_service__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var KeyPage = /** @class */ (function () {
    function KeyPage(navCtrl, storage, homeService, alertCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.homeService = homeService;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.show = false;
    }
    KeyPage.prototype.ionViewDidEnter = function () {
        this.menuCtrl.swipeEnable(false);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(false, 'menu1');
    };
    KeyPage.prototype.ionViewWillLeave = function () {
        // Don't forget to return the swipe to normal, otherwise 
        // the rest of the pages won't be able to swipe to open menu
        this.menuCtrl.swipeEnable(true);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    };
    KeyPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('key').then(function (pwd) {
            if (pwd) {
                _this.storage.get('token').then(function (pwd2) {
                    if (pwd2) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */], {
                            storage: _this.storage
                        });
                    }
                    else {
                        _this.showT = true;
                    }
                });
            }
            else {
                _this.show = true;
            }
        });
    };
    KeyPage.prototype.toggleKey = function () {
        var _this = this;
        if (this.key != undefined) {
            this.homeService.getToken(this.key).subscribe(function (response) {
                _this.error = response;
                console.log(response);
                if (_this.error.status == "error") {
                    var alert_1 = _this.alertCtrl.create({
                        title: "ERRO",
                        subTitle: "Chave única errada",
                        buttons: [
                            {
                                text: 'Ok',
                                role: 'ok'
                            }
                        ]
                    });
                    alert_1.present();
                }
                else {
                    _this.show = false;
                    _this.showT = true;
                }
            });
        }
    };
    KeyPage.prototype.toggleBC = function () {
        this.show = true;
        this.showT = false;
    };
    KeyPage.prototype.toggleBA = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__auth_auth__["a" /* AuthPage */], {});
    };
    KeyPage.prototype.toggleToken = function () {
        var _this = this;
        if ((this.key != undefined) && (this.token != undefined)) {
            this.homeService.getPosts(this.key, this.token).subscribe(function (response) {
                _this.item = response;
                console.log(_this.item.status);
                if (_this.item.status == "error") {
                    var alert_2 = _this.alertCtrl.create({
                        title: "ERRO",
                        subTitle: "Token errado",
                        buttons: [
                            {
                                text: 'Ok',
                                role: 'ok'
                            }
                        ]
                    });
                    alert_2.present();
                }
                else {
                    var array = [];
                    _this.storage.set('key', _this.key);
                    _this.storage.set('history', array);
                    _this.storage.set('token', _this.token);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */], {
                        storage: _this.storage
                    });
                }
            });
        }
    };
    KeyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'key',template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/key/key.html"*/'<ion-header>\n    <ion-navbar color="favorite">\n      <ion-title text-center>\n          Chave Móvel Digital\n      </ion-title>\n    </ion-navbar>\n</ion-header>\n  \n<ion-content padding>\n    <div *ngIf="show">\n        <form (ngSubmit)="toggleKey()">\n            <ion-item>\n                <ion-label>Chave Móvel Digital:</ion-label>\n                <ion-textarea [(ngModel)]="key" name="key"></ion-textarea>\n            </ion-item>\n            <button ion-button type="submit" block style="background-color: #143363;">Confirmar</button>\n        </form>\n        <form (ngSubmit)="toggleBA()">\n            <button ion-button type="submit" block style="background-color: #143363;">Voltar Atrás</button>\n        </form>\n    </div>  \n    <div *ngIf="showT">\n        <form (ngSubmit)="toggleToken()">\n            <ion-item>\n            <ion-label>Token:</ion-label>\n            <ion-textarea [(ngModel)]="token" name="token"></ion-textarea>\n            </ion-item>\n            <button ion-button type="submit" block style="background-color: #143363;">Confirmar</button>\n        </form>\n        <form (ngSubmit)="toggleBC()">\n            <button ion-button type="submit" block style="background-color: #143363;">Voltar Atrás</button>\n        </form>\n    </div>\n</ion-content>\n  '/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/key/key.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__app_services_home_service__["a" /* HomeService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */]])
    ], KeyPage);
    return KeyPage;
}());

//# sourceMappingURL=key.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlidesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_home_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SlidesPage = /** @class */ (function () {
    function SlidesPage(navCtrl, storage, homeService, alertCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.homeService = homeService;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
    }
    SlidesPage.prototype.ionViewDidEnter = function () {
        this.menuCtrl.swipeEnable(false);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(false, 'menu1');
    };
    SlidesPage.prototype.ionViewWillLeave = function () {
        // Don't forget to return the swipe to normal, otherwise 
        // the rest of the pages won't be able to swipe to open menu
        this.menuCtrl.swipeEnable(true);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    };
    SlidesPage.prototype.goToSlide = function () {
        this.slides.slideTo(2, 500);
    };
    SlidesPage.prototype.entrar = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__auth_auth__["a" /* AuthPage */], {});
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
    ], SlidesPage.prototype, "slides", void 0);
    SlidesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'slides',template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/slides/slides.html"*/'<ion-header style="color:#143363">\n    <ion-navbar color="white">\n        <ion-title text-center>\n            Serviço Público de Notificações Eletrónicas\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n  \n<ion-content padding>\n    <ion-slides pager>\n        <ion-slide>\n            <img src="assets/imgs/SPNEfirsttime.png">\n            <h6>Defina a sua Morada Única Digital\n            e receba as nossas mensagens\n            em qualquer lugar, a qualquer hora</h6>\n        </ion-slide>\n        <ion-slide>\n            <img src="assets/imgs/SPNEfirsttime1.png">\n            <h6>Receba informações, Alertas\n                e Notificações sobre as suas\n                obrigações legais.\n            </h6>\n        </ion-slide>\n        <ion-slide>\n            <img src="assets/imgs/SPNEfirsttime3.png">\n            <h6>Aceda às mensagens reunidas\n                numa única Plataforma,\n                via Web ou Mobile</h6>\n        </ion-slide>\n        <ion-slide>\n            <img src="assets/imgs/SPNEfirsttime4.png">\n            <h6>Defina alertas e arquive\n                as suas mensagens.\n            </h6>\n        </ion-slide>\n    </ion-slides>\n\n    <div class="btn-wrapper">\n        <button ion-button (click)="entrar()">ENTRAR</button>\n      </div>\n</ion-content>\n  '/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/slides/slides.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__app_services_home_service__["a" /* HomeService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */]])
    ], SlidesPage);
    return SlidesPage;
}());

//# sourceMappingURL=slides.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Splash; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Splash = /** @class */ (function () {
    function Splash(viewCtrl, splashScreen) {
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    Splash.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    Splash = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/splash/splash.html"*/'<ion-content>\n    <!--<table>\n        <tr style="text-align: center; font-size: 15px"><b>Main Sponser</b></tr>\n        <tr><img src="assets/imgs/imt.png"></tr>\n        <tr style="text-align: center; font-size: 10px">Other entities</tr>\n        <tr><img src="assets/imgs/incm.png"></tr>\n        <tr><img src="assets/imgs/uminho.png"></tr>\n        <tr><img src="assets/imgs/unu-egov.png"></tr>\n        <tr><img src="assets/imgs/santa.png"></tr>\n        <tr><img src="assets/imgs/ecooltra.png"></tr>\n    </table>-->\n</ion-content>'/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/splash/splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], Splash);
    return Splash;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LockScreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slides_slides__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_pincode_input_dist__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_fingerprint_aio__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_crypto_js__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_auth__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LockScreenPage = /** @class */ (function () {
    //Fazer tentativas depois
    function LockScreenPage(navCtrl, navParams, pincodeCtrl, storage, alertCtrl, faio, menuCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pincodeCtrl = pincodeCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.faio = faio;
        this.menuCtrl = menuCtrl;
        this.storage.get('faio').then(function (fid) {
            if (fid !== undefined) {
                console.log("FAIO IS SET");
                console.log(fid);
                _this.id = fid;
            }
            else {
                console.log("SET FAIO FALSE");
                _this.storage.set('faio', false);
            }
        })
            .catch(function (error) { return console.log(error); });
    }
    LockScreenPage.prototype.ionViewDidEnter = function () {
        this.menuCtrl.swipeEnable(false);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(false, 'menu1');
    };
    LockScreenPage.prototype.ionViewWillLeave = function () {
        // Don't forget to return the swipe to normal, otherwise 
        // the rest of the pages won't be able to swipe to open menu
        this.menuCtrl.swipeEnable(true);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    };
    LockScreenPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Try to get password stored
        this.storage.get('password_encrypt').then(function (pdw) {
            if (pdw) {
                console.log("Encrypted passwordk: " + pdw);
            }
            else {
                _this.presentAlert('PIN', "Para começar a usar a aplicação precisa de configurar um PIN de 6 digitos.", true);
            }
        })
            .catch(function (error) { return console.log(error); });
        this.storage.get('faio').then(function (faio) {
            if (faio) {
                setTimeout(function () {
                    _this.startTouchID();
                }, 4000);
            }
        });
    };
    LockScreenPage.prototype.openPinCode = function (register) {
        var _this = this;
        var pinCode = this.pincodeCtrl.create({
            title: 'Insira um PIN',
            passSize: 6,
            hideForgotPassword: true,
            hideCancelButton: register,
            enableBackdropDismiss: !register //Se estiver a registar tem que configurar
        });
        pinCode.present();
        pinCode.onDidDismiss(function (code, status) {
            // If user enter a password and the fase if confirm
            // do a login
            if (status === 'done' && !register) {
                _this.login(code);
            }
            else if (status === 'done' && register) {
                _this.code = code;
                // Confirm if pincodes match
                _this.confirmCode();
            }
        });
    };
    LockScreenPage.prototype.confirmCode = function () {
        var _this = this;
        var pinCode = this.pincodeCtrl.create({
            title: 'Confirme o seu PIN',
            passSize: 6,
            hideForgotPassword: true,
            hideCancelButton: true,
            enableBackdropDismiss: false
        });
        pinCode.present();
        pinCode.onDidDismiss(function (code, status) {
            if (status === 'done') {
                if (_this.code == code) {
                    // if match send a message and do a registration of pin code
                    _this.presentAlert("PIN configurado!", "Pode mudar o PIN mais tarde nas Definições.", false);
                    _this.register(code);
                }
                else {
                    _this.presentAlert("Erro!", "Os PINs inseridos não são iguais. Tente novamente.", false);
                    _this.openPinCode(true);
                }
            }
        });
    };
    LockScreenPage.prototype.startTouchID = function () {
        var _this = this;
        this.faio.show({
            clientId: 'FingerPrintLockScreen',
            clientSecret: 'lasd08aah@981',
            disableBackup: true,
            localizedFallbackTitle: 'Insira o Pin',
            localizedReason: 'Autentique-se' //Only for iOS
        })
            .then(function (result) {
            // If the TouchID is correct
            _this.storage.get('password_encrypt').then(function (pwd) {
                var stored_pincode = String(pwd);
                console.log("Stored password: " + stored_pincode);
                // Go to key page
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__auth_auth__["a" /* AuthPage */], {
                    pincode: stored_pincode
                });
            });
        })
            .catch(function (error) { return console.log(error); });
    };
    LockScreenPage.prototype.presentAlert = function (title, message, register) {
        var _this = this;
        var botoes;
        if (register) {
            botoes = [
                {
                    text: 'OK',
                    handler: function () {
                        _this.openPinCode(true);
                    }
                }
            ];
        }
        else {
            botoes = ["OK"];
        }
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: botoes
        });
        alert.present();
    };
    //Encryption
    LockScreenPage.prototype.register = function (pincode) {
        var hash = String(__WEBPACK_IMPORTED_MODULE_5_crypto_js___default.a.SHA256(pincode));
        this.storage.set('password_encrypt', hash);
        this.storage.set('first', true);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__slides_slides__["a" /* SlidesPage */], {
            pincode: hash
        });
    };
    LockScreenPage.prototype.login = function (pincode) {
        var _this = this;
        // store passwords 
        var entered_pincode = String(__WEBPACK_IMPORTED_MODULE_5_crypto_js___default.a.SHA256(pincode));
        // get password stored on local storage
        this.storage.get('password_encrypt').then(function (pwd) {
            var stored_pincode = String(pwd);
            console.log("Stored password: " + stored_pincode);
            // if match go to tabs page
            if (entered_pincode == stored_pincode) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__auth_auth__["a" /* AuthPage */], {
                    pincode: entered_pincode
                });
            }
            else {
                _this.presentAlert("Erro", "PIN errado", false);
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    LockScreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-lockscreen',template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/lock-screen/lock-screen.html"*/'<!--\n  Generated template for the LockScreenPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar color="favorite">\n      <ion-title text-center>\n        SPNE\n      </ion-title>\n    </ion-navbar>\n</ion-header>\n  \n  <ion-content padding>\n      <!--<h4 text-center>Insira o seu PIN</h4> -->\n    <div class="pin-container">\n      <button ion-button icon-only full (click)="openPinCode(false)" style="background-color: #143363;">\n        <ion-icon name="lock"></ion-icon>\n      </button>\n        <button ion-button icon-only full *ngIf="id" (click)="startTouchID()" style="background-color: #143363;">\n          <ion-icon name="finger-print"></ion-icon>\n        </button>\n    </div>  \n  </ion-content>\n'/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/lock-screen/lock-screen.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic2_pincode_input_dist__["PincodeController"],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_fingerprint_aio__["a" /* FingerprintAIO */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* MenuController */]])
    ], LockScreenPage);
    return LockScreenPage;
}());

//# sourceMappingURL=lock-screen.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(384);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_settings_settings__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_tabs_tabs__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_key_key__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_slides_slides__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_auth_auth__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_details_details__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_platform_browser_animations__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_http__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_common_http__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_component__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_lock_screen_lock_screen__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic2_pincode_input__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_fingerprint_aio__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ngx_qrcode2__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_barcode_scanner__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ionic2_material_icons__ = __webpack_require__(760);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_10__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_lock_screen_lock_screen__["a" /* LockScreenPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_key_key__["a" /* KeyPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__["a" /* Splash */],
                __WEBPACK_IMPORTED_MODULE_8__pages_details_details__["a" /* DetailsPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_slides_slides__["a" /* SlidesPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_auth_auth__["a" /* AuthPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_13__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_19_ionic2_pincode_input__["PincodeInputModule"],
                __WEBPACK_IMPORTED_MODULE_16__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_21_ngx_qrcode2__["a" /* NgxQRCodeModule */],
                __WEBPACK_IMPORTED_MODULE_16__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* IonicPageModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_23_ionic2_material_icons__["a" /* MaterialIconsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_lock_screen_lock_screen__["a" /* LockScreenPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_key_key__["a" /* KeyPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_details_details__["a" /* DetailsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__["a" /* Splash */],
                __WEBPACK_IMPORTED_MODULE_1__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_slides_slides__["a" /* SlidesPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_auth_auth__["a" /* AuthPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_fingerprint_aio__["a" /* FingerprintAIO */],
                { provide: __WEBPACK_IMPORTED_MODULE_10__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeService = /** @class */ (function () {
    function HomeService(http) {
        this.http = http;
        this.baseUrl = 'http://ionicos.herokuapp.com/';
    }
    HomeService.prototype.getPosts = function (key, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseUrl + "users/index/" + key, options)
            .map(function (res) { return res.json(); });
    };
    HomeService.prototype.getURL = function () {
        return this.baseUrl;
    };
    HomeService.prototype.getToken = function (key) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json'
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var data = JSON.stringify({
            pin: key
        });
        return this.http.post(this.baseUrl + 'auth/login', data, options)
            .map(function (res) { return res.json(); });
    };
    HomeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], HomeService);
    return HomeService;
}());

//# sourceMappingURL=home.service.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_lock_screen_lock_screen__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_home_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, storage, statusBar, splashScreen, modalCtrl, menuCtrl) {
        this.platform = platform;
        this.storage = storage;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_lock_screen_lock_screen__["a" /* LockScreenPage */];
        platform.ready().then(function () {
            /*
              if (PIN) {
                rootPage = HomePage;
                lockService.init();
              } else {
                rootPage = StartPage;
              }
              TIRAR O LOCKSERVICE DAQUI DE BAIXO
              */
            //lockService.init();
            statusBar.styleDefault();
            var splash = modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__["a" /* Splash */]);
            splash.present();
            //splashScreen.hide();
        });
        this.pages = [
            { title: 'Caixa de Entrada', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Alertas', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Definições', component: __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */] },
            { title: 'Entidades Aderentes', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Sobre o PNE', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Arquivo', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            /*
              if (PIN) {
                rootPage = HomePage;
                lockService.init();
              } else {
                rootPage = StartPage;
              }
              TIRAR O LOCKSERVICE DAQUI DE BAIXO
              */
            //lockService.init();
            _this.statusBar.styleDefault();
            var splash = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__["a" /* Splash */]);
            splash.present();
            //splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component, { storage: this.storage });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header no-border style="color: white; background-color: #143363;">\n        <ion-row style="margin: 10px 5px 20px 5px">\n            <ion-col>\n                <img style="width: 100px; border-radius: 50%; background-color: white" src="assets/imgs/avatar.png">\n            </ion-col>\n            <ion-col>\n                <b>Nome: Próprio Apelido</b>\n                <br>\n                CC: 21345678\n                <br>\n                <br>\n                último login em dd/mm/aaaa\n            </ion-col>\n        </ion-row>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>      \n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n    <ion-footer no-border>    \n        <button class="btnsair" ion-item menuClose (click)="logout()" color="sair-btn" detail-none>\n            <ion-icon name=“close” class="icone-white"></ion-icon>  \n            &nbsp; SAIR\n        </button>    \n    </ion-footer>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/app/app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__services_home_service__["a" /* HomeService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* MenuController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__details_details__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_home_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(loadingCtrl, plt, navCtrl, sanitizer, navParams, homeService, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.plt = plt;
        this.navCtrl = navCtrl;
        this.sanitizer = sanitizer;
        this.navParams = navParams;
        this.homeService = homeService;
        this.alertCtrl = alertCtrl;
        this.storage = navParams.get('storage');
        this.colors = {
            alerta: 'orange',
            notificacao: '#143363'
        };
        this.loading = this.loadingCtrl.create({
            content: 'Por favor espere...'
        });
        this.messages = { "data": [{ "mid": "000000001", "titulo": "Apreciação de Pedido de Isenção de IMI", "entidade": "Autoridade Tributária", "conteudo": "Conteudo da mensagem", "emissao": "2018-09-02T15:52:17", "modificacao": "2018-09-10T11:12:19", "tipo": "notificacao", "linha-1": "Isenção IMI", "linha-2": "Art. 2687 D", "validade": ["2019-08-02T15:52:17", "2019-09-02T15:52:17"], "imagem": null, "estado": "Aprovado", "valor": null, "spne-estado": "nao-lida", "spne-alerta": null, "spne-local": "entrada" }, { "mid": "000000002", "titulo": "Pagamento IUC Julho/2018", "entidade": "Autoridade Tributária", "conteudo": "Conteudo da mensagem", "emissao": "2018-07-25T10:35:41", "modificacao": "2018-07-26T10:35:41", "tipo": "alerta", "linha-1": "Pagamento Único de Circulação", "linha-2": "74-GE-02", "validade": ["2018-08-30T00:00:00", "2019-08-30T00:00:00"], "imagem": null, "estado": null, "valor": 123.71, "spne-estado": "lida", "spne-alerta": null, "spne-local": "entrada", "anexos": ["https://www.google.com", "https://www.youtube.com"] }] };
        this.date1 = new Date(Date.parse(this.messages.data[0].validade[1]));
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.navParams.get('storage').get('key').then(function (val) {
            _this.key = val;
            _this.navParams.get('storage').get('token').then(function (val2) {
                _this.token = val2;
                _this.navParams.get('storage').get('users').then(function (users) {
                    if (users) {
                        _this.loading.present();
                        _this.loading.dismiss();
                    }
                });
            });
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('first').then(function (bool) {
            if (bool) {
                console.log("First time");
                console.log(bool);
                _this.faio();
            }
            else {
                console.log("NOT First time");
            }
        });
    };
    HomePage.prototype.faio = function () {
        var _this = this;
        this.storage.set('first', false);
        var alert = this.alertCtrl.create({
            title: 'Touch ID',
            message: 'Deseja ativar o Touch ID?',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    handler: function () {
                        console.log('Não clicked');
                    }
                },
                {
                    text: 'Sim',
                    handler: function () {
                        console.log('Sim clicked');
                        _this.storage.set('faio', true);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.viewItem = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__details_details__["a" /* DetailsPage */], {
            item: item
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="white" style="color: #143363">\n\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title text-center>PNE</ion-title>\n\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list>\n    <div *ngIf="messages" >\n    <div *ngIf="messages.data" >\n    <ion-item *ngFor="let i of messages.data;" [ngStyle]="{\'border-color\': colors[i.tipo]}"  style=" border-left: solid; border-left-width: 10px; margin: 20px 0px">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            <div class="">\n            </div>\n          </ion-col >\n\n          <ion-col col-10>\n            <div style="col-md-10" (click)="viewItem(i)">\n              <ion-thumbnail *ngIf="i.imagem && i.imagem != null" item-left>\n                <img src="{{i.imagem}}">\n              </ion-thumbnail>\n              <h4 style="color:gray"> {{i.entidade}}</h4>\n              <b><h2>{{i.titulo}}</h2></b>\n              <div [ngStyle]="{\'border-color\': colors[i.tipo]}" style="border:solid; display: inline-block; border-radius: 10px">\n                <h6 [ngStyle]="{\'color\': colors[i.tipo]}" style="padding: 2px;  top: 2px; width: 100%; position: relative;">{{i.tipo}}</h6>\n              </div>\n              <div style="border: solid; border-color:gray; padding: 20px 10px">\n                <h2 style="color:gray">{{i["linha-1"]}}</h2>\n                <h2 style="color:gray">{{i["linha-2"]}}</h2>\n                <div *ngIf="date1" >\n                  <ion-item>\n                  <span>\n                    <ion-icon md-name="access_time" style="position: relative; top: 4px;"></ion-icon>\n                    <span>Valido até {{date1.toISOString().substring(0, 10)}}</span>\n                  </span>\n                  </ion-item>\n                </div>\n              </div>\n            </div>\n          </ion-col >\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    </div>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_services_home_service__["a" /* HomeService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__key_key__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_home_service__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthPage = /** @class */ (function () {
    function AuthPage(navCtrl, storage, homeService, alertCtrl, menu) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.homeService = homeService;
        this.alertCtrl = alertCtrl;
        this.menu = menu;
    }
    AuthPage.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(false, 'menu1');
    };
    AuthPage.prototype.ionViewWillLeave = function () {
        // Don't forget to return the swipe to normal, otherwise 
        // the rest of the pages won't be able to swipe to open menu
        this.menu.swipeEnable(true);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    };
    AuthPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('key').then(function (pwd) {
            if (pwd) {
                _this.storage.get('token').then(function (pwd2) {
                    if (pwd2) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], {
                            storage: _this.storage
                        });
                    }
                });
            }
        });
    };
    AuthPage.prototype.toggleCMD = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__key_key__["a" /* KeyPage */], {});
    };
    AuthPage.prototype.toggleQR = function () {
    };
    AuthPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'auth',template:/*ion-inline-start:"/Users/silenzio/dev/SPNE/src/pages/auth/auth.html"*/'<ion-header>\n    <ion-navbar color="favorite">\n      <ion-title text-center>\n          Autenticação\n      </ion-title>\n    </ion-navbar>\n</ion-header>\n  \n<ion-content>\n    <img style="width: 100%" src="assets/imgs/SPNELog.png">\n\n    <div style="margin:30px 10px 0px 10px; border-style: solid; border-color: gray" tappable (click)="toggleQR($event)">\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                        <img style="width: 60px" src="assets/imgs/QRCODE_APOSTA_MÚLTIPLA.PNG">\n                </ion-col>\n                <ion-col>\n                    Ler Código PNE\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n    <div style="margin:30px 10px 0px 10px; border-style: solid; border-color: gray" tappable (click)="toggleCMD($event)">\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                        <img style="width: 60px" src="assets/imgs/cmd.jpg">\n                </ion-col>\n                <ion-col>\n                    Chave Móvel Digital\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n</ion-content>\n  '/*ion-inline-end:"/Users/silenzio/dev/SPNE/src/pages/auth/auth.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__app_services_home_service__["a" /* HomeService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */]])
    ], AuthPage);
    return AuthPage;
}());

//# sourceMappingURL=auth.js.map

/***/ })

},[379]);
//# sourceMappingURL=main.js.map