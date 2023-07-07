export interface IFetchSchedule {
    parent_Id: string;
    title: string;
    nombre: string;
    dni: string;
    pago: boolean;
    email: string;
    startDate: string | Date | undefined;
    endDate: string | Date | undefined;
}

export async function sendFetchAppointment(props: IFetchSchedule) {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/facilities/insertAppointment`, {
        method: `POST`,
        body: JSON.stringify(props),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) return response.ok;
            else return false;
        })
        .catch(error => {
            console.error('sendFetchSchedule Error', error);
        });

    return res;
}
