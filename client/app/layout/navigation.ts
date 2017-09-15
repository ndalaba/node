import {Component} from '@angular/core';
import {User} from "../_models/index";
import {AuthService} from "../_services/index";
import {AdminGuard, AuthGuard} from "../_guard/index";
import {Config} from "../_modules/app.config";
import {Router} from "@angular/router";


@Component({
    selector: 'navigation',
    templateUrl: 'navigation.html'
})

export class NavigationComponent {
    private loggedUser: User;
    private app_name: string = Config.APP_NAME;
    private app_icon: string = this.app_name.charAt(0);
    private upload_folder: string = Config.UPLOAD_FOLDER;

    constructor(private authService: AuthService, private adminGuard: AdminGuard, private authGuard: AuthGuard, private router: Router) {
        this.loggedUser = authService.loggedUser;
    }

    logout(event: Event) {
        event.preventDefault();
        this.authService.logout().subscribe(() => {
            localStorage.removeItem('loggedUser');
            this.authService.onAuth();
            this.router.navigate(['/auth/login']);
        });
    }
}