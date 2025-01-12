import logo from './logo.svg';
import './App.css';

import { useState } from 'react';
import CategoryTabs from './components/category-tabs/category-tabs.component';
// import NewsItem from './components/news-item/news-item.component';
import NewsFeedBox from './components/news-feed-box/news-feed-box.component';


const App = () => {

  const [activeCategory, setActiveCategory] = useState('General');

  // Mock data for testing - to be replaced with API call to Google News API or alternate news feed API
  const articles = [
    {
      key: 1,
      source: {
        id: "1",
        name: "TechCrunch"
      },
      title: "USDC stablecoin issuer Circle files confidentially for an IPO",
      author: "Alex Wilhelm",
      category: ["General", "Technology"],
      description: "Circle is for the first time allowing general users to earn rewards by holding cryptocurrency. TechCrunch Coinbase to allow users to earn interest on their crypto holdings CNBC Coinbase to …",
      url: "https://techcrunch.com/2024/01/11/usdc-stablecoin-issuer-circle-files-confidentially-for-an-ipo/",
      urlToImage: require('../src/assets/images/test-article-thumbnail.png'),
      publishedAt: "2024-01-11T07:21:00Z",
      content: "Circle Internet Financial (Circle) has confidentially filed for a proposed IPO, the company said on Thursday. \r\nCircle is the issuer of the stablecoin USDC, which has the second- largest market capitalization on the market, worth about $25.25 billion, according to CoinMarketCap.\r\nThe largest stablecoin, Tether, had a market cap of $94.65 billion, at the time of publication. … [+2075 chars]"
    },
  ];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Here you would typically fetch new articles for the selected category
  };

  const filteredArticles = articles.filter(article =>
    article.category.includes(activeCategory)
  );

  return (
    <div className="App">
      {/* Tab where list of news feeds can be retrieved based on categories */}
      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Placeholder for development in progress 🙂 */}
      <header className="App-header">
        <div style={{ display: 'flex', flexDirection:'column', textAlign: 'center', alignItems: 'center' }}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Google News App - Coming Soon
        </p>

        {/* News feed box to display list of news articles - multiple sections to be used */}
        <NewsFeedBox articles={ filteredArticles } />

      </header>
    </div>
  );
}

export default App;
