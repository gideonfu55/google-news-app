// For UI and images
import './App.css';

// For Constants and Generating Unique IDs
import { categories } from './constants/categories';
import { v4 as uuidv4 } from 'uuid';

// For Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// For Navigation
import HomePage from './routes/home/home-page.component';
import NewsCategoryRoute from './components/news-category-route/news-category-route.component';

// Components
import NavigationSection from './routes/navigation/navigation-section.component';
import NewsFeedBox from './components/news-feed-box/news-feed-box.component';

// Custom Hooks
import useNewsArticles from './hooks/useNewsArticles';

// For Loader
import CircleLoaderWidget from './widgets/circle-loader.widget';


const App = () => {

  const {
    articles,
    categoryArticles,
    searchResults,
    loading,
    fetchCategoryArticles,
    setSearchResults,
  } = useNewsArticles();

  if (loading) {
    return (
      <CircleLoaderWidget isLoading={loading} />
    );
  }

  console.log('Rendering App with searchResults:', searchResults);

  return (
    <Router>
      {/* Navigation Section to display google news logo, search box, category links */}
      <NavigationSection 
        articles={articles}
        onFilteredResults={(filtered) => {
          setSearchResults(filtered)
        }}
      />
        
      {/* Placeholder icon for development in progress 🙂 */}
      <div className="App-content">

        
        {/* Routes for navigating to different categories of articles based on navigation-row */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {categories.map((category) => (
            <Route
              key={uuidv4()}
              path={`/${category}`}
              element={
                <NewsCategoryRoute
                  category={category}
                  articles={categoryArticles[category] || []}
                  fetchCategoryArticles={fetchCategoryArticles}
                />
              }
            />
          ))}
          
          {/* Default route to display search results */}
          <Route
            path="/search"
            element={
              searchResults.length > 0 ? (
                <NewsFeedBox articles={searchResults} />
              ) : (
                <div>
                  {/* Default to HomePage if no search results */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', fontFamily: "Roboto, sans-serif", color: '#cc0000' }}>
                      <h4>No search results found. Displaying homepage as default.</h4>
                    </div>
                  <HomePage />
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
