import { lazy, Suspense } from "react";
import AdminBody from "../../Components/Admin-body";
import DrinksList from "../../Components/Drinks-list";

export default function DrinksPage() {
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminBody >
                <DrinksList />
            </AdminBody>
        </Suspense>
    )
}