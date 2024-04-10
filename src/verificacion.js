/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
 
import { Button, Container, Typography } from '@mui/material';
 
import { jwtDecode } from "jwt-decode";
import AlertDialog from './common/Dialog';
 
import apiService from './services/apiHttp';
import { Loading } from './utils/Loading'; 
import { useLocation } from 'react-router-dom';

export const Verificacion = () => {

    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [openAlert, setOpenAlert] = useState(false);
    const [open, setOpen] = useState({ msg: "", title: "Verificación de correo" });


    useEffect(() => {
        try {
            if (token === null) {
                setOpen({ ...open, msg: "El token no es válido, si aún no han pasado las 48hrs desde que recibió el correo, por favor comúniquese con el gestor que tomó sus datos" });
                setOpenAlert(true);
            }
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
         
            if (decodedToken.ex < currentTime) {
                setOpen({ ...open, msg: "El token se ha vencido." });
                setOpenAlert(true);
            } else {

                //  verifica_correo(token);
            }
        } catch (error) {
            console.log("Token inválido");
            setOpen({ ...open, msg: "No podemos verificar sus datos." });
            setOpenAlert(true);
        }
        // dispatch(startChecking(token));

    }, []);

    const verifica_correo = async (token) => {
    
        setLoading(true);
        apiService.postVerificacion(token)
            .then((data) => {
                setOpen({ ...open, msg: "El registro se ha completado, ya puede cerrar esta web." });
                setOpenAlert(true);
                setLoading(false);
            })
            .catch((error) => {
                setOpen({ ...open, msg: "Algo ha salido mal con su registro y no hemos podido completarlo, por favor comuníquelo a su gestor." });
                console.log(error);
                setOpenAlert(true);
                setLoading(false);
            });
    }

    const handleAccept = () => {
        setOpen(false);
        setOpenAlert(false);
    }

    return (
        <div className='container'>
            <Container fixed className='formContainer'>
                <Typography variant="h5" align="center" className='title' gutterBottom>
                Verificación de correo
                </Typography>
                {loading ? <Loading /> :
                    <> <Typography variant="p" align="center" gutterBottom>
                        Gracias por elegirnos, tu correo será verificado por favor presione al botón continuar.
                    </Typography>

                        <Button fullWidth
                            onClick={() => verifica_correo(token)}
                            size="large"
                            variant="contained"
                            color="primary"
                            className="submitButton"
                            sx={{ marginTop: 2 }}
                            spacing={2}>
                            continuar
                        </Button>
                    </>
                }

                <AlertDialog openAlert={openAlert} setOpenAlert={setOpenAlert} handleAccept={handleAccept} msg={open.msg} title={open.title} />
            </Container>
        </div>
    );
}