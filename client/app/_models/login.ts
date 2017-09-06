export class Login {
    email:string;
    password:string;
    remember_me:boolean;

    constructor(data:any) {
        this.email = data.email;
        this.password = data.password;
        this.remember_me = data.remember_me;
    }
}