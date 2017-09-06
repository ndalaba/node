import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AuthGuard, AdminGuard} from "../_guard/index";

import {SimpleNotificationsModule} from 'angular2-notifications';


import {appRoutes} from './route.module';

import {AppComponent} from './../app.component';
import {NavigationComponent, MenuComponent} from './../layout/index';

import {HomeComponent} from './../home/home.component';
import {RegistrationComponent, ProfilComponent, LoginComponent, UserListComponent, EditComponent} from '../users/index';
import {ContactComponent} from '../contact/contact.component';
import {Helper, UserService, AuthService} from '../_services/index';


@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule, SimpleNotificationsModule.forRoot()
    ],
    declarations: [
        AppComponent, NavigationComponent, MenuComponent, HomeComponent, RegistrationComponent, LoginComponent,
        ContactComponent, ProfilComponent, UserListComponent, EditComponent

    ],
    providers: [Helper, UserService, AuthGuard, AuthService, AdminGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}