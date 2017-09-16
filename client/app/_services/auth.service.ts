import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {Subject} from "rxjs/Subject";

import { Config } from '../_modules/app.config';
import { User,Login } from '../_models/index';
import { Helper } from '../_services/index';

@Injectable()
export class AuthService {
    public loggedUser:User;
    public isLogged:boolean;

    private source= new Subject();
    onLoggin$=this.source.asObservable();

    constructor(private http:Http, private helper:Helper) {
        this.onAuth();
    }

    onAuth(){
        let user = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUser = (user !== null) ? user : new User({ name: "User" });
        this.isLogged = (user !== null);
        this.source.next();
    }

    login(data:Login) {
        return this.http.post(Config.API_ROUTE.login, data).map(response=> {
            return response.json();
        }).catch(this.helper.handleError);
    }

    logout() {
        return this.http.get(Config.API_ROUTE.logout).map((response) => {
            localStorage.removeItem('loggedUser');
        }).catch(this.helper.handleError);
    }
}