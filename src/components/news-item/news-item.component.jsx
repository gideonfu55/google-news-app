import './news-item.styles.css'

const NewsItem = ({ article }) => {

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-item"
    >
      <div className="news-item__container">
        {article.urlToImage && (
          <img
            className="news-item__image"
            src={article.urlToImage}
            alt={article.title}
          />
        )}
        <div className="news-item__content">
          <h3 className="news-item__title">{article.title}</h3>
          <p className="news-item__description">{article.description}</p>
          <div className="news-item__meta">
            <span>{article.source.name}</span>
            <span className="news-item__separator"> • </span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default NewsItem