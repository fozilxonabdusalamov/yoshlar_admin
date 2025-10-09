import { useState, useEffect } from 'react';
import './NewsForm.css';

const NewsForm = ({ onSubmit, editingNews, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title,
        description: editingNews.description,
        images: editingNews.images || []
      });
      setImagePreviews(editingNews.images || []);
      setImageFiles([]);
    }
  }, [editingNews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Create previews
    const previews = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then(setImagePreviews);
  };

  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        images: editingNews ? imagePreviews : imageFiles
      };

      await onSubmit(submitData, editingNews?.id);
      
      // Reset form if not editing
      if (!editingNews) {
        setFormData({ title: '', description: '', images: [] });
        setImageFiles([]);
        setImagePreviews([]);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', images: [] });
    setImageFiles([]);
    setImagePreviews([]);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
    onCancelEdit();
  };

  return (
    <div className="news-form-container">
      <h2 className="news-form-title">
        {editingNews ? 'Edit News' : 'Add New News'}
      </h2>
      
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            News Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter news title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            News Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="Enter news description..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="images" className="form-label">
            Images
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="form-file-input"
          />
          <div className="file-input-help">
            Select multiple images (JPEG, PNG, etc.)
          </div>
        </div>

        {imagePreviews.length > 0 && (
          <div className="image-previews">
            <h4 className="previews-title">Image Previews:</h4>
            <div className="previews-grid">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="preview-item">
                  <img src={preview} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="remove-image-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          {editingNews && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn-cancel"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : editingNews ? 'Update News' : 'Add News'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
