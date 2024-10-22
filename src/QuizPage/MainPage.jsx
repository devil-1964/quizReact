import FetchQuestion from "../Fetch/FetchQuestion";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import myImg from "../assets/errorPng.png";
import { useNavigate } from "react-router-dom";

const MainPage = ({ quizSettings }) => {
    const { numberOfQuestions = 5, selectedCategories: category = 9, difficulty = 'easy' } = quizSettings || {};

    const { data: questions = [], error, isLoading, refetch } = useQuery(
        ['FetchQuestion', { numberOfQuestions, category, difficulty }],
        () => FetchQuestion(numberOfQuestions, category, difficulty),
        { enabled: !!quizSettings }
    );

    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [scoreCard, setScoreCard] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [number, setNumber] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (questions && questions.length > 0) {
            const currentQuestion = questions[questionIndex];
            const mapAns = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
            const ans = mapAns.map(decodeHtmlEntities);
            shuffleArray(ans);
            const mappedAnswers = ans.map((answer, index) => ({
                id: index,
                text: answer,
            }));
            setShuffledAnswers(mappedAnswers);
        }
    }, [questionIndex, questions]);

    if (isLoading) {
        return <div className="loader"></div>;
    }

    if (error) {
        return (
            <div
                className="Error"
                style={{
                    backgroundImage: `url(${myImg})`,
                    backgroundPosition: 'center',
                    width: "100vw",
                    height: "100vh"
                }}
            >
                <p>An error occurred while fetching questions. Please try again later.</p>
            </div>
        );
    }

    const handleRestart = async () => {
        await refetch();
        setQuestionIndex(0);
        setScore(0);
        setSelected(null);
        setIsCorrect(null);
        setScoreCard(false);
        setShuffledAnswers([]);
        setNumber(1);
        navigate("/set-question");
    };

    const decodeHtmlEntities = (str) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    if (!questions ) {
        return <div>No questions available.</div>;
    }

    const currentQuestion = questions[questionIndex];
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
                setNumber(number + 1);
            } else {
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", padding: "2vh 5vh" }}>
            {scoreCard ? (
                <>
                    <div className="scoreCard">
                        You scored <span className="highlight" style={{ color: (score > 8) ? "green" : (score < 3) ? "red" : "" }}>{score}</span> out of <span className="highlight">{questions.length}</span>
                    </div>

                    <div className="answerQuestion">
                        {questions.map((ques, index) => (
                            <li style={{ display: "flex", fontSize: "25px", gap: "7px", fontFamily: "serif", fontWeight: "500" }} key={index}>
                                <ul style={{ paddingBottom: "10px", fontFamily: "monospace", fontSize: "27px", fontWeight: "bold" }}>{decodeHtmlEntities(ques.question)}</ul>
                                <ul style={{ color: "white" }}>{decodeHtmlEntities(ques.correct_answer)}</ul>
                            </li>
                        ))}
                    </div>
                    <button className="button-350" onClick={handleRestart}>Play Again</button>
                </>
            ) : (
                <>
                    <div className="questionNumber">Question #{number}</div>
                    <h1 className="fontUbuntu shadowBox" style={{ minWidth: "80vw", textAlign: "center", backgroundColor: "white", padding: "3vw 4.5vw", borderRadius: "20px" }}>{decodeHtmlEntities(currentQuestion.question)}</h1>
                    <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "center", padding: "10vh 0", minWidth: "70vw", justifyContent: "center" }}>
                        <div className="optionsContainer" style={{ display: 'flex', gap: "25px", width: "60vw", minWidth: "35rem", flexWrap: "wrap", alignItems: "center" }}>
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
};

export default MainPage;
