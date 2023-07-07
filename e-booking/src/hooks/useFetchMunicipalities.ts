import { useEffect, useState } from 'react';

export interface IFetchFacility {
    town: string;
    facility?: string;
}

export function useFetchMunicipalities(): [[], boolean, boolean] {
    const [municipalities, setMunicipalities] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchMunicipalities() {
            try {
                setLoading(true);
                await fetch(`${process.env.REACT_APP_BACKEND}/facilities`)
                    .then(async response => {
                        return response.ok
                            ? (setMunicipalities(await response.json()), setLoading(false))
                            : false;
                    })
                    .catch(error => {
                        throw error;
                    });
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchMunicipalities();
    }, []);

    return [municipalities, loading, error];
}

export default useFetchMunicipalities;
