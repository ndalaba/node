import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {Config} from '../_modules/app.config';
import {Brand} from '../_models/index';
import {Helper} from '../_services/index';

@Injectable()
export class BrandService {

    private headers: Headers;

    constructor(private http: Http, private helper: Helper) {
        this.headers = new Headers();
        this.headers.append('X-Requested-With', 'XMLHttpRequest');
    }

    findOne(id: number | string): Observable<any> {
        return this.http.get(Config.API_ROUTE.brand_edit + "/" + id, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    removeBrand(id: number): Observable<any> {
        return this.http.get(Config.API_ROUTE.brand_remove + "/" + id, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    getListe(): Observable<any> {
        return this.http.get(Config.API_ROUTE.brand_list, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }

    saveBrand(data: Brand) {
        let url = (data.id === 0) ? Config.API_ROUTE.brand_add : Config.API_ROUTE.brand_edit + "/" + data.id;
        return this.http.post(url, data, {headers: this.headers}).map(response => {
            return response.json();
        }).catch(this.helper.handleError);
    }
}