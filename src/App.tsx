
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { AdminPage } from "./pages/admin/admin"
import { CreateDrink } from "./pages/admin/Creates/create-drink"
import { HomePage } from "./pages/home/home"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rafa-cardapio" element={<HomePage />} />
        <Route path="/rafa-cardapio/Admin" element={<AdminPage />} >
          
        </Route>
        <Route path="/rafa-cardapio/Admin/create-drink" element={<CreateDrink />} />
      </Routes>
    </Router>
  )

}


export default App
