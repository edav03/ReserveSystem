import { useRef } from 'react';
import { Header } from '../../components/Header';
import { useParams } from 'react-router-dom';
import { useFetchFacility } from '../../hooks/useFetchFacility';
import { useFetchFacilityImg } from '../../hooks/useFetchFacilityImg';
import { BasicLogin, RefLogin } from '../../components/LoginModal';
import useFetchAppointments from '../../hooks/useFetchAppointments';
import { userIsAdmin, userIsLogged } from '../../hooks/userIsAdmin';
import './styles.css';
import { FacilityDescription } from '../../components/FacilityDescription';
import { FacilitySchedule } from '../../components/FacilitySchedule';
import { ILogin, useFetchLogin } from '../../hooks/useFetchLogin';

export type FacilityData = {
    name: string;
    town: string;
    location: string;
    price: string;
    loadingData: boolean;
    loadingImg: boolean;
    error: boolean;
    image: string;
};

export function Facility() {
    const { town = '', facility = '' } = useParams<{
        town: string;
        facility: string;
    }>();

    const [facilityInfo, loadingData, errorData] = useFetchFacility({
        town: town,
        facility: facility,
    });

    const [facilityImg, loadingImg, errorImg] = useFetchFacilityImg({
        town: town,
        facility: facility,
    });

    const [appointments, loadingAppointments, errorAppointments] = useFetchAppointments({
        parentId: town + facility,
    });

    const isAdmin = userIsAdmin(town);
    const isLogged = userIsLogged();

    const loginRef = useRef<RefLogin>(null);

    const onLogin = async (username: string, password: string) => {
        const loginDataAsJSON: ILogin = await useFetchLogin(username, password);
        const loginData = JSON.stringify(loginDataAsJSON);
        localStorage.setItem('loginData', loginData);
        window.location.reload();
    };

    const objFacilityData: FacilityData = {
        name: facilityInfo[0].facility,
        town: town,
        location: facilityInfo[0].location,
        price: facilityInfo[0].price,
        loadingData: loadingData,
        loadingImg: loadingImg,
        error: errorData,
        image: facilityImg[0].src,
    };

    return (
        <div>
            <Header
                city={facilityInfo[0].town}
                loading={loadingData}
                error={errorData}
                isLogged={isLogged}
                onClick={() => loginRef.current?.handleToggle()}
            />

            <div className="FacilityContainer">
                <div className="FacilityDescription">
                    <FacilityDescription
                        name={objFacilityData.name}
                        location={objFacilityData.location}
                        price={objFacilityData.price}
                        image={objFacilityData.image}
                        loadingData={loadingData}
                        loadingImg={loadingImg}
                        error={objFacilityData.error}
                    />
                </div>

                <div className="FacilitySchedule">
                    <FacilitySchedule
                        appointments={appointments}
                        name={objFacilityData.name}
                        town={town}
                        price={objFacilityData.price}
                        isAdmin={isAdmin}
                    />
                </div>
            </div>

            <BasicLogin onLogin={onLogin} ref={loginRef} />
            {(errorData || errorImg) && <div>Ha ocurrido un error</div>}
        </div>
    );
}
