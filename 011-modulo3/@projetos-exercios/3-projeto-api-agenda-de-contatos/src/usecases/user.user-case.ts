import { User } from "@prisma/client";
import { UserCreate } from "../interfaces/user.interface";


export class UserUserCase {
    constructor (private userRepository){}


    async create({name, email}: UserCreate): Promise<User>{

    }

}