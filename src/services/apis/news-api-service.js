/* eslint-disable no-unused-vars */

/**
 * News API Service
 * Purpose: API Service for making calls to News API for fetching news feeds & articles for application
 * Functions:
 * - fetchAllNewsHeadlines: Fetch all top news headlines
 * - fetchAllLocalNews: Fetch all local news headlines
 * - fetchNewsByCategory: Fetch news by category
 * - searchArticles: Fetch news by search query and terms
 */

const API_KEY = '03b79ecbc3cf4526971b38a3b7671f07'; // to use environment variables for production
const BASE_URL = 'https://newsapi.org/v2';
const resultSize = 3;

// Add sleep helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const NewsApiService = {

    // Fetch all top news headlines
    fetchAllNewsHeadlines: async () => {
        try {
            const response = await fetch(`${BASE_URL}/top-headlines?language=en&sortBy=relevancy&pageSize=${resultSize}&apiKey=${API_KEY}`);
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
                `${BASE_URL}/top-headlines?country=sg&language=en&sortBy=relevancy&pageSize=${resultSize}&apikey=${API_KEY}`
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
                `${BASE_URL}/top-headlines?category=${category}&language=en&pageSize=${resultSize}&apiKey=${API_KEY}`
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

    // Fetch news by search query and terms
    searchArticles: async (query) => {
        try {
          const response = await fetch(
              `${BASE_URL}/everything?${query}searchIn=title,description&sortBy=relevancy&language=en&pageSize=${resultSize}&apiKey=${API_KEY}`
          );
          
          const data = await response.json();
      
          if (data.status === 'ok') {
            console.log('Searching articles by params - fetched successfully');
            return data.articles;
          } else {
            throw new Error(`API Error: ${data.message}`);
          }
        } catch (error) {
          console.error('Error fetching search articles:', error);
          return [];
        }
    },
};

export default NewsApiService;



