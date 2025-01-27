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

import { API_KEYS } from './api-keys-list';

const BASE_URL = 'https://newsapi.org/v2';
const resultSize = 5;

let currentKeyIndex = 0;

// Add sleep helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Rotate to the next API key, looping back to the first if the last key is reached.
 */
const rotateApiKey = () => {
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
};

/**
 * Get the current API key.
 */
const getApiKey = () => {
    console.log('Using API Key:', API_KEYS[currentKeyIndex]);
    return API_KEYS[currentKeyIndex];
};

/**
 * Test if the current API key can fetch data. Rotate keys if the current one is rate-limited.
 */
const testFetchForApiKey = async () => {
    for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
      const apiKey = getApiKey();
  
      try {
        const response = await fetch(`${BASE_URL}/top-headlines?language=en&pageSize=1&apiKey=${apiKey}`);
        const data = await response.json();
  
        if (data.status === 'ok') {
          console.log('Valid API Key:', apiKey);
          return apiKey;
        }
  
        // Use only for News API due to unique data code for errors
        if (data.code === 'rateLimited' || data.code === 'apiKeyExhausted') {
          console.warn(`API Key limit reached: ${apiKey}. Rotating...`);
          rotateApiKey();
          await delay(1000);
        } else {
          throw new Error(`Unexpected API Error: ${data.message}`);
        }
      } catch (error) {
        console.error(`Error testing API key (${apiKey}):`, error.message);
      }
    }
  
    throw new Error('All API keys have reached their limits or an error has occurred. Please try again next day.🙇');
  };

const NewsApiService = {

    // Fetch all top news headlines
    fetchAllNewsHeadlines: async () => {

        try {
            const API_KEY = await testFetchForApiKey();
            const response = await fetch(
                `${BASE_URL}/top-headlines?language=en&sortBy=relevancy&pageSize=${resultSize}&apiKey=${API_KEY}`
            );
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
            const API_KEY = await testFetchForApiKey();
            const response = await fetch(
                `${BASE_URL}/top-headlines?country=sg&language=en&sortBy=relevancy&pageSize=${resultSize}&apiKey=${API_KEY}`
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
            const API_KEY = await testFetchForApiKey();
            var response = await fetch();

            // Fetch response specifically for stock market from site - investors.com (IBD):
            if (category === 'stocks') {
                response = await fetch(
                    `${BASE_URL}/everything?domains=investors.com&sortBy=relevancy&language=en&pageSize=${resultSize}&apiKey=${API_KEY}`
                );
            } else {
                response = await fetch(
                    `${BASE_URL}/top-headlines?category=${category}&language=en&pageSize=${resultSize}&apiKey=${API_KEY}`
                );
            }

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
            const API_KEY = await testFetchForApiKey();
            delay(1500);
            
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