import CircleLoaderWidget from '../../widgets/circle-loader.widget';
import NewsFeedBox from '../../components/news-feed-box/news-feed-box.component';
import HomePage from '../home/home-page.component';

const SearchResultsRoute = ({ loading, searchResults }) => {
    
  if (loading) {
    return <CircleLoaderWidget isLoading={loading} />;
  }

  if (searchResults.length > 0) {
    return <NewsFeedBox articles={searchResults} />;
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
          fontFamily: 'Roboto, sans-serif',
          color: '#cc0000',
        }}
      >
        <h4>No search results found. Displaying homepage as default.</h4>
      </div>
      <HomePage />
    </div>
  );
};

export default SearchResultsRoute;
