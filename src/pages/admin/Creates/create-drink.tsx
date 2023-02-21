import "../../../assets/forms-styles.css"
import { } from "@mui/material/Input"
import { AlertColor } from "@mui/material"
import React, {  } from "react"

export type SalaProp = {
    id: string,
    name: string
}
type CreateDrinkProp = {
}
type statusAlert = {
    type: AlertColor | undefined,
    msg: string
}

export default function CreateDrink(props: CreateDrinkProp) {
    const searchParams = new URLSearchParams(document.location.search)
    let drinkname = searchParams.get("drink")

    const DrinkFormLazy = React.lazy(() => import("../../../Components/Drink.form"))


    return <DrinkFormLazy drinkId={drinkname} />
}