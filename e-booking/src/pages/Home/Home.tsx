import { useParams } from 'react-router-dom';
import useFetchFacility from '../../hooks/useFetchFacility';
import { useRef } from 'react';
import { BasicLogin, RefLogin } from '../../components/LoginModal';
import { Header } from '../../components/Header';
import { FacilityDescription } from '../../components/FacilityDescription';
import { useFetchFacilityImg } from '../../hooks/useFetchFacilityImg';
import './style.css';
import { ILogin, useFetchLogin } from '../../hooks/useFetchLogin';
import { userIsAdmin, userIsLogged } from '../../hooks/userIsAdmin';
import { Footer } from '../../components/Footer';
import { Loader } from '../../components/Loader';

export function Home() {
    const { town = '' } = useParams<{
        town: string;
    }>();

    const [facilityInfo, loadingData, errorData] = useFetchFacility({
        town: town,
    });

    const [facilityImg, loadingImg, errorImg] = useFetchFacilityImg({
        town: town,
    });

    const isAdmin = userIsAdmin(town);
    const isLogged = userIsLogged();

    const joinedFacilityData = facilityImg
        .map((img, i) => {
            return facilityInfo.map((fac, j) => {
                if (fac.id != '' || img.parentId != '') {
                    if (img.parentId === fac.id) {
                        return {
                            id: fac.id,
                            facility: fac.facility,
                            location: fac.location,
                            price: fac.price,
                            image: img.src,
                        };
                    }
                }
            });
        })
        .flat()
        .filter(item => item !== undefined);

    const loginRef = useRef<RefLogin>(null);

    const onLogin = async (username: string, password: string) => {
        const loginDataAsJSON: ILogin = await useFetchLogin(username, password);
        if (loginDataAsJSON) {
            const loginData = JSON.stringify(loginDataAsJSON);
            localStorage.setItem('loginData', loginData);
            window.location.reload();
        }
    };

    return (
        <div className="home">
            <Header
                city={town}
                loading={loadingData}
                error={errorData}
                onClick={() => loginRef.current?.handleToggle()}
                isLogged={isLogged}
            />

            <div className="container">
                {loadingData && loadingImg ? (
                    <Loader />
                ) : (
                    <>
                        {joinedFacilityData.map((fac, i) => (
                            <div key={i}>
                                <a
                                    href={
                                        process.env.REACT_APP_FRONTEND +
                                        '/' +
                                        facilityInfo[0].town +
                                        '/' +
                                        fac?.facility
                                    }>
                                    <FacilityDescription
                                        key={i}
                                        name={fac!.facility}
                                        location={fac!.location}
                                        price={fac!.price}
                                        image={fac!.image}
                                        loadingData={loadingData}
                                        loadingImg={loadingImg}
                                        error={errorImg}
                                    />
                                </a>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <Footer town={town} isAdmin={isAdmin} />
            <BasicLogin onLogin={onLogin} ref={loginRef} />
        </div>
    );
}
