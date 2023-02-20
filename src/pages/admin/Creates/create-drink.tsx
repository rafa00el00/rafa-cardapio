import "../../../assets/forms-styles.css"
import { } from "@mui/material/Input"
import { Alert, AlertColor, Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from "@mui/material"
import React, { InputHTMLAttributes, useEffect, useState } from "react"
import { addDrink, DrinkClass } from "../../../modules/drinks"
import { Link } from "react-router-dom"
import { RotasEnum } from "../../../modules/rotasEnum"
import { DrinkForm } from "../../../Components/Drink.form"

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

export function CreateDrink(props: CreateDrinkProp) {
    const searchParams = new URLSearchParams(document.location.search)
    let drinkname = searchParams.get("drink")


    return <DrinkForm drinkId={drinkname} />
}