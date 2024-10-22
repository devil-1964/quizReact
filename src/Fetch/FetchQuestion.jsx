const FetchQuestion = async (amount, category, difficulty) => {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);

        if (!response.ok) {
            throw new Error('Please Try Again Later.');
        }

        const data = await response.json();
        console.log(data)
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default FetchQuestion;
