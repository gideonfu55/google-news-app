import React from 'react'

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {

  const categories = [
    { id: 'Local', label: 'Local' },
    { id: 'Finance', label: 'Finance' },
    { id: 'Technology', label: 'Technology' },
    { id: 'Sports', label: 'Sports' },
    { id: 'Science', label: 'Science' },
  ];



  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="-mb-px flex space-x-8">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onCategoryChange(id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeCategory === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
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