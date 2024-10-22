import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SetQuestion = ({ onStartQuiz }) => {
    const [numberOfQuestions, setNumberOfQuestions] = useState("5");
    const [selectedCategories, setSelectedCategories] = useState("9");
    const [difficulty, setDifficulty] = useState("easy");
    const navigate = useNavigate();

    const handleStart = () => {
        onStartQuiz({ numberOfQuestions, selectedCategories, difficulty });
        navigate("/quiz"); 
    };

    return (
        <div className="setQuestion">
            <div className="inputDiv">
                <label htmlFor="numberOfQuestions">Number of Questions:&nbsp;</label>
                <select
                    id="numberOfQuestions"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(e.target.value)}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="inputDiv">
                <label htmlFor="triviaCategories">Select Trivia Categories:</label>
                <select
                    id="triviaCategories"
                    value={selectedCategories}
                    onChange={(e) => setSelectedCategories(e.target.value)}
                >
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="17">Science & Nature</option>
                </select>
            </div>
            <div className="inputDiv">
                <label htmlFor="difficulty">Difficulty:&nbsp;</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="buttonSet">
                <button className="button-350"onClick={handleStart} >
                    Start</button>            </div>
        </div>
    );
};

export default SetQuestion;
