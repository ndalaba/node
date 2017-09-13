import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {Config} from '../_modules/app.config';
import {Model} from '../_models/index';
import {Helper} from '../_services/index';

@Injectable()
export class ModelService {

    private headers: Headers;

    constructor(private http: Http, private helper: Helper) {
        this.headers = new Headers();
        this.headers.append('X-Requested-With', 'XMLHttpRequest');
    }

    findOne(id: number | string): Observable<any> {
        return this.http.get(Config.API_ROUTE.model_edit + "/" + id, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    removeModel(id: number): Observable<any> {
        return this.http.get(Config.API_ROUTE.model_remove + "/" + id, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    getListe(): Observable<any> {
        return this.http.get(Config.API_ROUTE.model_list, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    createModel(data: Model): Observable<any> {
        return this.http.post(Config.API_ROUTE.registration, data, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    editModel(data: Model) {
        return this.http.post(Config.API_ROUTE.model_edit + '/' + data.id, data, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    getRoles(): Observable<any> {
        return this.http.get(Config.API_ROUTE.roles, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    uploadPhoto(id: number, formData: any): Observable<any> {
        return this.http.post(Config.API_ROUTE.upload_photo + "/" + id, formData).map(response => {
            return response.json();
        });

    }
}