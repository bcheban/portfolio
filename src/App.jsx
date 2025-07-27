import { Home } from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotFound } from "./pages/NotFound"

function App() {

  return (
    <>
      <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route index path="*" element={<NotFound/>}/>
                </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
