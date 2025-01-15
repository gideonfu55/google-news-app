import { v4 as uuidv4 } from 'uuid';
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
            No articles available for this category.
          </div>
        ) : (
          articles.map((article) => (
            <NewsItem key={uuidv4()} article={article} />
          )))
        }
      </div>
    </div>
  )
}

export default NewsFeedBox