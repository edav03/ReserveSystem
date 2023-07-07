export interface ILogin {
    id: string;
    name: string;
    email: string;
    password: string;
    token: string;
}

export function useFetchLogin(userCredential: string, password: string) {
    const info = { credential: userCredential, password: password };

    async function fetchLogin() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/auth/login`, {
                method: `POST`,
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    return fetchLogin();
}
