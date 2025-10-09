import './NewsCard.css';

const NewsCard = ({ news, onEdit, onDelete }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
  };

  return (
    <div className="news-card">
      <div className="news-card-image">
        <img 
          src={news.images && news.images.length > 0 ? news.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={news.title}
          onError={handleImageError}
        />
      </div>
      <div className="news-card-content">
        <h3 className="news-card-title">{news.title}</h3>
        <p className="news-card-description">
          {news.description.length > 100 
            ? `${news.description.substring(0, 100)}...` 
            : news.description
          }
        </p>
        <div className="news-card-actions">
          <button 
            className="btn-edit"
            onClick={() => onEdit(news)}
          >
            Edit
          </button>
          <button 
            className="btn-delete"
            onClick={() => onDelete(news.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
