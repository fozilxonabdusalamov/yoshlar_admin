import NewsCard from './NewsCard';
import Loader from './Loader';
import './NewsList.css';

const NewsList = ({ news, loading, onEdit, onDelete }) => {
  if (loading) {
    return <Loader />;
  }

  if (!news || news.length === 0) {
    return (
      <div className="news-list-container">
        <h2 className="news-list-title">All News</h2>
        <div className="empty-state">
          <div className="empty-state-icon">📰</div>
          <h3>No News Available</h3>
          <p>Start by adding your first news article using the form above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-list-container">
      <h2 className="news-list-title">All News ({news.length})</h2>
      <div className="news-grid">
        {news.map((newsItem) => (
          <NewsCard
            key={newsItem.id}
            news={newsItem}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
