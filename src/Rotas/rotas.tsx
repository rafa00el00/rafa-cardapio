import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { RotasEnum } from "../modules/rotasEnum"
import { lazy, Suspense } from "react"
// import { DrinksPage } from "../pages/drinks/drinksPage"

export function Rotas() {

    const DrinksPage = lazy(() => import('../pages/drinks/drinksPage'))
    const CreateDrink = lazy(() => import('../pages/admin/Creates/create-drink'))
    const LoginPage = lazy(() => import('../pages/login/login'))
    const HomePage = lazy(() => import('../pages/home/home'))
    const AdminPage = lazy(() => import('../pages/admin/admin'))
    const PrivateRoutes = lazy(() => import('./privateRoutes'));
    const SalasPage = lazy(() => import('../pages/salas/salasPage'))
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>

                    <Route path="/" element={<HomePage />} />
                    <Route path={RotasEnum.BASE} element={<HomePage />} />
                    <Route path={RotasEnum.LOGIN} element={<LoginPage />} />
                    <Route path={RotasEnum.ADMIN} element={<PrivateRoutes />}>
                        <Route path="" element={<AdminPage />} />
                        <Route path={RotasEnum.CREATE_DRINK} element={<CreateDrink />} />
                        <Route path={RotasEnum.SALAS} element={<SalasPage />} />
                        <Route path={RotasEnum.DRINKS} element={<DrinksPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}