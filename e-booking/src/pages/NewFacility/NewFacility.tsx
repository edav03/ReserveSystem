import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { BasicLogin, RefLogin } from '../../components/LoginModal';
import { Header } from '../../components/Header';
import { ILogin, useFetchLogin } from '../../hooks/useFetchLogin';
import { userIsAdmin, userIsLogged } from '../../hooks/userIsAdmin';
import { Footer } from '../../components/Footer';
import './style.css';
import { INewFacility, useNewFacility } from '../../hooks/useNewFacility';
import notify from 'devextreme/ui/notify';

export function NewFacility() {
    const { town = '' } = useParams<{
        town: string;
    }>();

    const [name, setName] = useState('futbol');
    const [direction, setDirection] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const isAdmin = userIsAdmin(town);
    const isLogged = userIsLogged();

    const loginRef = useRef<RefLogin>(null);

    const onLogin = async (username: string, password: string) => {
        const loginDataAsJSON: ILogin = await useFetchLogin(username, password);
        if (loginDataAsJSON) {
            const loginData = JSON.stringify(loginDataAsJSON);
            localStorage.setItem('loginData', loginData);
            window.location.reload();
        }
    };

    const onHandleSubmit = async (event: any) => {
        event.preventDefault();
        if (!image || !direction || !price || !name) {
            notify('Porfavor rellene todos los campos', 'error', 3000);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;

            const NewFacilityObj: INewFacility = {
                town: town,
                facility: name,
                location: direction,
                price: price,
                image: base64String as string,
            };

            const response = await useNewFacility(NewFacilityObj);
            response
                ? notify('Instalacion creada con exito', 'success', 3000)
                : notify('Error al crear instalacion', 'error', 3000);
        };

        reader.readAsDataURL(image);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        file ? setImage(file) : null;
    };

    return (
        <div className="home">
            <Header
                city={town}
                loading={false}
                error={false}
                isLogged={isLogged}
                onClick={() => loginRef.current?.handleToggle()}
            />
            <form onSubmit={onHandleSubmit}>
                <label htmlFor="name">
                    <span>Nombre: </span>
                    <select
                        name="facilities"
                        id="facilities"
                        defaultValue="futbol"
                        onChange={event => setName(event.target.value)}>
                        <option value="futbol">Campo de futbol</option>
                        <option value="basquet">Campo de basquet</option>
                        <option value="tenis">Pista de tenis</option>
                        <option value="padel">Pista de padel</option>
                        <option value="fronton">Pista de fronton</option>
                    </select>
                </label>
                <label htmlFor="direction">
                    <span>Direccion: </span>
                    <input type="text" onChange={event => setDirection(event.target.value)} />
                </label>
                <label htmlFor="price">
                    <span>Precio por hora: </span>
                    <input
                        type="number"
                        min="0"
                        max="999"
                        onChange={event => setPrice(event.target.value)}
                    />
                </label>
                <label htmlFor="image">
                    <span>Imagen:</span>
                    <label htmlFor="file-upload" className={'custom-file-upload'}>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageUpload}
                        />
                        Sube o arrastra una imagen
                    </label>
                </label>
                <label htmlFor="submit" className={'saveButtonContainer'}>
                    <input type="submit" value="Crear" />
                </label>
            </form>
            <Footer town={town} isAdmin={isAdmin} />
            <BasicLogin onLogin={onLogin} ref={loginRef} />
        </div>
    );
}
