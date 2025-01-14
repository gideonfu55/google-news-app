import { CircleLoader } from 'react-spinners';
import './circle-loader.styles.css';

const CircleLoaderWidget = ({ isLoading }) => {
  
  const color = isLoading ? '#1a73e8' : '#34a853'; // Blue when loading, Green when completed

  return (
    <div className="spinner-overlay">
      <CircleLoader
        className="spinner"
        color={color}
        loading={isLoading}
        size={100}
      />
      <span className="spinner-text">
        {!isLoading? 'Completed' : 'Loading...'}
      </span>
    </div>
  );
};

export default CircleLoaderWidget;
