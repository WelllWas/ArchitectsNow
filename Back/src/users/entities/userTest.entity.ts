export class User {
    id:number;
    name:string;
    email:string;
    password:string;
    gender:string;
    phone:string;
    age:string;
    type:string;

    constructor(user?: Partial<User>){
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.gender = user.gender;
        this.phone = user.phone;
        this.age = user.age;
        this.type = user.type;
    }
}
