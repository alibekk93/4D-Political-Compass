import React, { useState } from 'react';
import './App.css'; // Now importing the external CSS file

// Define the questions for each dimension
const questions = [
    // Economic (Left: -10, Right: +10)
    // Polarity: 1 means Agree pushes towards the positive end (+10 Right)
    // Polarity: -1 means Agree pushes towards the negative end (-10 Left)
    { id: 'econ1', text: "The government should provide a universal basic income to all citizens.", dimension: 'economic', polarity: -1 }, // Agree = Left (negative score)
    { id: 'econ2', text: "High taxes on corporations stifle economic growth and innovation.", dimension: 'economic', polarity: 1 }, // Agree = Right (positive score)
    { id: 'econ3', text: "Essential services like healthcare and education should be publicly funded and managed.", dimension: 'economic', polarity: -1 }, // Agree = Left (negative score)
    { id: 'econ4', text: "Free markets, with minimal government regulation, are the most efficient way to allocate resources.", dimension: 'economic', polarity: 1 }, // Agree = Right (positive score)
    { id: 'econ5', text: "Wealthy individuals should pay a significantly higher percentage of their income in taxes than lower-income individuals.", dimension: 'economic', polarity: -1 }, // Agree = Left (negative score)

    // Authoritarian (Libertarian: -10, Authoritarian: +10)
    { id: 'auth1', text: "The state should have the power to restrict individual freedoms in times of national crisis.", dimension: 'authoritarian', polarity: 1 }, // Agree = Authoritarian
    { id: 'auth2', text: "Individuals should have complete freedom of speech, even if it offends others.", dimension: 'authoritarian', polarity: -1 }, // Agree = Libertarian
    { id: 'auth3', text: "Strict law enforcement and harsh penalties are necessary to maintain social order.", dimension: 'authoritarian', polarity: 1 }, // Agree = Authoritarian
    { id: 'auth4', text: "People should be free to make choices about their own bodies, even if those choices are unpopular.", dimension: 'authoritarian', polarity: -1 }, // Agree = Libertarian
    { id: 'auth5', text: "National security concerns often justify surveillance of citizens without a warrant.", dimension: 'authoritarian', polarity: 1 }, // Agree = Authoritarian

    // Traditionalism (Progressive: -10, Traditionalist: +10)
    { id: 'trad1', text: "Traditional family structures are essential for a stable society.", dimension: 'traditional', polarity: 1 }, // Agree = Traditionalist
    { id: 'trad2', text: "Society should constantly evolve and challenge outdated norms and traditions.", dimension: 'traditional', polarity: -1 }, // Agree = Progressive
    { id: 'trad3', text: "Religious values should play a significant role in guiding public policy.", dimension: 'traditional', polarity: 1 }, // Agree = Traditionalist
    { id: 'trad4', text: "Diversity in culture and lifestyle should be actively promoted and celebrated.", dimension: 'traditional', polarity: -1 }, // Agree = Progressive
    { id: 'trad5', text: "Changes to long-standing national symbols or historical narratives should be resisted.", dimension: 'traditional', polarity: 1 }, // Agree = Traditionalist

    // Globalism (Nationalist: -10, Globalist: +10)
    { id: 'glob1', text: "International organizations like the United Nations should have more power to resolve global issues.", dimension: 'globalist', polarity: 1 }, // Agree = Globalist
    { id: 'glob2', text: "A nation's borders should be strictly controlled to limit immigration.", dimension: 'globalist', polarity: -1 }, // Agree = Nationalist
    { id: 'glob3', text: "Free trade agreements generally benefit all participating countries, even if some domestic industries suffer.", dimension: 'globalist', polarity: 1 }, // Agree = Globalist
    { id: 'glob4', text: "National interests should always come before international agreements or alliances.", dimension: 'globalist', polarity: -1 }, // Agree = Nationalist
    { id: 'glob5', text: "Cultural exchange and open movement of people across borders enrich society.", dimension: 'globalist', polarity: 1 }, // Agree = Globalist
];

