export class NuevoUsuario {

    name: string;
    username: string;
    email: string;
    password: string;

    constructor(name: string, username: string, email: string, password: string) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.name = name;
    }


}
