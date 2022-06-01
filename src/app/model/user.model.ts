export class User {
    id:number;
    email:string;
    pwd:string;
    roles:string[];

    constructor(id:number, email:string, pwd:string, roles:string[]) {
        this.id=id;
        this.email=email;
        this.pwd=pwd;
        this.roles= roles;
    }
};