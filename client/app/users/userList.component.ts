import {Component} from "@angular/core";
import {User} from "./../_models/index";
import {UserService, Helper} from "../_services/index";
import {NotificationsService} from 'angular2-notifications';
import {Config} from "../_modules/app.config";


@Component({
    selector: "user-list",
    templateUrl: "./userList.component.html"
})

export class UserListComponent {
    private users: Array<User>;
    private userCount: number;
    public options = Config.NOTIFICATION_OPTIONS;
    private upload_folder: string = Config.UPLOAD_FOLDER;
    private textFilter: string;
    private filtredUsers: Array<User>;

    constructor(private userService: UserService, private helper: Helper, private _notificationsService: NotificationsService) {
        this.helper.setPageInfo("Liste utilisateurs", "Liste des utilisateurs");
        this.helper.currentMenu("a_collapse_users");
        this.getList();
    }

    filterUsers(event: Event) {
        this.filtredUsers = this.users.filter(user => {
            return user.name.toLocaleLowerCase().indexOf(this.textFilter.toLocaleLowerCase()) !== -1;
        });
        this.userCount = this.filtredUsers.length;
    }

    private getList() {
        this.userService.getListe().subscribe(response => {
            if (response.success) {
                this.users = response.users;
                this.filtredUsers = this.users;
                this.userCount = this.users.length;
            } else
                this._notificationsService.error('Erreur', response.message);
        });
    }

    removeUser(event: Event, user: User) {
        event.preventDefault();
        if (confirm("Supprimer l'utilisateur")) {
            this.userService.removeUser(user.id).subscribe(response => {
                if (response.success) {
                    this.getList();
                    this._notificationsService.success('Succès', response.message);
                }

                else
                    this._notificationsService.error('Erreur', response.message);
            });
        }
    }

}