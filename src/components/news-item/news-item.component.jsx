import './news-item.styles.css'

const NewsItem = ({ article }) => {

  article = {
    source: {
      id: "techcrunch",
      name: "TechCrunch"
    },
    author: "Alex Wilhelm",
    title: "USDC stablecoin issuer Circle files confidentially for an IPO",
    description: "Circle is for the first time allowing general users to earn rewards by holding cryptocurrency TechCrunch Coinbase will now let you earn interest on your Dai holdings TechCrunch Coinbase to allow users to earn interest on their crypto holdings CNBC Coinbase to …",
    url: "https://techcrunch.com/2024/01/11/usdc-stablecoin-issuer-circle-files-confidentially-for-an-ipo/",
    urlToImage: require('../../assets/images/test-article-thumbnail.png'),
    publishedAt: "2024-01-11T07:21:00Z",
    content: "Circle Internet Financial (Circle) has confidentially filed for a proposed IPO, the company said on Thursday. \r\nCircle is the issuer of the stablecoin USDC, which has the second- largest market capitalization on the market, worth about $25.25 billion, according to CoinMarketCap.\r\nThe largest stablecoin, Tether, had a market cap of $94.65 billion, at the time of publication. … [+2075 chars]"
  }

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