import { lazy, Suspense } from "react";

export default function HomePage() {
    const DrinksScenaLazy = lazy(() => import("../../Components/Drinks_screen"));
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DrinksScenaLazy sala={null} />
        </Suspense>
    )
}