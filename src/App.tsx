
import { AlertProvider } from "./context/alertContext"
import { AuthProvider } from "./context/authContext"
import { Rotas } from "./Rotas/rotas"

function App() {

  return (
    <AlertProvider>
      <AuthProvider >
        <Rotas />
      </AuthProvider>
    </AlertProvider>
  )

}


export default App
