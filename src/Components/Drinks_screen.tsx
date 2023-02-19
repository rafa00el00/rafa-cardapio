import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { DrinkCard } from "./Drink-card-fb";
export function DrinksScena() {

    let [sala, setSala] = useState({ name: "loading...", drinks: [] });
    const featchSala = async () => {
        await getDoc(doc(db, "Salas", "vqNspw0bNZ0z5jAvVFtc"))
            .then(result => {
                let resultData = result.data() || {};
                
                let newSala = {
                    name: resultData.name,
                    drinks: resultData.drinks,
                }
                setSala(newSala)
            })
    }

    useEffect(() => {
        featchSala();
    })

    // return <h1>{sala.name}</h1>
    return (
        <div>
            <center><h1>{sala.name}</h1></center>
            {sala.drinks.map(m => {
                return <DrinkCard idDrink={m} />
            })}

        </div>
    )
}

