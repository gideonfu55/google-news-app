import React from 'react'

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
            src={article.urlToImage}
            alt={article.title}
            className="news-item__image"
          />
        )}
        <div className="news-item__content">
          <h2 className="news-item__title">{article.title}</h2>
          <p className="news-item__description">{article.description}</p>
          <div className="news-item__meta">
            <span>{article.source.name}</span>
            <span className="news-item__separator">•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default NewsItem