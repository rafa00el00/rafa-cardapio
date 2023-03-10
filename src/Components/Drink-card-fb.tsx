import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import '../assets/drinks-styles.css'
import { db } from "../firebase";
import { DrinkClass, getDrink } from "../modules/drinks";

type drinkCardProps = {
    idDrink: string,
}

export default function DrinkCardLazy(props: drinkCardProps) {
    return DrinkCard(props);
} 
export function DrinkCard(props: drinkCardProps) {
    let [ings, setIngs] = useState<string[]>([])
    let [drink, setDrink] = useState(new DrinkClass);
    let [isFlipped, setFlip] = useState(false);

    const featchDrink = async (id: string) => {
        await getDrink(id).then(d => {
            setDrink(d)
        })
    }
    useEffect(() => {
        featchDrink(props.idDrink);
    }, [])

    let handleClick = (e: any) => {
        e.preventDefault();
        setFlip(!isFlipped);
    }
    
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
                    <Box sx={{ mt: 1 }} >
                        <ReactCardFlip flipDirection="vertical" isFlipped={isFlipped} >
                            <div onClick={handleClick}>
                                <img src={drink.img}
                                    className="img-card"
                                    width="100%"
                                />
                                <small className="tagref" dangerouslySetInnerHTML={{ __html: drink.imgtag }}></small>
                                <h3>{drink.name}</h3>
                            </div>
                            <div onClick={handleClick}>
                                <h3>{drink.name}</h3>
                                <ul>
                                    {drink.ingredientes.map(i => <li>{i}</li>)}
                                </ul>
                            </div>
                        </ReactCardFlip>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    )
}