import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

export class DrinkClass {

    public id: string = ""
    public name: string = ""
    public img: string = ""
    public tag: string = ""
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
}

export async function getDrink(id: string): Promise<DrinkClass> {
    return await getDoc(doc(db, "Drinks", id))
        .then(result => {
            let resultData = result.data();
            if (resultData) {
                return  Object.assign(new DrinkClass, {
                    name: resultData?.name,
                    img: resultData?.img,
                    tag: resultData?.imgtag,
                    ingredientes: resultData?.ingredientes,
                    bases: resultData?.bases,
                })
                
            }
            return new DrinkClass;
        });
}

export async function addDrink(drink: DrinkClass) {
    drink.id = drink.createId();
    console.log(drink)
    return await setDoc(doc(db, "Drinks", drink.createId()), { ... drink});
}