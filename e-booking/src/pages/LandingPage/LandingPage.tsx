import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useFetchMunicipalities } from '../../hooks/useFetchMunicipalities';
import { Loader } from '../../components/Loader';
import { capitalize } from '../../utils/functions';

export function LandingPage() {
    const [town, setTown] = useState('gandia');

    const navigate = useNavigate();

    const [municipalities, loading, error] = useFetchMunicipalities();

    function onHandleSubmit(e: any) {
        e.preventDefault();
        navigate(`/${town}`);
    }

    return (
        <div className="LandingPage">
            <h2 className="LandingPage-title">Bienvenido a e-booking</h2>
            {loading ? (
                <Loader />
            ) : (
                <div className="Municipality">
                    <h4>Elije tu municipio:</h4>
                    <div className="selectWrapper">
                        <select
                            name="town"
                            id="town"
                            defaultValue="gandia"
                            onChange={e => setTown(e.target.value)}>
                            {municipalities.map((municipality: any) => (
                                <option value={municipality}>{capitalize(municipality)}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            <input type="submit" value="Continuar" onClick={onHandleSubmit} />
            {error && <p>{error}</p>}
        </div>
    );
}
