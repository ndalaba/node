import {Component,OnInit} from '@angular/core';
import {Login} from "../_models/index";
import {AuthService,Helper} from "../_services/index"
import {Router} from "@angular/router";
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{

    private currentUser:Login;
    public options = {
        position: ["middle", "right"],
        timeOut: 5000,
        lastOnBottom: true,
        pauseOnHover: true,
        clickToClose: true
    };

    constructor(private authService:AuthService,private router:Router,private helper:Helper ,private _notificationsService: NotificationsService) {
        this.currentUser = new Login({email: "", password: "", remember_me: false});

    }
    ngOnInit(): void {
        this.authService.logout().subscribe();
    }

    login(event:Event) {
        event.preventDefault();
        this.helper.toggleLoadding(true);
        this.authService.login(this.currentUser).subscribe(response => {
            if (response.success){
                localStorage.setItem("loggedUser", JSON.stringify(response.loggedUser));
                this.authService.onAuth();
                this.router.navigate(['/']);
                this.helper.toggleLoadding(false);
            }
            else
                this._notificationsService.error('Erreur', response.message);
        });
    }
}