import {Component} from '@angular/core';
import {AuthService} from "../_services/index";
import {Router} from "@angular/router";
import {User} from "../_models/index";
import {Config} from "../_modules/app.config";

@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})

export class MenuComponent {
    private loggedUser:User;
    private upload_folder: string = Config.UPLOAD_FOLDER;

    constructor(private authService:AuthService, private router:Router) {
        this.loggedUser= authService.loggedUser;
    }

    logout(event:Event) {
        event.preventDefault();
        this.authService.logout().subscribe(()=>{
            localStorage.removeItem('loggedUser');
            this.authService.onAuth();
            this.router.navigate(['/auth/login']);
        });
    }
}