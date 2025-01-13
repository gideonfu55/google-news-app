
// API Service for making calls to News API for fetching news feeds & articles for application

const NewsAPI = require('newsapi');
const API_KEY = ""; // Not placing it in properties for now - pls use with caution!
const newsapiInstance = new NewsAPI(API_KEY);

// Get all top news headlines - type > array
const fetchAllNewsHeadlines = async () => {
    try {
        const response = await newsapiInstance.v2.topHeadlines({
            language: 'en',
            sortBy: 'relevancy',
        })

        if (response.status === 'ok') {
            console.log('All news headlines fetched successfully');
        }

        return response.articles;
    } catch {
        console.error('Error fetching all news headlines: ' + error);
        
        return [];
    }
}

// Get all local news headlines - type > array
const fetchAllLocalNews = async () => {
    try {
        const response = await newsapiInstance.v2.topHeadlines({
            language: 'en',
            country: 'sg',
            sortBy: 'relevancy',
            pageSize: '10'
        })

        if (response.status === 'ok') {
            console.log('All local news fetched successfully');
        }

        return response.articles;
    } catch {
        console.error('Error fetching all news headlines: ' + error);
        
        return [];
    }
}

// Get news by category (without location/country) - type > array
const fetchNewsByCategory = async (category) => {
    try {
        const response = await newsapiInstance.v2.topHeadlines({
            category,
            language: 'en'
        })

        if (response.status === 'ok') {
            console.log(`All news for ${category} fetched successfully`);
        }
        
        return response.articles;
    } catch {
        console.error(`Error fetching news by ${category} category: ` + error);
        
        return [];
    }
}



