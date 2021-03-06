import {Component, OnInit} from '@angular/core';

import {User} from '../_models/index';
import {UserService, Helper} from '../_services/index';
import {NotificationsService} from 'angular2-notifications';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Config} from '../_modules/app.config';


@Component({
    selector: 'edit',
    templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
    private currentUser: User;
    private showPassword: boolean;
    private userRoles: string[];
    private loading: string;
    private uploading: boolean = false;
    public options = Config.NOTIFICATION_OPTIONS;
    private upload_folder: string = Config.UPLOAD_FOLDER;


    constructor(private userService: UserService, private helper: Helper, private _notificationsService: NotificationsService, private route: ActivatedRoute) {
        this.showPassword = true;
        this.loading = Config.API_ROUTE.loading;
        this.resetCurrentUser();

    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.helper.toggleLoadding(true);
            this.userService.findOne(params.get('id')).subscribe(response => {
                let user = JSON.parse(response);
                this.currentUser = JSON.parse(response);
                this.currentUser.plainPassword = "";
                this.currentUser.phone = user.phone || "";
                this.helper.toggleLoadding(false);
            });

        });
    }

    resetCurrentUser() {
        this.currentUser = new User({
            id: 0,
            name: '',
            email: '',
            plainPassword: this.helper.getPassword(),
            phone: "",
            roles: 'ROLE_USER',
            photo: Config.API_ROUTE.user_default_image
        });
        this.userService.getRoles().subscribe(response => {
            this.userRoles = response;
        });
    }

    loadImage() {
        this.uploading = true;
        let formData = new FormData();
        let file = (<HTMLInputElement>document.getElementById("fileElement")).files[0];
        formData.append("photo", file);

        this.userService.uploadPhoto(this.currentUser.id, formData).subscribe(response => {
            if (response.success) {
                this._notificationsService.success('Succès', response.message);
            } else
                this._notificationsService.error('Erreur', response.message);
            this.uploading = false;
        });

    }

    browse() {
        document.getElementById('fileElement').click();
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        this.helper.toggleLoadding(true);
        this.userService.editUser(this.currentUser).subscribe(response => {
            this.helper.toggleLoadding(false);
            if (response.success)
                this._notificationsService.success('Succès', response.message);
            else
                this._notificationsService.error('Erreur', response.message);
        });
    }

    generatePassword(event: Event) {
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