import { useEffect, useState } from 'react';
import { IFetchSchedule } from './sendFetchAppointment';

export function useFetchAppointments({ parentId }: { parentId: string }): [any, boolean, boolean] {
    const [appointments, setAppointments] = useState<IFetchSchedule>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchFacilities() {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND}/facilities/getAppointments`,
                    {
                        method: `POST`,
                        body: JSON.stringify({ parentId }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw error;
                        }
                    })
                    .catch(e => {
                        throw e;
                    });
                setAppointments(res);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchFacilities();
    }, []);

    return [appointments, loading, error];
}

export default useFetchAppointments;
