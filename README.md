# Yoshlar Admin - News Management Panel

A modern, responsive admin panel for managing news articles built with React.js and CSS (no external UI libraries).

## 🚀 Features

### ✨ News Management
- **Add News**: Create new news articles with title, description, and multiple images
- **Edit News**: Update existing news articles inline
- **Delete News**: Remove news articles with confirmation
- **Image Upload**: Support for multiple image uploads with preview
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🎨 Design Features
- Clean, modern interface with soft light theme
- Smooth animations and hover effects
- Rounded corners and subtle shadows
- Professional color scheme with indigo (#4f46e5) primary color
- Responsive grid layout
- Beautiful empty states

### 🔧 Technical Features
- React.js with modern hooks (useState, useEffect)
- CSS modules for styling (no external UI libraries)
- Axios for API communication
- FormData for file uploads
- Loading and error states
- Form validation
- Image preview functionality

## 📁 Project Structure

```
src/
├── components/
│   ├── NewsForm.jsx       # Form for adding/editing news
│   ├── NewsList.jsx       # Grid layout for news display
│   ├── NewsCard.jsx       # Individual news card component
│   └── Loader.jsx         # Loading spinner component
├── pages/
│   └── AdminNewsPage.jsx  # Main admin page layout
├── App.jsx               # Root component
├── index.css            # Global styles
└── main.jsx            # Application entry point
```

## 🛠 Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:5173`

## 🔗 Backend Integration

The application is currently using mock data for demonstration. To connect to a real backend, update the API calls in `src/pages/AdminNewsPage.jsx`:

### API Endpoints Required

#### 1. Get All News
```javascript
// Replace mock data with:
const response = await axios.get('/api/news');
setNews(response.data);
```

#### 2. Add New News
```javascript
const formData = new FormData();
formData.append('title', newsData.title);
formData.append('description', newsData.description);
newsData.images.forEach((image) => {
  formData.append('images', image);
});

const response = await axios.post('/api/news', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

#### 3. Update News
```javascript
const formData = new FormData();
formData.append('title', newsData.title);
formData.append('description', newsData.description);
newsData.images.forEach((image) => {
  formData.append('images', image);
});

const response = await axios.put(`/api/news/${newsId}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

#### 4. Delete News
```javascript
await axios.delete(`/api/news/${newsId}`);
```

### Expected API Response Format

```javascript
// GET /api/news
[
  {
    id: 1,
    title: "News Title",
    description: "News description...",
    images: ["image1.jpg", "image2.jpg"],
    createdAt: "2024-01-01T00:00:00Z"
  }
]
```

## 📱 Responsive Design
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Production Build

```bash
npm run build
```

**Built with ❤️ using React.js and modern CSS**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

**Built with ❤️ using React.js and modern CSS**
