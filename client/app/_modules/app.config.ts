export class Config {
    public static get APP_HOST(): string {
        return 'http://localhost:8000/'
    };

    public static get UPLOAD_FOLDER(): string {
        return this.APP_HOST + "uploads/"
    }

    public static get API_ROUTE(): any {
        return {
            registration: this.APP_HOST + 'utilisateurs/ajouter',
            user_list: this.APP_HOST + "utilisateurs/liste",
            user_edit: this.APP_HOST + "utilisateurs/modifier",
            user_remove: this.APP_HOST + "utilisateurs/supprimer",
            upload_photo: this.APP_HOST + "utilisateurs/photo",
            user_default_image: this.UPLOAD_FOLDER + "photos/user.png",
            loading: this.APP_HOST + "uploads/loading.svg",
            profil: this.APP_HOST + 'profil',
            login: this.APP_HOST + "connexion",
            logout: this.APP_HOST + "logout",
            roles: this.APP_HOST + "roles"
        }
    }

    public static get NOTIFICATION_OPTIONS(): any {
        return {
            position: ["middle", "right"],
            timeOut: 2000,
            lastOnBottom: true,
            pauseOnHover: true,
            clickToClose: true
        }
    }
}