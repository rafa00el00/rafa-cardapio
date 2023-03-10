
import { lazy, Suspense } from "react";
import { SalaProp } from "./Creates/create-drink";



export default function AdminPage() {
    let salas: SalaProp[] = [
        { name: "Cardapio Rafa", id: "rafa" }
    ]
    const AdminBodyLazy = lazy(() => import("../../Components/Admin-body"));
    const SalasListLazy = lazy(() => import("../../Components/Salas-list"));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminBodyLazy >
                <SalasListLazy />
            </AdminBodyLazy>
        </Suspense>
    )
}