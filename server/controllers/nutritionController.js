const axios = require('axios');
const Nutrition = require('../models/Nutrition'); // Assuming a Nutrition model exists

const NUTRITION_API_URL = 'https://api.nutritionix.com/v1_1/search/';
const APP_ID = 'your_app_id'; // Replace with your Nutritionix App ID
const APP_KEY = 'your_app_key'; // Replace with your Nutritionix App Key

exports.getNutritionalInfo = async (req, res) => {
    const { query } = req.params;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`${NUTRITION_API_URL}${encodeURIComponent(query)}`, {
            params: {
                appId: APP_ID,
                appKey: APP_KEY,
                fields: 'item_name,nf_calories,nf_protein,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars'
            }
        });

        const nutritionData = response.data.hits.map(hit => ({
            name: hit.fields.item_name,
            calories: hit.fields.nf_calories,
            protein: hit.fields.nf_protein,
            totalFat: hit.fields.nf_total_fat,
            saturatedFat: hit.fields.nf_saturated_fat,
            cholesterol: hit.fields.nf_cholesterol,
            sodium: hit.fields.nf_sodium,
            totalCarbohydrate: hit.fields.nf_total_carbohydrate,
            dietaryFiber: hit.fields.nf_dietary_fiber,
            sugars: hit.fields.nf_sugars
        }));

        // Optionally save to MongoDB
        await Nutrition.insertMany(nutritionData);

        return res.status(200).json(nutritionData);
    } catch (error) {
        console.error('Error fetching nutritional information:', error);
        return res.status(500).json({ error: 'Failed to fetch nutritional information' });
    }
};