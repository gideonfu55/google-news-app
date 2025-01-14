import NewsFeedBox from '../news-feed-box/news-feed-box.component';

const NewsCategoryRoute = ({ category, articles, fetchCategoryArticles }) => {
  useEffect(() => {
    if (articles.length === 0) {
      fetchCategoryArticles(category);
    }
  }, [category, articles, fetchCategoryArticles]);

  return <NewsFeedBox articles={articles} />;
};

export default NewsCategoryRoute;