export interface INewFacility {
    town: string;
    facility: string;
    location: string;
    price: string;
    image: string;
}

export async function useNewFacility(props: INewFacility) {
    const loginData = localStorage.getItem('loginData');
    const objData = loginData ? JSON.parse(loginData) : null;

    if (objData) {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/facilities/newFacility`, {
            method: `POST`,
            body: JSON.stringify(props),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${objData.token}`,
            },
        })
            .then(async response => {
                return response.ok ? await response.json() : false;
            })
            .catch(error => {
                throw error;
            });
        return res;
    } else {
        return false;
    }
}
