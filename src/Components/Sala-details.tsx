import { Avatar, Box, Button, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import React, { useContext, useState } from "react"
import { AlertContext } from "../context/alertContext"
import { DrinkClass } from "../modules/drinks"
import { addSala, getSala, SalaClass } from "../modules/salas"

type SalaDetailsProps = {
    sala: SalaClass
    drinks: DrinkClass[]
    onClose: () => void | null 
}

export default function SalaDetailsLazy(props: SalaDetailsProps) {
    return SalaDetails(props);
}
export function SalaDetails(props: SalaDetailsProps) {
    const [checked, setChecked] = useState<string[]>(props.sala.drinks);
    const {alertSuccess, alertFail} = useContext(AlertContext);

    const handleToggle = (value: string) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    const handleUpdate = () =>{
        let sala = props.sala;
        sala.drinks = checked;
        addSala(sala).then(s => {
            alertSuccess("Sala Atualizada");
            props.onClose();
        }).catch(e => alertFail(e.message));
    }

    return (
        <Box >
            <h2>{props.sala.name}</h2>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    props.drinks.map(d => {

                        return (<ListItem
                            alignItems="flex-start"
                            key={d.id}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={(e) => handleToggle(d.id)}
                                    checked={checked.indexOf(d.id) !== -1}
                                    inputProps={{ 'aria-labelledby': d.id }}
                                />
                            }
                            disablePadding
                        >
                            <ListItemButton onClick={(e) => handleToggle(d.id)} >
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        src={d.img}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={d.id} primary={d.name} />
                            </ListItemButton>


                        </ListItem>)
                    })
                }
            </List>
            <Button
                fullWidth
                onClick={handleUpdate}
            >
                Update Sala
            </Button>
        </Box>
    )
}