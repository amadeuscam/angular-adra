export class ChangePasswordDTO {
    password: string
    confirmPassword: string
    tokenPassword: string

    constructor(password: string, confirmPassword: string, tokenPassword: string) {
        this.tokenPassword = tokenPassword;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

}