// Define example politicians with their estimated 4D coordinates and Wikipedia URLs
const politicians = [
    // Original 14
    { name: 'Nelson Mandela', economic: -7, authoritarian: -5, traditional: -6, globalist: 8, wikipediaUrl: 'https://en.wikipedia.org/wiki/Nelson_Mandela' },
    { name: 'Margaret Thatcher', economic: 8, authoritarian: 6, traditional: 7, globalist: 2, wikipediaUrl: 'https://en.wikipedia.org/wiki/Margaret_Thatcher' },
    { name: 'Bernie Sanders', economic: -9, authoritarian: -3, traditional: -7, globalist: 5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Bernie_Sanders' },
    { name: 'Donald Trump', economic: 6, authoritarian: 7, traditional: 8, globalist: -8, wikipediaUrl: 'https://en.wikipedia.org/wiki/Donald_Trump' },
    { name: 'Angela Merkel', economic: 3, authoritarian: 2, traditional: 0, globalist: 7, wikipediaUrl: 'https://en.wikipedia.org/wiki/Angela_Merkel' },
    { name: 'Vladimir Putin', economic: 4, authoritarian: 9, traditional: 9, globalist: -7, wikipediaUrl: 'https://en.wikipedia.org/wiki/Vladimir_Putin' },
    { name: 'Emmanuel Macron', economic: 4, authoritarian: 3, traditional: -2, globalist: 8, wikipediaUrl: 'https://en.wikipedia.org/wiki/Emmanuel_Macron' },
    { name: 'Jacinda Ardern', economic: -5, authoritarian: -1, traditional: -8, globalist: 7, wikipediaUrl: 'https://en.wikipedia.org/wiki/Jacinda_Ardern' },
    { name: 'Ronald Reagan', economic: 9, authoritarian: 5, traditional: 6, globalist: -1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ronald_Reagan' },
    { name: 'Fidel Castro', economic: -10, authoritarian: 10, traditional: 2, globalist: -5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Fidel_Castro' },
    { name: 'Mikhail Gorbachev', economic: -3, authoritarian: 4, traditional: -3, globalist: 6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mikhail_Gorbachev' },
    { name: 'Xi Jinping', economic: -4, authoritarian: 10, traditional: 8, globalist: -2, wikipediaUrl: 'https://en.wikipedia.org/wiki/Xi_Jinping' },
    { name: 'Justin Trudeau', economic: -4, authoritarian: 1, traditional: -7, globalist: 9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Justin_Trudeau' },
    { name: 'Narendra Modi', economic: 5, authoritarian: 7, traditional: 9, globalist: -4, wikipediaUrl: 'https://en.wikipedia.org/wiki/Narendra_Modi' },

    // Added politicians (approx. 36 more)
    { name: 'Abraham Lincoln', economic: 2, authoritarian: 6, traditional: 5, globalist: -2, wikipediaUrl: 'https://en.wikipedia.org/wiki/Abraham_Lincoln' },
    { name: 'Mahatma Gandhi', economic: -6, authoritarian: -8, traditional: -7, globalist: 9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mahatma_Gandhi' },
    { name: 'Winston Churchill', economic: 6, authoritarian: 8, traditional: 7, globalist: 0, wikipediaUrl: 'https://en.wikipedia.org/wiki/Winston_Churchill' },
    { name: 'Franklin D. Roosevelt', economic: -5, authoritarian: 4, traditional: 0, globalist: 3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Franklin_D._Roosevelt' },
    { name: 'Kim Jong Un', economic: -8, authoritarian: 10, traditional: 9, globalist: -10, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kim_Jong_Un' },
    { name: 'Deng Xiaoping', economic: 7, authoritarian: 9, traditional: 3, globalist: -3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Deng_Xiaoping' },
    { name: 'Jawaharlal Nehru', economic: -4, authoritarian: 3, traditional: -2, globalist: 6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Jawaharlal_Nehru' },
    { name: 'Ayn Rand', economic: 10, authoritarian: -10, traditional: -5, globalist: 0, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ayn_Rand' },
    { name: 'Noam Chomsky', economic: -10, authoritarian: -9, traditional: -9, globalist: 9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Noam_Chomsky' },
    { name: 'Pope Francis', economic: -3, authoritarian: 1, traditional: 8, globalist: 7, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pope_Francis' },
    { name: 'Queen Elizabeth II', economic: 0, authoritarian: 2, traditional: 10, globalist: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Elizabeth_II' },
    { name: 'Vladimir Lenin', economic: -10, authoritarian: 10, traditional: -1, globalist: -6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Vladimir_Lenin' },
    { name: 'Mao Zedong', economic: -10, authoritarian: 10, traditional: 5, globalist: -8, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mao_Zedong' },
    { name: 'Otto von Bismarck', economic: 5, authoritarian: 8, traditional: 9, globalist: -5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Otto_von_Bismarck' },
    { name: 'Adam Smith', economic: 10, authoritarian: -7, traditional: 0, globalist: 4, wikipediaUrl: 'https://en.wikipedia.org/wiki/Adam_Smith' },
    { name: 'Karl Marx', economic: -10, authoritarian: -10, traditional: -10, globalist: 10, wikipediaUrl: 'https://en.wikipedia.org/wiki/Karl_Marx' }, // Idealized anarchist communist
    { name: 'Augusto Pinochet', economic: 9, authoritarian: 10, traditional: 8, globalist: -4, wikipediaUrl: 'https://en.wikipedia.org/wiki/Augusto_Pinochet' },
    { name: 'Hugo Chavez', economic: -9, authoritarian: 8, traditional: 4, globalist: -6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Hugo_Ch%C3%A1vez' },
    { name: 'Mariano Rajoy', economic: 6, authoritarian: 3, traditional: 6, globalist: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mariano_Rajoy' },
    { name: 'Jeremy Corbyn', economic: -8, authoritarian: -2, traditional: -6, globalist: 4, wikipediaUrl: 'https://en.wikipedia.org/wiki/Jeremy_Corbyn' },
    { name: 'Theresa May', economic: 4, authoritarian: 5, traditional: 7, globalist: 0, wikipediaUrl: 'https://en.wikipedia.org/wiki/Theresa_May' },
    { name: 'Joe Biden', economic: -2, authoritarian: 2, traditional: -1, globalist: 4, wikipediaUrl: 'https://en.wikipedia.org/wiki/Joe_Biden' },
    { name: 'Boris Johnson', economic: 7, authoritarian: 4, traditional: 5, globalist: -2, wikipediaUrl: 'https://en.wikipedia.org/wiki/Boris_Johnson' },
    { name: 'Jair Bolsonaro', economic: 7, authoritarian: 8, traditional: 9, globalist: -9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Jair_Bolsonaro' },
    { name: 'Alexandria Ocasio-Cortez', economic: -9, authoritarian: -4, traditional: -9, globalist: 6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Alexandria_Ocasio-Cortez' },
    { name: 'Ron Paul', economic: 9, authoritarian: -9, traditional: 4, globalist: -6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ron_Paul' },
    { name: 'Emmanuel Goldstein (1984)', economic: -10, authoritarian: -10, traditional: -10, globalist: 10, wikipediaUrl: 'https://en.wikipedia.org/wiki/Emmanuel_Goldstein' }, // Fictional, extreme libertarian left
    { name: 'Big Brother (1984)', economic: -10, authoritarian: 10, traditional: 10, globalist: -10, wikipediaUrl: 'https://en.wikipedia.org/wiki/Big_Brother_(Nineteen_Eighty-Four)' }, // Fictional, extreme authoritarian
    { name: 'Aung San Suu Kyi', economic: -3, authoritarian: 1, traditional: -5, globalist: 7, wikipediaUrl: 'https://en.wikipedia.org/wiki/Aung_San_Suu_Kyi' },
    { name: 'Recep Tayyip Erdoğan', economic: 5, authoritarian: 8, traditional: 9, globalist: -5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Recep_Tayyip_Erdo%C4%9Fan' },
    { name: 'Kim Dae-jung', economic: -2, authoritarian: -1, traditional: -4, globalist: 8, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kim_Dae-jung' },
    { name: 'Lee Kuan Yew', economic: 8, authoritarian: 9, traditional: 7, globalist: 5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Lee_Kuan_Yew' },
    { name: 'Jacobo Árbenz Guzmán', economic: -8, authoritarian: 3, traditional: -3, globalist: -1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Jacobo_%C3%81rbenz_Guzm%C3%A1n' },
    { name: 'Gamal Abdel Nasser', economic: -6, authoritarian: 7, traditional: 6, globalist: -3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gamal_Abdel_Nasser' },
    { name: 'Jomo Kenyatta', economic: -1, authoritarian: 5, traditional: 4, globalist: -1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Jomo_Kenyatta' },
    { name: 'Indira Gandhi', economic: -5, authoritarian: 6, traditional: 5, globalist: 4, wikipediaUrl: 'https://en.wikipedia.org/wiki/Indira_Gandhi' },
    { name: 'Helmut Kohl', economic: 6, authoritarian: 3, traditional: 4, globalist: 6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Helmut_Kohl' },
    { name: 'Tony Blair', economic: 2, authoritarian: 3, traditional: -1, globalist: 7, wikipediaUrl: 'https://en.wikipedia.org/wiki/Tony_Blair' },
    { name: 'George W. Bush', economic: 7, authoritarian: 6, traditional: 8, globalist: -2, wikipediaUrl: 'https://en.wikipedia.org/wiki/George_W._Bush' },
    { name: 'Barack Obama', economic: -3, authoritarian: 1, traditional: -5, globalist: 6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Barack_Obama' },
    { name: 'Vladimir Zelenskyy', economic: 1, authoritarian: 5, traditional: -3, globalist: 7, wikipediaUrl: 'https://en.wikipedia.org/wiki/Volodymyr_Zelenskyy' },
    { name: 'Luiz Inácio Lula da Silva', economic: -7, authoritarian: 0, traditional: -4, globalist: 5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Luiz_In%C3%A1cio_Lula_da_Silva' },
    { name: 'Javier Milei', economic: 10, authoritarian: -8, traditional: 2, globalist: -5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Javier_Milei' },
    { name: 'Giorgia Meloni', economic: 6, authoritarian: 7, traditional: 9, globalist: -8, wikipediaUrl: 'https://en.wikipedia.org/wiki/Giorgia_Meloni' },
    { name: 'Olaf Scholz', economic: -3, authoritarian: 1, traditional: -2, globalist: 6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Olaf_Scholz' },
    { name: 'Rishi Sunak', economic: 7, authoritarian: 3, traditional: 4, globalist: 3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Rishi_Sunak' },
    { name: 'Marine Le Pen', economic: -1, authoritarian: 6, traditional: 8, globalist: -9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Marine_Le_Pen' },
    { name: 'Benjamin Netanyahu', economic: 8, authoritarian: 8, traditional: 9, globalist: -3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Benjamin_Netanyahu' },
    { name: 'Ayatollah Khomeini', economic: -9, authoritarian: 10, traditional: 10, globalist: -10, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ruhollah_Khomeini' },
    // New additions
    { name: 'Joseph Stalin', economic: -10, authoritarian: 10, traditional: 7, globalist: -7, wikipediaUrl: 'https://en.wikipedia.org/wiki/Joseph_Stalin' },
    { name: 'Adolf Hitler', economic: 8, authoritarian: 10, traditional: 10, globalist: -10, wikipediaUrl: 'https://en.wikipedia.org/wiki/Adolf_Hitler' },
    { name: 'Nestor Makhno', economic: -10, authoritarian: -10, traditional: -8, globalist: 6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Nestor_Makhno' },
    { name: 'Alexander Lukashenko', economic: -3, authoritarian: 10, traditional: 10, globalist: -9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Alexander_Lukashenko' },
];

// Remove duplicate entries (e.g., 'Xi Jinping', 'Volodymyr Zelenskyy')
const uniquePoliticians = Array.from(new Map(politicians.map(p => [p.name, p])).values());


// Scoring mapping for Likert scale (values from 0 to 4 for slider)
const sliderScoreMap = {
    0: 'Strongly Disagree',
    1: 'Disagree',
    2: 'Neutral',
    3: 'Agree',
    4: 'Strongly Agree',
};

// Map slider value (0-4) to actual score (-2 to 2)
const getActualScore = (sliderValue) => {
    return sliderValue - 2;
};

// Function to calculate Euclidean distance in 4D space
const calculateDistance = (coords1, coords2) => {
    return Math.sqrt(
        Math.pow(coords1.economic - coords2.economic, 2) +
        Math.pow(coords1.authoritarian - coords2.authoritarian, 2) +
        Math.pow(coords1.traditional - coords2.traditional, 2) +
        Math.pow(coords1.globalist - coords2.globalist, 2)
    );
};

function App() {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAllPoliticians, setShowAllPoliticians] = useState(false); // New state for showing all politicians

    // Handle answer change for a question
    const handleAnswerChange = (questionId, sliderValue) => {
        // Store the string representation of the answer (e.g., 'Strongly Agree')
        setAnswers(prev => ({ ...prev, [questionId]: sliderScoreMap[sliderValue] }));
    };

    // Go to next question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    // Go to previous question
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    // Calculate results
    const calculateResults = () => {
        const dimensionScores = {
            economic: 0,
            authoritarian: 0,
            traditional: 0,
            globalist: 0,
        };

        // Sum scores for each dimension
        questions.forEach(q => {
            // Get the actual numerical score from the stored string answer
            const answerValue = getActualScore(Object.keys(sliderScoreMap).find(key => sliderScoreMap[key] === answers[q.id]));
            if (answerValue !== undefined) {
                dimensionScores[q.dimension] += answerValue * q.polarity;
            }
        });

        const userCoordinates = {
            economic: dimensionScores.economic,
            authoritarian: dimensionScores.authoritarian,
            traditional: dimensionScores.traditional,
            globalist: dimensionScores.globalist,
        };

        // Calculate distances for all politicians
        const allPoliticianDistances = uniquePoliticians.map(p => ({
            ...p,
            distance: calculateDistance(userCoordinates, p)
        }));

        // Sort by distance and get top 3 for initial display
        const closestPoliticians = allPoliticianDistances.sort((a, b) => a.distance - b.distance).slice(0, 3);

        setResults({ userCoordinates, closestPoliticians, allPoliticianDistances }); // Store all distances
    };

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    // Check if the current question has been answered (i.e., exists in the answers state)
    const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;
    const allQuestionsAnswered = Object.keys(answers).length === questions.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex flex-col items-center justify-center font-inter text-gray-800">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-300 ease-in-out hover:scale-[1.005]">
                <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow-sm">4D Political Compass Quiz</h1>

                {!results && !showAllPoliticians ? ( // Initial Quiz/Start screen
                    <>
                        <div className="mb-8 p-6 bg-indigo-50 rounded-lg shadow-inner border border-indigo-200">
                            <p className="text-lg mb-4 text-center text-indigo-800 font-medium">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </p>
                            <p className="text-2xl font-bold mb-6 text-center text-gray-900 leading-relaxed">{currentQuestion.text}</p>
                            
                            {/* Slider for answers */}
                            <div className="relative w-full px-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="4"
                                    step="1"
                                    value={Object.keys(sliderScoreMap).find(key => sliderScoreMap[key] === answers[currentQuestion.id]) || 2} // Default to Neutral
                                    onChange={(e) => handleAnswerChange(currentQuestion.id, parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    style={{
                                        background: `linear-gradient(to right, 
                                            #ef4444 0%, #f97316 25%, #a3a3a3 50%, #22c55e 75%, #3b82f6 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs font-semibold text-gray-600 mt-2">
                                    <span>SD</span>
                                    <span>D</span>
                                    <span>N</span>
                                    <span>A</span>
                                    <span>SA</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Strongly Disagree</span>
                                    <span>Disagree</span>
                                    <span>Neutral</span>
                                    <span>Agree</span>
                                    <span>Strongly Agree</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="flex-1 px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full shadow-lg hover:from-gray-500 hover:to-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                            >
                                Previous
                            </button>
                            {isLastQuestion ? (
                                <button
                                    onClick={calculateResults}
                                    disabled={!allQuestionsAnswered}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                                >
                                    Get Results
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={!isCurrentQuestionAnswered} // Disable next if current question not answered
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setShowAllPoliticians(true)}
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                            >
                                View All Politicians
                            </button>
                        </div>
                    </>
                ) : showAllPoliticians ? ( // All Politicians screen
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6 text-indigo-700">All Politicians in Database</h2>
                        <p className="text-md text-gray-600 mb-8">
                            {results ? "Ordered from most similar to least similar to your views." : "Browse the estimated coordinates of various political figures."}
                        </p>
                        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"> {/* Added custom-scrollbar */}
                            <ul className="list-none p-0 mx-auto max-w-md space-y-4">
                                {/* Sort only if results exist, otherwise just display the unique list */}
                                {(results ? results.allPoliticianDistances.sort((a, b) => a.distance - b.distance) : uniquePoliticians).map((p, index) => (
                                    <li key={p.name} className="p-4 bg-gray-50 rounded-lg shadow-md text-left border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                                        <span className="font-semibold text-xl text-indigo-800">
                                            <a href={p.wikipediaUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-indigo-700 hover:text-indigo-900">
                                                {index + 1}. {p.name}
                                            </a>
                                        </span><br/>
                                        <span className="text-sm text-gray-700 mt-1 block">
                                            Economic: {p.economic}, Authority: {p.authoritarian}, Culture: {p.traditional}, Globalism: {p.globalist}
                                        </span>
                                        {results && <span className="text-sm text-gray-600 mt-1 block">Similarity Distance: {p.distance.toFixed(2)}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => setShowAllPoliticians(false)}
                            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                        >
                            {results ? "Back to Results" : "Back to Quiz"}
                        </button>
                    </div>
                ) : ( // Results screen
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6 text-emerald-700">Your 4D Political Coordinates:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg mb-10">
                            <div className="p-5 bg-blue-50 rounded-xl shadow-md border border-blue-200">
                                <p className="font-bold text-blue-800 text-xl">Economic:</p>
                                <p className="text-2xl font-semibold mt-1">{results.userCoordinates.economic} <span className="text-base font-normal">({results.userCoordinates.economic < 0 ? 'Left' : 'Right'})</span></p>
                            </div>
                            <div className="p-5 bg-green-50 rounded-xl shadow-md border border-green-200">
                                <p className="font-bold text-green-800 text-xl">Authority:</p>
                                <p className="text-2xl font-semibold mt-1">{results.userCoordinates.authoritarian} <span className="text-base font-normal">({results.userCoordinates.authoritarian < 0 ? 'Libertarian' : 'Authoritarian'})</span></p>
                            </div>
                            <div className="p-5 bg-purple-50 rounded-xl shadow-md border border-purple-200">
                                <p className="font-bold text-purple-800 text-xl">Culture:</p>
                                <p className="text-2xl font-semibold mt-1">{results.userCoordinates.traditional} <span className="text-base font-normal">({results.userCoordinates.traditional < 0 ? 'Progressive' : 'Traditionalist'})</span></p>
                            </div>
                            <div className="p-5 bg-red-50 rounded-xl shadow-md border border-red-200">
                                <p className="font-bold text-red-800 text-xl">Globalism:</p>
                                <p className="text-2xl font-semibold mt-1">{results.userCoordinates.globalist} <span className="text-base font-normal">({results.userCoordinates.globalist < 0 ? 'Nationalist' : 'Globalist'})</span></p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-6 text-indigo-700">Politicians with Similar Views:</h2>
                        <ul className="list-none p-0 mx-auto max-w-md space-y-4">
                            {results.closestPoliticians.map((p, index) => (
                                <li key={p.name} className="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200 text-left hover:shadow-lg transition-shadow duration-200">
                                    <span className="font-semibold text-xl text-indigo-800">
                                        <a href={p.wikipediaUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-indigo-700 hover:text-indigo-900">
                                            {index + 1}. {p.name}
                                        </a>
                                    </span><br/>
                                    <span className="text-sm text-gray-700 mt-1 block">
                                        Economic: {p.economic}, Authority: {p.authoritarian}, Culture: {p.traditional}, Globalism: {p.globalist}
                                    </span>
                                    <span className="text-sm text-gray-600 mt-1 block">Similarity Distance: {p.distance.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
                            <button
                                onClick={() => {
                                    setAnswers({});
                                    setResults(null);
                                    setCurrentQuestionIndex(0);
                                }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Retake Quiz
                            </button>
                            <button
                                onClick={() => setShowAllPoliticians(true)}
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                            >
                                View More Politicians
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
