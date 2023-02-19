import "../../../assets/forms-styles.css"
import { } from "@mui/material/Input"
import { Alert, Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from "@mui/material"
import React, { useState } from "react"
import { addDrink, DrinkClass } from "../../../modules/drinks"
import { Link } from "react-router-dom"
import { RotasEnum } from "../../../modules/rotasEnum"

export type SalaProp = {
    id: string,
    name: string
}
type CreateDrinkProp = {
}

export function CreateDrink(props: CreateDrinkProp) {

    let [alert,setAlert] = useState({type: "", msg: ""})
    

    let handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        addDrink(Object.assign(new DrinkClass,{
            name: data.get("name"),
            ingredientes: data.get("ingredientes")?.toString().split("\n"),
            bases: data.get("bases"),
            tag: data.get("imgtag"),
            img: imgLoad
        }))
        .then(r => {
            for (var key of data.keys()) {
                data.delete(key)
                };
            setImgLoad("")
            setAlert({type: "success", msg: "Cadastro com sucesso!"})
        }).catch(r =>{
            console.log(r)
            setAlert({type: "error", msg: r.message })
        });

    }
    let [imgLoad, setImgLoad] = useState("");

    let handleImg = ({target}) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            if (e.target && e.target.result)
                setImgLoad(e.target.result.toString())
        }
    }
    let theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Alert severity={alert.type} >{alert.msg}</Alert>
                <Link to={RotasEnum.ADMIN}>Voltar</Link>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Adicionar Drink
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            required
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="ingredientes"
                            label="Ingredientes"
                            name="ingredientes"
                            multiline
                            required
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="bases"
                            label="Bases"
                            name="bases"
                            multiline
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="imgtag"
                            label="Descrição da imagem"
                            name="imgtag"
                            required
                        />
                        <Button
                            variant="contained"

                            component="label"
                            fullWidth
                        >
                            Adicionar Imagem
                            <input
                                type="file"
                                name="img"
                                id="img"
                                accept="image/*"
                                hidden
                                required
                                onChange={handleImg}
                            />
                        </Button>
                        <img
                            src={`${imgLoad}`} 
                            srcSet={`${imgLoad}`}
                            width="300px"
                            loading="lazy"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Adicionar Drink
                        </Button>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    )
}