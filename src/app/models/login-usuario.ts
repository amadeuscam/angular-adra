export class LoginUsuario {

    usernameOrEmail: string;
    password: string;

    constructor(usernameOrEmail: string,password:string){
        this.password=password;
        this.usernameOrEmail= usernameOrEmail;
    }
}
