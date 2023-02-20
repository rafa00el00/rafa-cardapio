
import { Link } from "react-router-dom";
import { RotasEnum } from "../../modules/rotasEnum";
import { CreateDrink, SalaProp } from "./Creates/create-drink";
import { LoginPage } from "../login/login";


export function AdminPage() {
    let salas: SalaProp[] = [
        { name: "Cardapio Rafa", id: "rafa" }
    ]
    return (
        <div>
            <h1>Pagina Admin</h1>
            <Link  to={RotasEnum.CREATE_DRINK} >Create Drink</Link>
        </div>
    )
}