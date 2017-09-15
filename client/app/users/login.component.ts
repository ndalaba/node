import {Component,OnInit} from '@angular/core';
import {Login} from "../_models/index";
import {AuthService,Helper} from "../_services/index"
import {Router} from "@angular/router";
import { NotificationsService } from 'angular2-notifications';
import { Config } from "../_modules/app.config";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{

    private currentUser:Login;
    private app_name: string = Config.APP_NAME;
    private app_icon: string = this.app_name.charAt(0);
    public options = Config.NOTIFICATION_OPTIONS;

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
                localStorage.setItem("first_login", "true");
                this.authService.onAuth();
                this.router.navigate(['/']);
            }
            else
                this._notificationsService.error('Erreur', response.message);
            this.helper.toggleLoadding(false);
        });
    }
}