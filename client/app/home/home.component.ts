import {Component} from '@angular/core';
import {User} from "../_models/index";
import {AuthService} from "../_services/index";

@Component({
    selector:'home',
    templateUrl:'./home.component.html'
})

export class HomeComponent{
    private loggedUser:User;
    constructor(private authService: AuthService){
        this.loggedUser = authService.loggedUser;
    }
}