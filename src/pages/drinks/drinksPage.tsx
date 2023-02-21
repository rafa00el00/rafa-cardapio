import { lazy, Suspense } from "react";

export default function DrinksPage() {
    const AdminBodyLazy = lazy(() => import("../../Components/Admin-body"));
    const DrinksListLazy = lazy(() => import("../../Components/Drinks-list"));
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminBodyLazy >
                <DrinksListLazy />
            </AdminBodyLazy>
        </Suspense>
    )
}