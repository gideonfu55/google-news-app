import './category-tabs.styles.css'

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {

  const categories = [
    { id: 'General', label: 'General' },
    { id: 'Finance', label: 'Finance' },
    { id: 'Technology', label: 'Technology' },
    { id: 'Sports', label: 'Sports' },
    { id: 'Science', label: 'Science' },
    { id: 'Entertainment', label: 'Entertainment' }
  ];

  return (
    <div className="category-tabs">
      <div className="category-tabs__container">
        <nav className="category-tabs__nav">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onCategoryChange(id)}
              className={`category-tabs__button 
                ${activeCategory === id
                  ? 'category-tabs__button--active'
                  : 'category-tabs__button--inactive'
                }`
              }
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default CategoryTabs