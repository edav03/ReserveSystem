import { useEffect, useState } from 'react';
import { IFetchFacility } from './useFetchFacility';
import { IFacilityImg } from '../types';

interface IResponseImg {
    id: string;
    town: string;
    facility: string;
    src: string;
    parentId: string;
}

const initFacilityImg = {
    id: '',
    town: '',
    facility: '',
    src: '',
    parentId: '',
};

export function useFetchFacilityImg(props: IFetchFacility): [IResponseImg[], boolean, boolean] {
    const { town = '', facility = '' } = props;

    const [facilityImg, setFacilityImg] = useState<any>([initFacilityImg]);
    const [loadingImg, setLoadingImg] = useState<boolean>(false);
    const [errorImg, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchImg() {
            try {
                setLoadingImg(true);
                await fetch(`${process.env.REACT_APP_BACKEND}/facilities/img/${town}/${facility}`)
                    .then(async response => {
                        if (response.ok) {
                            return await response.json();
                        } else {
                            throw errorImg;
                        }
                    })
                    .then(response => {
                        const transformedData: IResponseImg[] = response.map(
                            (data: IFacilityImg) => ({
                                id: data.id,
                                town: data.town,
                                facility: data.facility,
                                src: data.src,
                                parentId: data.parent_id,
                            })
                        );
                        setFacilityImg(transformedData);
                        setLoadingImg(false);
                    })
                    .catch(e => {
                        throw e;
                    });
            } catch (error) {
                setError(true);
                setLoadingImg(false);
            }
        }
        fetchImg();
    }, []);

    return [facilityImg, loadingImg, errorImg];
}

export default useFetchFacilityImg;
