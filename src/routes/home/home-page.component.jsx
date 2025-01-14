import { useEffect, useState } from 'react';
import NewsFeedBox from '../../components/news-feed-box/news-feed-box.component';
import NewsApiService from '../../services/apis/news-api-service';

import './home-page.styles.css';

const HomePage = () => {

  const [topStories, setTopStories] = useState([]);
  const [worldNews, setWorldNews] = useState([]);
  const [picksForYou, setPicksForYou] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const [fetchedTopStories, fetchedScience, fetchedPicks] = await Promise.all([
          NewsApiService.fetchNewsByCategory('general'), // Fetch Top Stories
          NewsApiService.fetchNewsByCategory('science'),  // Fetch Science News
          NewsApiService.fetchNewsByCategory('business'), // Fetch Picks for You
        ]);

        setTopStories(fetchedTopStories);
        setWorldNews(fetchedScience);
        setPicksForYou(fetchedPicks);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-container">
      {/* Left Section */}
      <div className="home-main">
        <section className="news-section">
          <h2 className="section-title">Top Stories</h2>
          <NewsFeedBox articles={topStories} />
        </section>

        <section className="news-section">
          <h2 className="section-title">Science News</h2>
          <NewsFeedBox articles={worldNews} />
        </section>
      </div>

      {/* Right Section */}
      <div className="home-sidebar">
        <section className="news-section">
          <h2 className="section-title">Picks for You</h2>
          <NewsFeedBox articles={picksForYou} />
        </section>
      </div>
    </div>
  );
}

export default HomePage