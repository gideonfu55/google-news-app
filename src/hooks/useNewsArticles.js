import { useState, useCallback, useEffect } from 'react';
import NewsApiService from '../services/apis/news-api-service';

const useNewsArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles for a specific category
  const fetchCategoryArticles = useCallback(async (category) => {
    if (categoryArticles[category]?.length > 0) {
      return; // Skip fetching if articles for the category already exist, save API calls
    }

    setLoading(true);

    try {
      let fetchedArticles;
      if (category === 'headlines') {
        fetchedArticles = await NewsApiService.fetchAllNewsHeadlines();
      } else {
        fetchedArticles = await NewsApiService.fetchNewsByCategory(category);
      }
      
      setCategoryArticles((prev) => ({
        ...prev,
        [category]: fetchedArticles,
      }));
    } catch (error) {
      console.error(`Error fetching articles for category "${category}":`, error);
    } finally {
      setLoading(false);
    }
  }, [categoryArticles]);

  // Fetch all articles for search filter on mount (for loading headlines when the app starts)
  useEffect(() => {
    const fetchAllArticles = async () => {
      setLoading(true);

      try {
        // Implement caching to avoid fetching all news headlines on every page load
        const cachedData = localStorage.getItem('cachedHeadlines');
        const cacheTimestamp = localStorage.getItem('cacheTimestamp');
        const cacheDuration = 30 * 60 * 1000; // 30 mins in milliseconds

        // Check if cache is still present
        if (cachedData && cacheTimestamp && Date.now() - cacheTimestamp < cacheDuration) {
          console.log('Using cached headlines currently. Expiring in:', (cacheDuration - (Date.now() - cacheTimestamp)) / 1000 / 60, 'minutes');
        
          setArticles(JSON.parse(cachedData));
          setSearchResults(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        console.log('Local storage not found.')
        
        // Fetch new headlines if cache expired or is not present
        const fetchedArticles = await NewsApiService.fetchAllNewsHeadlines();

        setArticles(fetchedArticles);
        setSearchResults(fetchedArticles);

        // Then store in cache with timestamp
        localStorage.setItem('cachedHeadlines', JSON.stringify(fetchedArticles));
        localStorage.setItem('cacheTimestamp', Date.now());
      } catch (error) {
        console.error("Error fetching all news headlines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllArticles();
  }, []);

  return {
    articles,
    categoryArticles,
    searchResults,
    loading,
    fetchCategoryArticles,
    setSearchResults,
  };
};

export default useNewsArticles;
