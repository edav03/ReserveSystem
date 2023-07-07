import user from '../../assets/img/user.png';
import { capitalize } from '../../utils/functions';
import { Loader } from '../Loader';
import './style.css';

interface HeaderProps {
    city: string;
    loading: boolean;
    error: boolean;
    isLogged: string;
    onClick?: () => void;
}

export function Header(props: HeaderProps) {
    const { city = 'Madrid', loading = false, error = false, isLogged } = props;
    const title = (
        <a href={`${process.env.REACT_APP_FRONTEND}/${city}`}>Ayuntamiento de {capitalize(city)}</a>
    );
    return (
        <header>
            <h2>{loading ? <Loader /> : title}</h2>
            <div className="LoginArea" onClick={props.onClick}>
                <button className="LoginButton">
                    <img src={user} alt="Logo Usuario" />
                    <p>{isLogged ? capitalize(isLogged) : 'Iniciar Sesión'}</p>
                </button>
            </div>
        </header>
    );
}
