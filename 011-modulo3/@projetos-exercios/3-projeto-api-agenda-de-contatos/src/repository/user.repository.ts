import { User, UserCreate, UserRepository } from "../interfaces/user.interface";


export class UserRepositoryPrisma implements UserRepository{
    async create(data: UserCreate): Promise<User> {
        
    }
}


