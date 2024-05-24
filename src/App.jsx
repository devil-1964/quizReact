import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Landing from './Main/Landing'
import MainPage from './QuizPage/MainPage'
function App() {


  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
