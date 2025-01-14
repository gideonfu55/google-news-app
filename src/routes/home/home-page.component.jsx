import { useEffect, useState } from 'react';
import NewsFeedBox from '../../components/news-feed-box/news-feed-box.component';
import NewsApiService from '../../services/apis/news-api-service';

import './home-page.styles.css';
import CircleLoaderWidget from '../../widgets/circle-loader.widget';

const HomePage = () => {

  const [topStories, setTopStories] = useState([]);
  const [scienceNews, setScienceNews] = useState([]);
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
        setScienceNews(fetchedScience);
        setPicksForYou(fetchedPicks);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <CircleLoaderWidget isLoading={loading} />
    );
  }

  console.log('Rendering HomePage with predefined articles');

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
          <NewsFeedBox articles={scienceNews} />
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