import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {Config} from '../_modules/app.config';
import {User} from '../_models/index';
import {Helper} from '../_services/index';

@Injectable()
export class UserService {

    private headers: Headers;

    constructor(private http: Http, private helper: Helper) {
        this.headers = new Headers();
        this.headers.append('X-Requested-With', 'XMLHttpRequest');
    }

    findOne(id: number | string): Observable<any> {
        return this.http.get(Config.API_ROUTE.user_edit + "/" + id, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    removeUser(id: number): Observable<any> {
        return this.http.delete(Config.API_ROUTE.user_remove + "/" + id, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    getListe(): Observable<any> {
        return this.http.get(Config.API_ROUTE.user_list, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    createUser(data: User): Observable<any> {
        return this.http.post(Config.API_ROUTE.registration, data, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    editUser(data: User) {
        return this.http.post(Config.API_ROUTE.user_edit + '/' + data.id, data, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    getRoles(): Observable<any> {
        return this.http.get(Config.API_ROUTE.roles, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    uploadPhoto(id: number, formData: any): Observable<any> {
        /* var xhr = new XMLHttpRequest();
         xhr.open('POST', Config.API_ROUTE.upload_photo + "/" + id, true);
         xhr.onload = function () {
             if (xhr.status === 200) {
                 console.log(xhr.response);
             } else {
                 alert('An error occurred!');
             }
         };
         xhr.send(formData);*/
        return this.http.post(Config.API_ROUTE.upload_photo + "/" + id, formData,{headers: this.headers}).map(response => {
            return response.json();
        });

    }
}