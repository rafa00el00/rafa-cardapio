
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { RotasEnum } from "./modules/rotasEnum"
import { AdminPage } from "./pages/admin/admin"
import { CreateDrink } from "./pages/admin/Creates/create-drink"
import { HomePage } from "./pages/home/home"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={RotasEnum.BASE} element={<HomePage />} />
        <Route path={RotasEnum.ADMIN} element={<AdminPage />} ></Route>
        <Route path={RotasEnum.CREATE_DRINK} element={<CreateDrink />} />
      </Routes>
    </Router>
  )

}


export default App
