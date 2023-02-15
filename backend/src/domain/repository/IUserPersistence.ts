interface IUserPersistence {
    register(entity: any): Promise<any>
    login(entity: any): any
    findUserByEmail(email: string): Promise<any>
}

export {IUserPersistence}
