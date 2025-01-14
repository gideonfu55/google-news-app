/* eslint-disable no-unused-vars */

// API Service for making calls to News API for fetching news feeds & articles for application

const API_KEY = '03b79ecbc3cf4526971b38a3b7671f07'; // to use environment variables for production
const BASE_URL = 'https://newsapi.org/v2';

// Add sleep helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const NewsApiService = {

    // Fetch all top news headlines
    fetchAllNewsHeadlines: async () => {
        try {
            await delay(1500); // 1.2s delay to simulate API call
            const response = await fetch(`${BASE_URL}/top-headlines?language=en&sortBy=relevancy&pageSize=1&apiKey=${API_KEY}`);
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
            await delay(1500);
            const response = await fetch(
                `${BASE_URL}/top-headlines?country=sg&language=en&sortBy=relevancy&pageSize=1&apikey=${API_KEY}`
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
            await delay(1500);
            const response = await fetch(
                `${BASE_URL}/top-headlines?category=${category}&language=en&pageSize=1&apiKey=${API_KEY}`
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
    searchArticles: async (domain, query, fromDate) => {
        try {
        await delay(1500);
          const response = await fetch(
              `${BASE_URL}/everything?${domain}q=${encodeURIComponent(query)}&${fromDate}searchIn=title,description&sortBy=relevancy&language=en&pageSize=2&apiKey=${API_KEY}`
          );
          
          const data = await response.json();
      
          if (data.status === 'ok') {
            console.log('Searched articles by params fetched successfully');
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



