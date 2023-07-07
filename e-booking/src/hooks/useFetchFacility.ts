import { useEffect, useState } from 'react';
import { IFacility } from '../types';

export interface IFetchFacility {
    town: string;
    facility?: string;
}

const initFacility = {
    id: '',
    town: '',
    facility: '',
    price: '',
    location: '',
};
export function useFetchFacility(props: IFetchFacility): [IFacility[], boolean, boolean] {
    const { town = '', facility = '' } = props;

    const [facilityData, setFacilityData] = useState<IFacility[]>([initFacility]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchFacilities() {
            try {
                setLoading(true);
                await fetch(`${process.env.REACT_APP_BACKEND}/facilities/info/${town}/${facility}`)
                    .then(async response => {
                        if (response.ok) {
                            return await response.json();
                        } else {
                            throw error;
                        }
                    })
                    .then(response => {
                        //Transfrom the array to an object
                        const transfomedData = response.map((response: IFacility) => ({
                            id: response.id,
                            town: response.town,
                            facility: response.facility,
                            price: response.price,
                            location: response.location,
                        }));
                        setFacilityData(transfomedData);
                        setLoading(false);
                    })
                    .catch(e => {
                        throw e;
                    });
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchFacilities();
    }, []);

    return [facilityData, loading, error];
}

export default useFetchFacility;
