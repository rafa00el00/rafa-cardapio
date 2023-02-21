import { List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Skeleton, Stack, Box, Button, ButtonGroup } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/alertContext";
import { DrinkClass, getDrinks } from "../modules/drinks"
import { RotasEnum } from "../modules/rotasEnum";

export default function DrinksListLazy() {
    return DrinksList();
}
export function DrinksList() {
    const [drinks, setDrinks] = useState<DrinkClass[]>([]);
    const navigate = useNavigate();
    const { alertFail } = useContext(AlertContext);
    const handleToggle = (id: string | null) => {
        navigate(`${RotasEnum.ADMIN}/${RotasEnum.CREATE_DRINK}?drink=${id}`)
    }

    const featchDrinks = () => {
        getDrinks().then(d => setDrinks(d))
            .catch(e => alertFail(e.message))
    }

    useEffect(() => featchDrinks, [])

    return (
        <Box>
            <h2>Lista de Drinks</h2>
            <ButtonGroup fullWidth size="small" aria-label="small button group">
                <Button onClick={(e) => handleToggle(null)}  > + Create Drink</Button>
            </ButtonGroup>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    drinks && drinks.length > 0 ?
                        drinks.map(d => {

                            return (<ListItem
                                alignItems="flex-start"
                                key={d.id}
                                disablePadding
                            >
                                <ListItemButton onClick={(e) => handleToggle(d.id)} >
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            src={d.img}
                                            sx={{ width: 70, height: 70 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={d.id} primary={d.name} />
                                </ListItemButton>


                            </ListItem>)
                        }) :
                        (
                            <Stack spacing={1}>
                                {
                                    [...Array(5).keys()].map(n => {
                                        return (<Skeleton variant="rectangular" width="100%" height={70} />)
                                    })
                                }
                            </Stack>
                        )
                }
            </List>
        </Box>
    )
}