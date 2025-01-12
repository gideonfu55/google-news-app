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
    {
      "key": 2,
      source:{
        "id": "2",
        "name": "Bloomberg"
      },
      title: "Global Markets Rally as Inflation Slows",
      author: "Jane Doe",
      category: ["Finance"],
      description: "Stocks soared as new inflation data showed a significant slowdown, boosting investor confidence worldwide.",
      url: "https://www.bloomberg.com/2024/01/12/global-markets-rally-as-inflation-slows/",
      urlToImage: require('../src/assets/images/test-article-thumbnail.png'),
      publishedAt: "2024-01-12T09:15:00Z",
      content: "Global markets rallied on Friday following a significant drop in inflation rates. Investors responded positively... [+1800 chars]"
    },
    {
      key: 3,
      source: {
        id: "3",
        name: "ESPN"
      },
      title: "LeBron James Leads Lakers to Stunning Victory",
      author: "John Smith",
      category: ["Sports"],
      description: "LeBron James scored a game-high 42 points, leading the Lakers to a thrilling comeback win over the Warriors.",
      url: "https://www.espn.com/2024/01/11/lebron-james-leads-lakers-to-victory/",
      urlToImage: require('../src/assets/images/test-article-thumbnail.png'),
      publishedAt: "2024-01-11T11:45:00Z",
      content: "In one of the season's most exciting games, LeBron James carried the Lakers to victory with a dominant performance... [+1500 chars]"
    },
    {
      key: 4,
      source: {
        id: "4",
        name: "National Geographic"
      },
      title: "Scientists Discover Potentially Habitable Exoplanet",
      author: "Emily Clark",
      category: ["Science"],
      description: "Astronomers have identified a new exoplanet in the habitable zone of its star, sparking excitement about extraterrestrial life.",
      url: "https://www.nationalgeographic.com/2024/01/10/scientists-discover-potentially-habitable-exoplanet/",
      urlToImage: require('../src/assets/images/test-article-thumbnail.png'),
      publishedAt: "2024-01-10T15:30:00Z",
      content: "The newly discovered exoplanet orbits a star similar to our Sun and could potentially harbor life... [+2000 chars]"
    },
    {
      key: 5,
      source: {
        id: "5",
        name: "Variety"
      },
      title: "Blockbuster Movie Shatters Box Office Records",
      author: "Sarah Lee",
      category: ["Entertainment"],
      description: "The latest action-packed movie has broken global box office records in its opening weekend.",
      url: "https://www.variety.com/2024/01/10/blockbuster-movie-shatters-box-office-records/",
      urlToImage: require('../src/assets/images/test-article-thumbnail.png'),
      publishedAt: "2024-01-10T18:00:00Z",
      content: "The film has grossed over $500 million globally within its first three days, setting a new benchmark for the industry... [+1600 chars]"
    }
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
