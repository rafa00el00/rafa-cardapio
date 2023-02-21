import { lazy, Suspense } from "react";

export default function SalasPage() {
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