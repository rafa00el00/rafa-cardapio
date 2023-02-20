
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { RotasEnum } from "./modules/rotasEnum"
import { AdminPage } from "./pages/admin/admin"
import { CreateDrink } from "./pages/admin/Creates/create-drink"
import { AuthProvider } from "./pages/context/authContext"
import { HomePage } from "./pages/home/home"
import { LoginPage } from "./pages/login/login"
import { Rotas } from "./Rotas/rotas"

function App() {

  // return (
  //   <Router>
  //     <Routes>
  //       {/* <Route path="/" element={<HomePage />} /> */}
  //       <Route path={RotasEnum.BASE} element={<HomePage />} />
  //       {/* <Route path={RotasEnum.LOGIN} element={<LoginPage />} /> */}
  //       {/* <Route element={<PrivateRoutes />}> */}
  //       {/* <Route path={RotasEnum.ADMIN} element={<AdminPage />} />
  //       <Route path={RotasEnum.CREATE_DRINK} element={<CreateDrink />} /> */}
  //       {/* </Route> */}
  //     </Routes>
  //   </Router>
  // )
  return (
    <AuthProvider >
      <Rotas />
    </AuthProvider>
  )

}


export default App
