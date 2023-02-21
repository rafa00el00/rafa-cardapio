import { collection, doc, DocumentData, getDoc, getDocs, query, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { SalaClass } from "./salas"

export class DrinkClass {

    public id: string = ""
    public name: string = ""
    public img: string = ""
    public imgtag: string = ""
    public ingredientes: string[] = []
    public bases: string[] = []

    createId() {
        return this.name.toLowerCase()
            .replaceAll(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
            .replaceAll(new RegExp('[ÉÈÊ]', 'gi'), 'e')
            .replaceAll(new RegExp('[ÍÌÎ]', 'gi'), 'i')
            .replaceAll(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
            .replaceAll(new RegExp('[ÚÙÛ]', 'gi'), 'u')
            .replaceAll(new RegExp('[Ç]', 'gi'), 'c')
            .replaceAll(" ", "_")
    }

    static fromDocument(doc: DocumentData, id: string): DrinkClass {
        return Object.assign(new DrinkClass, {
            id: id,
            name: doc?.name,
            img: doc?.img,
            imgtag: doc?.imgtag,
            ingredientes: doc?.ingredientes,
            bases: doc?.bases || [],
        });
    }
}

export async function getDrink(id: string): Promise<DrinkClass> {
    return await getDoc(doc(db, "Drinks", id))
        .then(result => {
            let resultData = result.data();
            if (resultData) {
                return DrinkClass.fromDocument(resultData,id);

            }
            return new DrinkClass;
        });
}

export async function addDrink(drink: DrinkClass) {
    if (!drink.id || drink.id == "")
        drink.id = drink.createId();
    return await setDoc(doc(db, "Drinks", drink.createId()), { ...drink });
}

export function getDrinks() {
    
    const queryDrinks = query(collection(db, "Drinks"));
    return getDocs(queryDrinks)
        .then(r => {
            return r.docs.map(d => {
                return DrinkClass.fromDocument(d.data(),d.id);
            })
        })
}