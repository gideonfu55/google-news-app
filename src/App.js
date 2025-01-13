import logo from './logo.svg';
import './App.css';

import { useEffect, useState, useMemo } from 'react';
import CategoryTabs from './components/category-tabs/category-tabs.component';
import NewsFeedBox from './components/news-feed-box/news-feed-box.component';
import NewsSearchFilter from './components/news-search-filter/news-search-filter.component';


const App = () => {
  
  // Mock data for testing - to be replaced with API call to Google News API or alternate news feed API
  const articles = useMemo(() => [
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
      source: {
        "id": "2",
        "name": "Bloomberg"
      },
      title: "Global Markets Rally as Inflation Slows",
      author: "Jane Doe",
      category: ["General", "Finance"],
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
      category: ["General", "Sports"],
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
      category: ["General", "Science"],
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
      category: ["General", "Entertainment"],
      description: "The latest action-packed movie has broken global box office records in its opening weekend.",
      url: "https://www.variety.com/2024/01/10/blockbuster-movie-shatters-box-office-records/",
      urlToImage: require('../src/assets/images/test-article-thumbnail.png'),
      publishedAt: "2025-01-10T18:00:00Z",
      content: "The film has grossed over $500 million globally within its first three days, setting a new benchmark for the industry... [+1600 chars]"
    },
    {
      key: 6,
      source: {
        id: 6,
        name: "Sky Sports"
      },
      title: "FIFA Introduces New Rules Ahead of World Cup",
      author: "Mike Taylor",
      category: ["General", "Sports"],
      description: "FIFA announced sweeping rule changes to improve player safety and game fairness in the upcoming World Cup.",
      url: "https://www.skysports.com/2024/01/10/fifa-new-rules-world-cup/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2025-01-10T16:00:00Z",
      content: "The changes include stricter guidelines for head injuries and adjustments to penalty rules... [+1600 chars]"
    },
    {
      key: 7,
      source: {
        id: 7,
        name: "Bleacher Report"
      },
      title: "Tom Brady to Join NFL Broadcast Team",
      author: "Samantha Green",
      category: ["General", "Sports"],
      description: "Legendary quarterback Tom Brady has signed a deal to become a sports commentator for the NFL.",
      url: "https://www.bleacherreport.com/2024/01/11/tom-brady-joins-nfl-broadcast/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2025-01-11T19:30:00Z",
      content: "The seven-time Super Bowl champion is set to bring his insights to the NFL commentary booth... [+1700 chars]"
    },
    {
      key: 8,
      source: {
        id: 8,
        name: "National Geographic"
      },
      title: "Scientists Discover Potentially Habitable Exoplanet",
      author: "Emily Clark",
      category: ["General", "Science"],
      description: "Astronomers have identified a new exoplanet in the habitable zone of its star, sparking excitement about extraterrestrial life.",
      url: "https://www.nationalgeographic.com/2024/01/10/scientists-discover-potentially-habitable-exoplanet/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2025-01-10T15:30:00Z",
      content: "The newly discovered exoplanet orbits a star similar to our Sun and could potentially harbor life... [+2000 chars]"
    },
    {
      key: 9,
      source: {
        id: 9,
        name: "Science Daily"
      },
      title: "Breakthrough in Cancer Research Offers New Hope",
      author: "Dr. Anthony Rose",
      category: ["General", "Science"],
      description: "Researchers have developed a new therapy that could revolutionize cancer treatment by targeting specific cells.",
      url: "https://www.sciencedaily.com/2024/01/12/cancer-research-breakthrough/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2024-12-12T08:20:00Z",
      content: "This innovative approach to cancer treatment focuses on personalized medicine... [+1900 chars]"
    },
    {
      key: 10,
      source: {
        id: 10,
        name: "BBC Science"
      },
      title: "AI Predicts Earthquake Locations with High Accuracy",
      author: "Dr. Lucy Harper",
      category: ["General", "Science"],
      description: "A new AI model has achieved unprecedented accuracy in predicting earthquake-prone areas.",
      url: "https://www.bbc.com/2024/01/11/ai-earthquake-prediction/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2024-12-11T14:10:00Z",
      content: "The AI model uses seismic data to map potential earthquake hotspots globally... [+1750 chars]"
    },
    {
      key: 11,
      source: {
        id: 11,
        name: "Variety"
      },
      title: "Blockbuster Movie Shatters Box Office Records",
      author: "Sarah Lee",
      category: ["General", "Entertainment"],
      description: "The latest action-packed movie has broken global box office records in its opening weekend.",
      url: "https://www.variety.com/2024/01/10/blockbuster-movie-shatters-box-office-records/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2024-12-10T18:00:00Z",
      content: "The film has grossed over $500 million globally within its first three days, setting a new benchmark for the industry... [+1600 chars]"
    },
    {
      key: 12,
      source: {
        id: 12,
        name: "Hollywood Reporter"
      },
      title: "Golden Globe Winners Announced",
      author: "Michael Chan",
      category: ["General", "Entertainment"],
      description: "The Golden Globe Awards celebrated the year's best in television and film with surprise winners and heartfelt speeches.",
      url: "https://www.hollywoodreporter.com/2024/01/10/golden-globe-winners-announced/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2025-01-10T20:00:00Z",
      content: "The 2024 Golden Globe Awards delivered memorable moments, including unexpected wins in major categories... [+1800 chars]"
    },
    {
      key: 13,
      source: {
        id: 13,
        name: "Billboard"
      },
      title: "Chart-Topping Album Breaks Streaming Records",
      author: "Anna Lopez",
      category: ["General", "Entertainment"],
      description: "The latest album by a global pop icon has broken multiple streaming records within a week of release.",
      url: "https://www.billboard.com/2024/01/12/chart-topping-album-streaming-records/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2024-09-12T12:00:00Z",
      content: "Fans have streamed the album over 500 million times in just seven days, setting a new record for the artist... [+1900 chars]"
    },
    {
      key: 14,
      source: {
        id: 14,
        name: "Forbes"
      },
      title: "Stock Market Sees Major Gains Following Federal Reserve Announcement",
      author: "Andrew White",
      category: ["General", "Finance"],
      description: "Markets reacted positively to the Federal Reserve's decision to keep interest rates steady, leading to a surge in stock prices.",
      url: "https://www.forbes.com/2024/01/12/stock-market-gains-fed-announcement/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2025-01-12T08:30:00Z",
      content: "The Federal Reserve's decision to maintain current interest rates has fueled optimism in financial markets... [+1800 chars]"
    },
    {
      key: 15,
      source: {
        id: 15,
        name: "Reuters"
      },
      title: "Oil Prices Climb Amid Supply Concerns",
      author: "Rebecca Chang",
      category: ["General", "Finance"],
      description: "Crude oil prices rose sharply as OPEC signaled potential production cuts to address market oversupply.",
      url: "https://www.reuters.com/2024/01/12/oil-prices-climb-supply-concerns/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2025-01-12T09:45:00Z",
      content: "Oil prices saw a sharp increase today as OPEC hinted at production cuts to stabilize the market... [+1750 chars]"
    },
    {
      key: 16,
      source: {
        id: 16,
        name: "TechCrunch"
      },
      title: "AI Startups Attract Record Funding in 2025",
      author: "Linda Parker",
      category: ["General", "Technology"],
      description: "Artificial intelligence startups have raised over $10 billion in funding this month alone, signaling strong investor interest in the field.",
      url: "https://www.techcrunch.com/2024/01/12/ai-startups-record-funding/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2025-01-12T10:15:00Z",
      content: "Investors continue to pour billions into artificial intelligence startups, with the sector seeing unprecedented growth... [+1900 chars]"
    },
    {
      key: 17,
      source: {
        id: 17,
        name: "The Verge"
      },
      title: "Apple Unveils Groundbreaking AR Glasses",
      author: "James Carter",
      category: ["General", "Technology"],
      description: "Apple's new AR glasses promise to revolutionize how we interact with technology, featuring immersive experiences and advanced AI integration.",
      url: "https://www.theverge.com/2024/01/12/apple-unveils-ar-glasses/",
      urlToImage: "https://placehold.co/600x400",
      publishedAt: "2025-01-12T11:00:00Z",
      content: "Apple has officially announced its much-anticipated augmented reality glasses, offering cutting-edge features... [+2000 chars]"
    },
  ], []);

  const [activeCategory, setActiveCategory] = useState('General');
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    const filtered = articles.filter(article =>
      article.category.includes(activeCategory)
    );
    setFilteredArticles(filtered);
  }, [activeCategory, articles]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="App">
      {/* Tab where list of news feeds can be retrieved based on categories */}
      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <br />
      
      {/* Search filter to filter news articles based on search criteria */}
      <div className="search-filter">
        <NewsSearchFilter 
          articles={articles}
          activeCategory={activeCategory}
          onFilteredResults={(results) => setFilteredArticles(results)}
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

        {/* News feed box to display list of news articles - multiple sections to be used */}
        <NewsFeedBox articles={ filteredArticles } />

      </header>
    </div>
  );
}

export default App;
