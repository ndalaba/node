export class User {
    id: number;
    name: string;
    email: string;
    plainPassword: string;
    roles: string;
    phone: string;
    photo: string;

    constructor(data: any) {
        this.id = 0;
        this.name = data.name;
        this.email = data.email;
        this.plainPassword = data.plainPassword;
        this.roles = "ROLE_USER";
        this.phone = data.phone;
        this.photo = data.photo;
    }

    accronym(): string {
        return this.name.charAt(0);
    }
}