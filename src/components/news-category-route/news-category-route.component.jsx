import { useEffect } from 'react';
import NewsFeedBox from '../news-feed-box/news-feed-box.component';

import {
  Article as ArticleIcon,
  BusinessCenter as BusinessIcon,
  SsidChartTwoTone as StocksIcon,
  Computer as TechnologyIcon,
  Movie as EntertainmentIcon,
  SportsSoccer as SportsIcon,
  Science as ScienceIcon,
  LocalHospital as HealthIcon,
} from '@mui/icons-material';

import './news-category-route.styles.css';

const categoryIcons = {
  headlines: ArticleIcon,
  business: BusinessIcon,
  stocks: StocksIcon,
  technology: TechnologyIcon,
  entertainment: EntertainmentIcon,
  sports: SportsIcon,
  science: ScienceIcon,
  health: HealthIcon,
};

const NewsCategoryRoute = ({ category, articles, fetchCategoryArticles }) => {
  useEffect(() => {
    if (articles.length === 0) {
      fetchCategoryArticles(category);
    }
  }, [category, articles, fetchCategoryArticles]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const Icon = categoryIcons[category.toLowerCase()] || ArticleIcon;

  return (
    <div className="category-route-container">
      <div className="category-route-header">
        <Icon className="category-icon" style={{ fontSize: '50px' }} />
        <h2 className="section-title">{capitalizeFirstLetter(category)}</h2>
      </div>
      <div className="category-content-section">
        <NewsFeedBox articles={articles} />
      </div>
    </div>
  );
};

export default NewsCategoryRoute;