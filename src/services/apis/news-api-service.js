
// API Service for making calls to News API for fetching news feeds & articles for application

const NewsAPI = require('newsapi');
const API_KEY = ""; // Not placing it in properties for now - pls use with caution!
const newsapiInstance = new NewsAPI(API_KEY);

// Get all top news headlines:
const fetchAllNewsHeadlines = async () => {
    try {
        const response = await newsapiInstance.v2.topHeadlines({
            language: 'en',
            sortBy: 'relevancy',
        })

        return response.articles;
    } catch {
        console.error('Error fetching all news headlines: ' + error);
        
        return [];
    }
}

// Get all local news headlines
const fetchAllLocalNews = async () => {
    try {
        const response = await newsapiInstance.v2.topHeadlines({
            language: 'en',
            country: 'sg',
            sortBy: 'relevancy',
            pageSize: '10'
        })

        return response.articles;
    } catch {
        console.error('Error fetching all news headlines: ' + error);
        
        return [];
    }
}

// Get news by category (without location/country)
const fetchNewsByCategory = async (category) => {
    try {
        const response = await newsapiInstance.v2.topHeadlines({
            category,
            language: 'en'
        })
        
        return response.articles;
    } catch {
        console.error('Error fetching news by category: ' + error);
        
        return [];
    }
}



