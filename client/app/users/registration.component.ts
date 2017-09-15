import {Component} from '@angular/core';

import {User} from '../_models/index';
import {UserService, Helper} from '../_services/index';
import {NotificationsService} from 'angular2-notifications';
import {Config} from '../_modules/app.config';


@Component({
    selector: 'registration',
    templateUrl: './registration.component.html'
})

export class RegistrationComponent {
    private currentUser: User;
    private showPassword: boolean;
    private userRoles: string[];
    private app_name:string=Config.APP_NAME;
    private app_icon:string= this.app_name.charAt(0);
    public options = Config.NOTIFICATION_OPTIONS;

    constructor(private userService: UserService, private helper: Helper, private _notificationsService: NotificationsService) {
        this.showPassword = true;
        this.helper.setPageInfo("Ajouter un utilisateur","Ajouter un utilisateur");
        this.helper.currentMenu("a_collapse_users");
        this.resetCurrentUser();
    }

    resetCurrentUser() {
        this.currentUser = new User({
            id:0,
            name: '',
            email: '',
            plainPassword: this.helper.getPassword(),
            roles: 'ROLE_USER',
            photo: Config.API_ROUTE.user_default_image
        });
        this.userService.getRoles().subscribe(response => {
            this.userRoles = response;
        });
    }

    handleSubmit(event: Event) {
        event.preventDefault();this.helper.toggleLoadding(true);
        this.userService.createUser(this.currentUser).subscribe(response => {
            this.helper.toggleLoadding(false);
            if (response.success)
                this._notificationsService.success('Succès', response.message);
            else
                this._notificationsService.error('Erreur', response.message);
        });
    }

    generatePassword(event:Event) {
        event.preventDefault();
        this.currentUser.plainPassword = this.helper.getPassword();
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
        if (this.showPassword)
            document.querySelector("#plainPassword").setAttribute("type", "text");
        else
            document.querySelector("#plainPassword").setAttribute("type", "password");
    }
}