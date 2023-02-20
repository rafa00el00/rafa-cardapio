
import { Link } from "react-router-dom";
import { RotasEnum } from "../../modules/rotasEnum";
import { CreateDrink, SalaProp } from "./Creates/create-drink";
import { LoginPage } from "../login/login";
import { AdminBody } from "../../Components/Admin-body";
import { Typography } from "@mui/material";


export function AdminPage() {
    let salas: SalaProp[] = [
        { name: "Cardapio Rafa", id: "rafa" }
    ]
    return (
        <AdminBody >
            <Typography>Pagina Admin</Typography>
            <Link  to={`${RotasEnum.CREATE_DRINK}?drink=caipirinha`} >Create Drink</Link>
        </AdminBody>
    )
}