// src/components/Blogs.jsx
import React, { useState, useEffect } from 'react';
import staticBlogs from '../data/blogs.json';
import { FaPlus } from 'react-icons/fa'; // Import a plus icon from React Icons

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageData, setImageData] = useState(null); // Stores the base64 string of the image
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image

  // Load blogs: combine static blogs and dynamic blogs from localStorage
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('dynamicBlogs')) || [];
    setBlogs([...staticBlogs, ...savedBlogs]);
  }, []);

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);

      // Optionally, convert the file to a base64 string for storage (not recommended for large images)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add a new blog
  const handleAddBlog = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') return;

    const newBlog = {
      id: Date.now(),
      title,
      content,
      image: imageData, // Attach the image data (can be null)
      author: "You",
      date: new Date().toISOString().split('T')[0],
    };

    // Update dynamic blogs in localStorage
    const savedDynamicBlogs = JSON.parse(localStorage.getItem('dynamicBlogs')) || [];
    const updatedDynamicBlogs = [...savedDynamicBlogs, newBlog];
    localStorage.setItem('dynamicBlogs', JSON.stringify(updatedDynamicBlogs));

    // Update blogs state to include static + dynamic blogs
    setBlogs([...staticBlogs, ...updatedDynamicBlogs]);

    // Clear the form inputs and close modal
    setTitle('');
    setContent('');
    setImageData(null);
    setImagePreview(null);
    setShowAddModal(false);
  };

  return (
    <section id="blogs" className="min-h-screen bg-gray-200 py-10 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Blogs</h2>

        {/* Blog List */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              {/* Render image if available */}
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="mb-4 w-full h-48 object-cover rounded"
                />
              )}
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <p className="text-gray-500 text-sm">
                By {blog.author} on {blog.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button to Open Modal */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        <FaPlus size={20} />
      </button>

      {/* Modal for Adding New Blog */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h3 className="text-2xl font-semibold mb-4">Add New Blog</h3>
            <form onSubmit={handleAddBlog}>
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                placeholder="Blog Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mb-4"
              />
              {/* Display image preview if available */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mb-4 w-full h-48 object-cover rounded"
                />
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    // Optionally clear form inputs
                    setTitle('');
                    setContent('');
                    setImageData(null);
                    setImagePreview(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
