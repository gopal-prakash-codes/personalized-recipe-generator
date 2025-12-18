import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeSuggestions = () => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`/api/recipes/suggestions?query=${input}`);
            setSuggestions(response.data);
        } catch (err) {
            setError('Error fetching recipe suggestions');
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            fetchSuggestions();
        }
    };

    useEffect(() => {
        if (input.length > 2) {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [input]);

    return (
        <div className="recipe-suggestions">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter ingredients or dish name"
                />
                <button type="submit">Get Suggestions</button>
            </form>
            {error && <p className="error">{error}</p>}
            <ul>
                {suggestions.map((recipe) => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeSuggestions;