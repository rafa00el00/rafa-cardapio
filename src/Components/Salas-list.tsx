import { Box, Dialog, DialogContent, List, ListItem, ListItemButton, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../context/alertContext";
import { DrinkClass, getDrink, getDrinks } from "../modules/drinks";
import { getSalas, SalaClass } from "../modules/salas";
import { SalaDetails } from "./Sala-details";


export default function SalasListLazy() {
    return SalasList()
}

export function SalasList() {
    const [salas, setSalas] = useState<SalaClass[]>([]);
    const [drinks, setDrinks] = useState<DrinkClass[]>([]);
    const { alertFail } = useContext(AlertContext);
    const [openSala, setOpenSala] = useState(false);
    const [salaElem, setSalaElem] = useState(<div></div>)

    const featchSalas = async () => {
        await getDrinks().then(d => {
            setDrinks(d)
        }).catch(e => alertFail(e.message))
        await getSalas().then(s => setSalas(s))
            .catch(e => alertFail(e.message))
    }

    useEffect(() => {
        featchSalas()
    }, []);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        let sala = salas.find(s => s.id == id) as SalaClass;
        setSalaElem(<SalaDetails sala={sala} drinks={drinks} onClose={handleClose} />)
        setOpenSala(true);
    };
    const handleClose = () => {
        setOpenSala(false);
    }

    return (
        <Box >
            <h2>Salas</h2>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                {
                    (salas && salas.length > 0) ?
                        salas.map(s =>
                            <ListItem key={s.id} alignItems="flex-start">
                                <ListItemButton onClick={(e) => handleClick(e, s.id)}>

                                    <ListItemText primary={s.name} secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Quantidade de Drinks:
                                            </Typography>
                                            {s.drinks.length}
                                        </React.Fragment>
                                    } />
                                </ListItemButton>
                            </ListItem>
                        )
                        :
                        (
                            <Stack spacing={1}>
                                <Skeleton variant="rectangular" width="100%" height={58} />
                                <Skeleton variant="rectangular" width="100%" height={58} />
                            </Stack>
                        )
                }
            </List>

            <Dialog open={openSala} onClose={handleClose} sx={{ width: "100%" }}>
                <DialogContent>
                    {salaElem}
                </DialogContent>
            </Dialog>
        </Box>
    )
}