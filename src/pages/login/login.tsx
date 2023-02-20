import { Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { doLogin } from "../../modules/auth";
import { RotasEnum } from "../../modules/rotasEnum";
import { AuthContext, AuthContextProps } from "../context/authContext";

export function LoginPage() {
    let [userName, setUser] = useState<string>("")
    let [pass, setPass] = useState<string>("");
    const { doSingIn, signed, user } = useContext(AuthContext)

    let handleLogin = (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        doSingIn(userName,pass)
        
    }
    
    if(signed)
        return <Navigate to={RotasEnum.ADMIN} />

    let theme = createTheme()
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }} >
                        
                        <TextField
                            margin="normal"
                            fullWidth
                            id="user"
                            label="Usuario"
                            name="user"
                            value={userName}
                            onChange={e => {
                                setUser(e.target.value)
                            }}
                            required
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            type="password"
                            id="pass"
                            label="Senha"
                            name="pass"
                            value={pass}
                            onChange={e => {
                                setPass(e.target.value)
                            }}
                            required
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Logar
                        </Button>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    )
}