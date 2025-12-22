import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const RecipeDisplay = ({ recipeId }) => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/api/recipes/${recipeId}`);
                setRecipe(response.data);
            } catch (err) {
                setError('Error fetching recipe');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!recipe) return <div>No recipe found</div>;

    return (
        <div className="recipe-display">
            <h2>{recipe.title}</h2>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
            <h3>Rating</h3>
            <p>{recipe.rating} / 5</p>
        </div>
    );
};

RecipeDisplay.propTypes = {
    recipeId: PropTypes.string.isRequired,
};

export default RecipeDisplay;