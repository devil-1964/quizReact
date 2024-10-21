const FetchQuestion = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');

        if (!response.ok) {
            throw new Error('Please Try Again Later.');
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default FetchQuestion;
