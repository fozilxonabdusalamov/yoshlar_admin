import { useState, useEffect } from 'react';
import NewsForm from '../components/NewsForm';
import NewsList from '../components/NewsList';
import './AdminNewsPage.css';

const AdminNewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  // Mock data for demo purposes (replace with real API calls)
  const mockNews = [
    {
      id: 1,
      title: "Tech Conference 2024 Announced",
      description: "Join us for the biggest technology conference of the year featuring the latest innovations in AI, blockchain, and cloud computing. This event will bring together industry leaders, innovators, and tech enthusiasts from around the world.",
      images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400"],
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "New Product Launch",
      description: "We're excited to announce the launch of our revolutionary new product that will change the way you work and communicate with your team members.",
      images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"],
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, use mock data
      // Replace this with real API call:
      // const response = await axios.get('/api/news');
      // setNews(response.data);
      
      setNews(mockNews);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNews = async (formData) => {
    try {
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, add to local state
      // Replace this with real API call:
      /*
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      formData.images.forEach((image, index) => {
        data.append(`images`, image);
      });
      
      const response = await axios.post('/api/news', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      */
      
      const newNews = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        images: formData.images.map(file => {
          if (typeof file === 'string') return file;
          return URL.createObjectURL(file);
        }),
        createdAt: new Date().toISOString()
      };
      
      setNews(prev => [newNews, ...prev]);
      alert('News added successfully!');
    } catch (err) {
      setError('Failed to add news. Please try again.');
      console.error('Error adding news:', err);
      throw err;
    }
  };

  const handleEditNews = async (formData, newsId) => {
    try {
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, update local state
      // Replace this with real API call:
      /*
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      formData.images.forEach((image, index) => {
        data.append(`images`, image);
      });
      
      const response = await axios.put(`/api/news/${newsId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      */
      
      setNews(prev => prev.map(item => 
        item.id === newsId 
          ? { ...item, title: formData.title, description: formData.description, images: formData.images }
          : item
      ));
      
      setEditingNews(null);
      alert('News updated successfully!');
    } catch (err) {
      setError('Failed to update news. Please try again.');
      console.error('Error updating news:', err);
      throw err;
    }
  };

  const handleDeleteNews = async (newsId) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    try {
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // For demo purposes, remove from local state
      // Replace this with real API call:
      // await axios.delete(`/api/news/${newsId}`);
      
      setNews(prev => prev.filter(item => item.id !== newsId));
      alert('News deleted successfully!');
    } catch (err) {
      setError('Failed to delete news. Please try again.');
      console.error('Error deleting news:', err);
    }
  };

  const handleEditClick = (newsItem) => {
    setEditingNews(newsItem);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingNews(null);
  };

  const handleSubmit = async (formData, newsId) => {
    if (newsId) {
      await handleEditNews(formData, newsId);
    } else {
      await handleAddNews(formData);
    }
  };

  return (
    <div className="admin-news-page">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Admin Panel</h1>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <span className="nav-icon">📰</span>
            News Management
          </div>
          <div className="nav-item">
            <span className="nav-icon">👥</span>
            Users (Coming Soon)
          </div>
          <div className="nav-item">
            <span className="nav-icon">⚙️</span>
            Settings (Coming Soon)
          </div>
        </nav>
      </div>
      
      <div className="admin-content">
        <div className="content-header">
          <h1 className="page-title">News Management</h1>
          <p className="page-subtitle">Create, edit, and manage news articles</p>
        </div>
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
            <button 
              onClick={() => setError(null)}
              className="error-close"
            >
              ×
            </button>
          </div>
        )}
        
        <NewsForm 
          onSubmit={handleSubmit}
          editingNews={editingNews}
          onCancelEdit={handleCancelEdit}
        />
        
        <NewsList 
          news={news}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteNews}
        />
      </div>
    </div>
  );
};

export default AdminNewsPage;
