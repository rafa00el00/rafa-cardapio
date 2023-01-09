import { DrinkCard } from "./Components/Drink-card"
import drinks from './assets/drinks.json'

import { useEffect, useState } from "react"
interface DrinkModel{
   name: string
   ingredientes: string[]
}
function App() {
  console.log(drinks)
  let [menu, setMenu] = useState<DrinkModel[]>(drinks)

  return(
    <div>
      {menu.map(m => {
        return <DrinkCard name={m.name} ingredientes={m.ingredientes} />
      })}
      
    </div> 
  )
}


export default App
