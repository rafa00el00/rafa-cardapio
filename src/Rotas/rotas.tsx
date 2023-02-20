import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { RotasEnum } from "../modules/rotasEnum"
import { CreateDrink } from "../pages/admin/Creates/create-drink"
import { LoginPage } from "../pages/login/login"
import { HomePage } from "../pages/home/home"
import { AdminPage } from "../pages/admin/admin"
import { PrivateRoutes } from "./privateRoutes"

export function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path={RotasEnum.BASE} element={<HomePage />} />
                <Route path={RotasEnum.LOGIN} element={<LoginPage />} />
                <Route path={RotasEnum.ADMIN} element={<PrivateRoutes />}>
                    <Route path="" element={<AdminPage />} />
                    <Route path={RotasEnum.CREATE_DRINK} element={<CreateDrink  />} />
                </Route>
            </Routes>
        </Router>
    )
}