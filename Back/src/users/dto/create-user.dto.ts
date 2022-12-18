export class CreateUserDto {
    user: {
        name: string;
        email: string;
        password: string;
        gender: string;
        phone: string;
        age: string;
        type: string;
    }
}
