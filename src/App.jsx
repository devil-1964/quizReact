import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Landing from './Main/Landing'
import MainPage from './QuizPage/MainPage'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },

});
function App() {


  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<MainPage />} />
      </Routes>
    </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
