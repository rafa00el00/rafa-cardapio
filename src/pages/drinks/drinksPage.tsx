import { lazy, Suspense } from "react";

export default function DrinksPage() {
    const AdminBodyLazy = lazy(() => import("../../Components/Admin-body"));
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminBodyLazy >
                <h1>Drinks massa</h1>
            </AdminBodyLazy>
        </Suspense>
    )
}