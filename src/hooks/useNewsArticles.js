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
      return; // Skip fetching if articles for the category already exist
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

  // Fetch all articles for search filter on mount
  useEffect(() => {
    const fetchAllArticles = async () => {
      setLoading(true);
      try {
        const fetchedArticles = await NewsApiService.fetchAllNewsHeadlines();
        setArticles(fetchedArticles);
        setSearchResults(fetchedArticles);
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
