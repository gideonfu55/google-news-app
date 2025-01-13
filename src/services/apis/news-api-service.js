/* eslint-disable no-unused-vars */

// API Service for making calls to News API for fetching news feeds & articles for application

const API_KEY = 'a0eea1f1d9ae4758b3c5c83ec27a9a5e'; // to use environment variables for production
const BASE_URL = 'https://newsapi.org/v2';

const NewsApiService = {

    // Fetch all top news headlines
    fetchAllNewsHeadlines: async () => {
        try {
            const response = await fetch(`${BASE_URL}/top-headlines?language=en&sortBy=relevancy&pageSize=10&apiKey=${API_KEY}`);
            const data = await response.json();

            if (data.status === 'ok') {
                console.log('All news headlines fetched successfully');
                return data.articles;
            } else {
                throw new Error(`API Error: ${data.message}`);
            }

        } catch (error) {
            console.error('Error fetching all news headlines:', error);
            return [];
        }
    },

    // Fetch all local news headlines
    fetchAllLocalNews: async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/top-headlines?language=en&country=sg&sortBy=relevancy&pageSize=10&apiKey=${API_KEY}`
            );
            const data = await response.json();

            if (data.status === 'ok') {
                console.log('All local news fetched successfully');
                return data.articles;
            } else {
                throw new Error(`API Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching all local news:', error);
            return [];
        }
    },

    // Fetch news by category
    fetchNewsByCategory: async (category) => {
        try {
            const response = await fetch(
                `${BASE_URL}/top-headlines?category=${category}&language=en&pageSize=10&apiKey=${API_KEY}`
            );
            const data = await response.json();

            if (data.status === 'ok') {
                console.log(`All news for ${category} fetched successfully`);
                return data.articles;
            } else {
                throw new Error(`API Error: ${data.message}`);
            }
        } catch (error) {
            console.error(`Error fetching news by category "${category}":`, error);
            return [];
        }
    },
};

export default NewsApiService;



