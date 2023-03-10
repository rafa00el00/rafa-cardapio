import { ThemeProvider } from "@emotion/react";
import { Label } from "@mui/icons-material";
import { createTheme, Container, CssBaseline, Alert, Box, Typography, TextField, Button, CircularProgress, Skeleton, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { addDrink, DrinkClass, getDrink } from "../modules/drinks";
import { RotasEnum } from "../modules/rotasEnum";
import { AlertContext } from "../context/alertContext";
import { AdminBody } from "./Admin-body";

type DrinkFormProps = {
    drinkId: string | null
}

export default function DrinkFormLazy(props: DrinkFormProps) {
    return DrinkForm(props);
}

export function DrinkForm(props: DrinkFormProps) {
    let [drinkId, setDrinkId] = useState("");
    let [name, setName] = useState("");
    let [ingredientes, setIngredientes] = useState("");
    let [bases, setBases] = useState("");
    let [tag, setTag] = useState("");
    let [imgs, setImgs] = useState("");

    let formsFields = [setDrinkId, setName, setIngredientes, setBases, setTag, setImgs]

    let [btnLabel, setBtnLabel] = useState("Adicionar Drink");
    const [loading, setLoading] = useState(false);

    const { alertSuccess, alertFail } = useContext(AlertContext);
    // Get Drink for Update
    if (props.drinkId && props.drinkId != "" && props.drinkId != "null") {
        useEffect(() => {
            console.log("Get drink" + props.drinkId)
            setLoading(true);
            setBtnLabel("Update Drink");
            setDrinkId(props.drinkId || "");
            getDrink(props.drinkId || "").then(drink => {
                setName(drink.name);
                setIngredientes(drink.ingredientes.join("\n"));
                setBases(drink.bases.join("\n"));
                setTag(drink.imgtag);
                setImgs(drink.img);
                setLoading(false);
            }).catch(e => {
                setLoading(false);
                console.log(e.message)
                console.log(e)
                alertFail("N??o foi possivel carregar o Drink");
            })
        }, [props.drinkId])
    }

    // Get Img
    const handleImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        if (event && event.target && event.target.files) {
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onload = (e) => {
                if (e.target && e.target.result)
                    setImgs(e.target.result.toString())
            }
        }
    }

    // Handle Adicionar/Update
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (imgs == "") {
            alertFail("Selecione uma imagem");
        }
        setLoading(true);

        addDrink(Object.assign(new DrinkClass, {
            id: drinkId,
            name: name,
            ingredientes: ingredientes.split("\n"),
            bases: bases.split("\n"),
            imgtag: tag,
            img: imgs
        }))
            .then(r => {
                formsFields.every(f => f(""));
                setLoading(false);
                alertSuccess("Drink modificado com sucesso")
            }).catch(r => {
                setLoading(false);
                alertFail(r.message)
            });

    }

    const btn = (): JSX.Element => {
        if (loading)
            return <CircularProgress />
        return (
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
            >
                {btnLabel}
            </Button>
        )
    }


    let theme = createTheme();
    return (
        <AdminBody >
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {btnLabel}
                </Typography>
                {
                    ((name && props.drinkId) || (!props.drinkId || props.drinkId == "null")) ?


                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label="Name"
                                name="name"
                                required
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="ingredientes"
                                value={ingredientes}
                                onChange={(e) => setIngredientes(e.target.value)}
                                label="Ingredientes"
                                name="ingredientes"
                                multiline
                                required
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="bases"
                                value={bases}
                                onChange={(e) => setBases(e.target.value)}
                                label="Bases"
                                name="bases"
                                multiline
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="imgtag"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                label="Descri????o da imagem"
                                name="imgtag"
                                required
                            />
                            <Button
                                variant="contained"

                                component="label"
                                fullWidth
                            >
                                Selecionar Imagem
                                <input
                                    type="file"
                                    name="img"
                                    id="img"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImg}
                                />
                            </Button>
                            <img
                                src={`${imgs}`}
                                srcSet={`${imgs}`}
                                width="300px"
                                loading="lazy"
                            />
                            <div>
                                {btn()}
                            </div>

                        </Box>
                        : (
                            <Stack spacing={1}>
                                {/* For variant="text", adjust the height via font-size */}
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                                {/* For other variants, adjust the size with `width` and `height` */}
                                <Skeleton variant="rectangular" width={210} height={60} />
                                <Skeleton variant="rounded" width={210} height={60} />
                            </Stack>
                        )
                }

            </Box>
        </AdminBody>
    )


}