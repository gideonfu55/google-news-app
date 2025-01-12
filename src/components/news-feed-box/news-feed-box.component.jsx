import NewsItem from '../news-item/news-item.component'
import './new-feed-box.style.css'

const NewsFeedBox = ({ articles }) => {
  return (
    <div className="news-feed">
      <div className="news-feed__content">
        {
          articles.map((article, index) => (
            <NewsItem key={index} article={article} />
          ))
        }
      </div>
    </div>
  )
}

export default NewsFeedBox