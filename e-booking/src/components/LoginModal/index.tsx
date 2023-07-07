import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import './style.css';
import { userIsLogged } from '../../hooks/userIsAdmin';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    width: 400,
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '2px solid #000',
    borderRadius: '10px',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 4,
    textAlign: 'center',
};

interface BasicModalProps {
    onLogin: (user: string, password: string) => void;
}

export interface RefLogin {
    handleToggle: () => void;
}

export const BasicLogin = forwardRef(
    (props: BasicModalProps, ref: Ref<RefLogin | Element | null | undefined>) => {
        const [user, setUser] = useState<string>('');
        const [password, setPassword] = useState<string>('');

        const [open, setOpen] = useState(false);
        const handleToggle = () => setOpen(!open);

        useImperativeHandle(ref, () => {
            return { handleToggle };
        });

        const handleLogin = () => {
            if (user === '' || password === '') return;
            setUser('');
            setPassword('');
            handleToggle();
            props.onLogin(user, password);
        };

        const handleLogout = () => {
            localStorage.clear();
            window.location.reload();
        };

        const isLogged = userIsLogged();

        return (
            <div>
                <Modal open={open} onClose={handleToggle}>
                    <Box sx={style}>
                        <h1 className="modal-title">Login</h1>
                        <h6>Sistema de Gestión</h6>
                        <div className="input-group">
                            {!isLogged ? (
                                <div>
                                    <TextField
                                        id="standard-user"
                                        type="text"
                                        label="User"
                                        variant="standard"
                                        onChange={e => setUser(e.target.value)}
                                    />
                                    <TextField
                                        style={{ marginTop: '30px' }}
                                        id="standard-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="standard"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <div className="input-buttons">
                                        <Button variant="outlined" onClick={handleLogin}>
                                            Login
                                        </Button>
                                        <Button onClick={handleToggle}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="input-buttons">
                                    <Button variant="outlined" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                    <Button onClick={handleToggle}>Cancel</Button>
                                </div>
                            )}
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }
);
