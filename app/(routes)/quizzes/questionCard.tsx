import React from "react";

interface QuestionCardProps {
    text: string;
    type: string;
    options: string[];
    correctAnswer: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ text, type, options, correctAnswer }) => {
    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
            <form>
                <div className="mb-4">
                    <label
                        htmlFor="question"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Question:
                    </label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        className="w-full px-3 py-2 border rounded"
                        value={text}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Options:
                    </label>
                    <div className="space-y-2">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type={type}
                                    id={option}
                                    name="option"
                                    value={option}
                                    className="mr-2"
                                    checked={correctAnswer === option}
                                />
                                <label htmlFor={option} className="text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default QuestionCard;