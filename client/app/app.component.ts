import { Component, OnInit  } from '@angular/core';
import { User } from "./_models/index";
import { AuthService } from "./_services/auth.service";


@Component({
    selector: 'ng-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    private loggedUser: User;
    private isUserLogged: boolean;
   
    constructor(private authService: AuthService) {
        this.authService.onLoggin$.subscribe(() => {
            this.ngOnInit();
        });
    }
    ngOnInit(): void {
        this.loggedUser = this.authService.loggedUser;
        this.isUserLogged = this.authService.isLogged;
        if(localStorage.getItem('first_login')==="true"){
            localStorage.setItem("first_login", "false");
            window.location.reload();
        }

    }
}
