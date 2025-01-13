import logo from './logo.svg';
import './App.css';
import NewsApiService from './services/apis/news-api-service';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import NewsFeedBox from './components/news-feed-box/news-feed-box.component';
import NewsSearchFilter from './components/news-search-filter/news-search-filter.component';
import NavigationBar from './routes/navigation/navigation-bar.component';

const App = () => {
  
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
      if (category === 'local') {
        fetchedArticles = await NewsApiService.fetchAllLocalNews();
      } else if (category === 'headlines') {
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


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {/* Navigation bar to display categories and logo */}
        <NavigationBar />

        <br />
        {/* Search filter to filter news articles based on search criteria */}
        <div className="search-filter">
          <NewsSearchFilter
            articles={articles}
            onFilteredResults={(filtered) => setSearchResults(filtered)}
          />
        </div>
        
        {/* Placeholder for development in progress 🙂 */}
        <header className="App-header">
          <div style={{ display: 'flex', flexDirection:'column', textAlign: 'center', alignItems: 'center' }}>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Google News App - Coming Soon
          </p>
        </header>
      </div>

      <Routes>
        <Route
          path="/headlines"
          element={
            <NewsCategoryRoute
              category="headlines"
              articles={categoryArticles.headlines || []}
              fetchCategoryArticles={fetchCategoryArticles}
            />
          }
        />
        <Route
          path="/business"
          element={
            <NewsCategoryRoute
              category="business"
              articles={categoryArticles.business || []}
              fetchCategoryArticles={fetchCategoryArticles}
            />
          }
        />
        <Route
          path="/technology"
          element={
            <NewsCategoryRoute
              category="technology"
              articles={categoryArticles.technology || []}
              fetchCategoryArticles={fetchCategoryArticles}
            />
          }
        />
        <Route
          path="/science"
          element={
            <NewsCategoryRoute
              category="science"
              articles={categoryArticles.science || []}
              fetchCategoryArticles={fetchCategoryArticles}
            />
          }
        />
        <Route
          path="/health"
          element={
            <NewsCategoryRoute
              category="health"
              articles={categoryArticles.health || []}
              fetchCategoryArticles={fetchCategoryArticles}
            />
          }
        />
        <Route
          path="/sports"
          element={
            <NewsCategoryRoute
              category="sports"
              articles={categoryArticles.sports || []}
              fetchCategoryArticles={fetchCategoryArticles}
            />
          }
        />
        <Route
          path="/entertainment"
          element={
            <NewsCategoryRoute
              category="entertainment"
              articles={categoryArticles.entertainment || []}
              fetchCategoryArticles={fetchCategoryArticles}
            />
          }
        />
        <Route path="/" element={<NewsFeedBox articles={searchResults} />} />
      </Routes>
    </Router>
  );
};

// NewsCategoryRoute Component
const NewsCategoryRoute = ({ category, articles, fetchCategoryArticles }) => {
  useEffect(() => {
    if (articles.length === 0) {
      fetchCategoryArticles(category);
    }
  }, [category, articles, fetchCategoryArticles]);

  return <NewsFeedBox articles={articles} />;
};

export default App;
