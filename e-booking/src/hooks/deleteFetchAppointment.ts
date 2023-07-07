import { IFetchSchedule } from './sendFetchAppointment';

export async function deleteFetchAppointment(props: IFetchSchedule) {
    const loginData = localStorage.getItem('loginData');
    const objData = loginData ? JSON.parse(loginData) : null;

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/facilities/deleteAppointment`, {
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
            console.error('sendFetchSchedule Error', error);
        });

    return res;
}
