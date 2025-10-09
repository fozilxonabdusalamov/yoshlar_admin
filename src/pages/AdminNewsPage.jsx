import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NewsForm from '../components/NewsForm';
import NewsList from '../components/NewsList';
import './AdminNewsPage.css';

// API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Mock data for fallback when API is not available
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

const AdminNewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from real API
      const response = await axios.get(`${API_BASE_URL}/api/news`, {
        timeout: 5000 // 5 second timeout
      });
      setNews(response.data);
      
    } catch (err) {
      console.error('API Error:', err);
      
      // Fallback to mock data for demo
      setNews(mockNews);
      setError('Demo Mode: Using sample data. Connect your backend API for live data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleAddNews = async (formData) => {
    try {
      setError(null);
      
      // Prepare FormData for API
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      formData.images.forEach((image) => {
        data.append('images', image);
      });
      
      // Try real API call first
      try {
        const response = await axios.post(`${API_BASE_URL}/api/news`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000
        });
        
        setNews(prev => [response.data, ...prev]);
        alert('News added successfully!');
        return;
        
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        // Fallback to demo mode
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
        setError('Demo Mode: News added locally (backend API not available)');
      }
      
    } catch (err) {
      setError('Failed to add news. Please try again.');
      console.error('Error adding news:', err);
      throw err;
    }
  };

  const handleEditNews = async (formData, newsId) => {
    try {
      setError(null);
      
      // Prepare FormData for API
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      formData.images.forEach((image) => {
        data.append('images', image);
      });
      
      // Try real API call first
      try {
        const response = await axios.put(`${API_BASE_URL}/api/news/${newsId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000
        });
        
        setNews(prev => prev.map(item => 
          item.id === newsId ? response.data : item
        ));
        
        setEditingNews(null);
        alert('News updated successfully!');
        
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        // Fallback to demo mode
        setNews(prev => prev.map(item => 
          item.id === newsId 
            ? { ...item, title: formData.title, description: formData.description, images: formData.images }
            : item
        ));
        
        setEditingNews(null);
        setError('Demo Mode: News updated locally (backend API not available)');
      }
      
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
      
      // Try real API call first
      try {
        await axios.delete(`${API_BASE_URL}/api/news/${newsId}`, {
          timeout: 5000
        });
        
        setNews(prev => prev.filter(item => item.id !== newsId));
        alert('News deleted successfully!');
        
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        // Fallback to demo mode
        setNews(prev => prev.filter(item => item.id !== newsId));
        setError('Demo Mode: News deleted locally (backend API not available)');
      }
      
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
