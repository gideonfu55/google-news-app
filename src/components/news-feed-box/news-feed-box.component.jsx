import NewsItem from '../news-item/news-item.component'
import './new-feed-box.style.css'

const NewsFeedBox = ({ articles }) => {

  if (!Array.isArray(articles)) {
    console.error('Articles are not in array: ', articles);
    return <div>Unable to load news articles.</div>;
  }

  return (
    <div className="news-feed">
      <div className="news-feed__content">
        {/* Show "no results" message on top of articles if no articles are found */}
        {articles.length === 0 ? (
          <div className="news-feed__no-results">
            There are no items to show.
          </div>
        ) : (
          articles.map((article, index) => (
            <NewsItem key={index} article={article} />
          )))
        }
      </div>
    </div>
  )
}

export default NewsFeedBox