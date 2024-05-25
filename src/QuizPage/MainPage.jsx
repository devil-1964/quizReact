import FetchQuestion from "../Fetch/FetchQuestion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useEffect } from "react";

const MainPage = () => {
    const { data: questions, error, isLoading } = useQuery('FetchQuestion', FetchQuestion);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [scoreCard, setScoreCard] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) return <div>Something went wrong</div>;

    const currentQuestion = questions[questionIndex];
    const shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].map((answer, index) => ({
        id: index,
        text: answer,
    })).sort();
    const correctAnswer = currentQuestion.correct_answer;

    const handleAnswer = (index) => {
        const selectedAnswer = shuffledAnswers[index].text;
        const correct = selectedAnswer === correctAnswer;
        setSelected(index);
        setIsCorrect(correct);
        if (correct) {
            setScore(score + 1);
        }
        setTimeout(() => {
            const nextQuestion = questionIndex + 1;
            if (nextQuestion < questions.length) {
                setQuestionIndex(nextQuestion);
                setSelected(null);
                setIsCorrect(null);
            }
            else {
                setScoreCard(true);
            }
        }, 2000);

    };

    const getButtonClass = (index) => {
        if (selected === null) return 'button-35';
        return selected === index
            ? isCorrect
                ? 'button-35 correct'
                : 'button-35 incorrect'
            : 'button-35';
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", padding: "2vh 5vh" }}>{scoreCard ? (<div>You scored {score} out of {questions.length}</div>) : (<>
            <h1 className="fontUbuntu shadowBox" style={{ minWidth: "80vw", textAlign: "center", backgroundColor: "white", padding: "6vw 8vw", borderRadius: "20px" }} dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "center", padding: "10vh 0", minWidth: "70vw", justifyContent: "center" }}>
                <div style={{ display: 'flex', gap: "25px", width: "10vw", minWidth: "400px", flexWrap: "wrap", justifyContent: "center" }}>
                    {shuffledAnswers.map((answer, index) => (
                        <button
                            key={answer.id}
                            className={getButtonClass(index)}
                            onClick={() => handleAnswer(index)}
                            disabled={selected !== null}
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>
        </>
        )}
        </div>
    );
}

export default MainPage;
