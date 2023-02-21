import { ThemeProvider } from "@emotion/react";
import { createTheme, Container, CssBaseline, Box, Button, ButtonGroup, Avatar, IconButton, Tooltip, Menu, MenuItem, ListItemIcon } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Margin } from "@mui/icons-material";
import { RotasEnum } from "../modules/rotasEnum";
import { Navigate, useNavigate } from "react-router-dom";

type AdminBodyProps = {
    children: JSX.Element | JSX.Element[]
}

export default function AdminBodyLazy({ children }: AdminBodyProps) {
    return AdminBody({children});
}

export  function AdminBody({ children }: AdminBodyProps) {
    const { user, doSignOut } = useContext(AuthContext)
    const [perfilMenu, setPerfilMenu] = React.useState<null | HTMLElement>(null);
    const openPerfilMenu = Boolean(perfilMenu);
    const navigate = useNavigate();


    const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
        doSignOut();
        handleClose()
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setPerfilMenu(event.currentTarget);
    };
    const handleClose = () => {
        setPerfilMenu(null);
    };
    const [perfilPhoto, setPerfilPhoto] = useState<string>(user.photoURL || "")

    const navTo = (rota:string) =>{
        const navRota = `${RotasEnum.ADMIN}/${rota}`;
        navigate(navRota)
    }


    let theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Avatar alt="Meus Drinks" src="/logo_meus_drinks.png" />
                        <ButtonGroup variant="outlined" size="large" sx={{ margin: '5px' }} aria-label="large outlined button group">
                            <Button  onClick={e => navTo("")} > Admin </Button>
                            <Button onClick={e => navTo(RotasEnum.DRINKS)} > Drinks </Button>
                            <Button onClick={e => navTo(RotasEnum.SALAS)} > Salas </Button>
                        </ButtonGroup>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={openPerfilMenu ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openPerfilMenu ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }} srcSet={perfilPhoto} src={perfilPhoto} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={perfilMenu}
                            id="account-menu"
                            open={openPerfilMenu}
                            onClose={handleClose}
                            onClick={handleClose}

                        >
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                Sair
                            </MenuItem>
                        </Menu>
                    </Box>
                </React.Fragment>
                <CssBaseline />
                <Box sx={{ margin:"3em auto" }}>
                    {children}
                </Box>
            </Container>
        </ThemeProvider>
    )
}