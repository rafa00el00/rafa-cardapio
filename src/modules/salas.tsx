import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"
import { db } from "../firebase"

export class SalaClass {
    public id: string = ""
    public name: string = ""
    public drinks: string[] = []
}

const COLLECTION_NAME = "Salas"

export function getSalas() {
    const querySalas = query(collection(db, COLLECTION_NAME));
    return getDocs(querySalas)
        .then(r => {
            return r.docs.map(d => {
                return {
                    id: d.id,
                    ...d.data()
                } as SalaClass
            })
        })
}

export async function getSala(salaId: string) {
    await getDoc(doc(db, COLLECTION_NAME, salaId))
        .then(result => {
            let resultData = result.data() || {};

            let newSala = {
                name: resultData.name,
                drinks: resultData.drinks,
            }
            return newSala;
        })
}

export async function addSala(sala: SalaClass) {
    if (!sala.id || sala.id == "") //Add
    {
        return await addDoc(collection(db,COLLECTION_NAME),{ ... sala})
    }else{ //Update
        return await setDoc(doc(db, COLLECTION_NAME, sala.id), { ...sala });
    }
       
}