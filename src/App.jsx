import './App.css'
import {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Landing from './Main/Landing'
import MainPage from './QuizPage/MainPage'
import { QueryClient, QueryClientProvider } from 'react-query';
import SetQuestion from './QuizPage/SetQuestion'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },

});
function App() {
  const [quizSettings, setQuizSettings] = useState(null);

  const handleStartQuiz = (settings) => {
      setQuizSettings(settings);
  };


  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<MainPage quizSettings={quizSettings}/>} />
        <Route path="/set-question" element={<SetQuestion onStartQuiz={handleStartQuiz}/>} />
      </Routes>
    </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
