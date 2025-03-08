export interface User {
    id : string
    name : string
    email : string
}

export interface UserCreate {
    email : string,
    name : string
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>
}