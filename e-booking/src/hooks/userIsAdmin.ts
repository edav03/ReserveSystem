import { ILogin } from './useFetchLogin';

export function userIsAdmin(town: string): boolean {
    let isAdmin = false;
    const userExists = localStorage.getItem('loginData');

    if (userExists) {
        const user: ILogin = JSON.parse(userExists);
        user.name == town ? (isAdmin = true) : null;
    }

    return isAdmin;
}

export function userIsLogged(): any {
    const userExists = localStorage.getItem('loginData');
    if (userExists) {
        const user: ILogin = JSON.parse(userExists);
        return user.name;
    }

    return Boolean(userExists);
}
