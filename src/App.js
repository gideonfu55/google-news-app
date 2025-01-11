import logo from './logo.svg';
import './App.css';
import CategoryTabs from './components/category-tabs/category-tabs.component';
import NewsItem from './components/news-item/news-item.component';

function App() {
  return (
    <div className="App">
      <CategoryTabs />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Google News App - Coming Soon
        </p>

        <NewsItem />
      </header>
    </div>
  );
}

export default App;
