import locationLogo from '../../assets/img/location-pointer.png';
import { getSportName } from '../../utils/functions';
import { Loader } from '../Loader';
import './descriptionStyle.css';

interface IFacilityDescription {
    name: string;
    location: string;
    price: string;
    image: string;
    loadingData: boolean;
    loadingImg: boolean;
    error: boolean;
}

export function FacilityDescription({
    name = 'Instalacion',
    location = 'Direccion',
    price = '0',
    image,
    loadingData = false,
    loadingImg = false,
    error = false,
}: IFacilityDescription) {
    const sportName = getSportName(name);
    const splittedLocation = location.split(' ');
    const googleLocation = splittedLocation.join('+');

    return (
        <div className="Facility">
            {loadingImg ? (
                <Loader />
            ) : (
                <img src={image} alt="Titulo de la instalacion" id="facilityImg" />
            )}

            <div className="FacilityBack">
                <div className="FacilityInfo">
                    {loadingData ? (
                        <Loader />
                    ) : (
                        <>
                            <h3 id="titulo">{sportName}</h3>
                            <a
                                className="ubication"
                                href={`http://maps.google.com/maps?q=${googleLocation}`}
                                target="_blank">
                                <img src={locationLogo} alt="Ubicacion Logo" id="locationLogo" />
                                <p id="text">{location}</p>
                            </a>
                            <h3 id="precio">{price}€/hora</h3>
                        </>
                    )}
                    {error && <p>Error al cargar los datos</p>}
                </div>
            </div>
        </div>
    );
}
