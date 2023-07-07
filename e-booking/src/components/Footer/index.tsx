import './style.css';

export function Footer({ isAdmin, town }: { isAdmin: boolean; town: string }) {
    return (
        <footer>
            {isAdmin ? (
                <a href={`${process.env.REACT_APP_FRONTEND}/newFacility/${town}`}>
                    Añadir instalación
                </a>
            ) : null}

            <p>© 2023 - {isAdmin ? town : 'User'} - Todos los derechos reservados</p>
        </footer>
    );
}
