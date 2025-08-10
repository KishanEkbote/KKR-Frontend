import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PATH } from "../path/apiPath";

export default function BlogPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [allBlogPosts, setAllBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const postsPerPage = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    if (userId) {
      setIsAuthenticated(true);
      setUserRole(role);
      // Fetch user data (if needed)
    }
    // Move async function outside and call it
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        console.log('Fetching blogs from:', `${API_PATH}/blogs`);
        const response = await axios.get(`${API_PATH}/blogs`);
        console.log('Blogs response:', response.data);
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response format');
        }
        const blogs = response.data;
        console.log('Number of blogs:', blogs.length);
        if (blogs.length === 0) {
          console.log('No blogs found in the response');
        }
        setAllBlogPosts(blogs);
        setBlogPosts(blogs);
        // Extract unique categories
        const uniqueCategories = [...new Set(blogs.map(blog => blog.category || "Uncategorized"))];
        setCategories(["All", ...uniqueCategories]);
        console.log('Categories:', uniqueCategories);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        console.error("Error details:", error.response?.data || error.message);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove user session
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page
  };

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBlogs(term, selectedCategory);
  };

  // Category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterBlogs(searchTerm, category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Filter blogs based on search term and category
  const filterBlogs = (term, category) => {
    let filtered = allBlogPosts;

    // Apply search filter
    if (term) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    // Apply category filter
    if (category && category !== "All") {
      filtered = filtered.filter(post => post.category === category);
    }
    
    setBlogPosts(filtered)
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReadMore = (post, e) => {
    e.preventDefault();
    setSelectedBlog(post);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-6">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-gray-800 py-6 md:py-10"
      >
        <h1 className="text-2xl md:text-4xl font-bold">Welcome to the Blog Section</h1>

        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
            className="mt-4 inline-block bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition"
          >
            Login to Add Blog
          </button>
        ) : (
          <div className="mt-4 flex justify-center space-x-4">
            {userRole !== "admin" && (
              <button
                onClick={() => navigate("/user-dashboard")}
                className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition"
              >
                Go to Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mt-6 md:mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center mb-3 md:mb-4">
            <div className="absolute left-3 text-gray-500">🔍</div>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 mt-2 md:mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Main Blog Posts Section */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-2 md:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {loading ? (
          // Skeleton loading UI
          [...Array(6)].map((_, index) => (
            <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-3 text-center py-8">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Try Again
            </button>
          </div>
        ) : currentPosts.length === 0 ? (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-700 text-lg">
              No blogs found matching your criteria.
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setBlogPosts(allBlogPosts);
                }}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          currentPosts.map((post, index) => (
            <motion.article
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-48">
                <img
                  src={(() => {
                    if (!post.image || !post._id) return '/Images/default_blog.jpg';
                    return `${API_PATH}/blogs/image/${post._id}`;
                  })()}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {post.category && (
                  <span className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2"><strong>Author: {post.name || "Anonymous"}</strong></p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-xs">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit'
                    })}
                  </p>
                  <button
                    onClick={(e) => handleReadMore(post, e)}
                    className="text-blue-500 text-sm font-medium hover:text-blue-700 transition"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </motion.section>

      {/* Pagination */}
      {!loading && !error && blogPosts.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-12 mb-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 border ${currentPage === pageNumber
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  } text-sm font-medium`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 md:p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
            >
              ✕
            </button>
            
            <div className="relative h-56 sm:h-72 md:h-96">
              <img
                src={(() => {
                  if (!selectedBlog.image || !selectedBlog._id) return '/Images/default_blog.jpg';
                  return `${API_PATH}/blogs/image/${selectedBlog._id}`;
                })()}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
              {selectedBlog.category && (
                <span className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {selectedBlog.category}
                </span>
              )}
            </div>
            
            <div className="p-4 sm:p-6 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">{selectedBlog.title}</h2>
              <div className="flex items-center mb-4 md:mb-6">
                <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                  <span className="text-gray-700 font-bold">{selectedBlog.name?.charAt(0) || "A"}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{selectedBlog.name || "Anonymous"}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit'
                    })} • {new Date(selectedBlog.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{selectedBlog.description}</p>
                {selectedBlog.content && <p className="mt-4 text-gray-700 whitespace-pre-line">{selectedBlog.content}</p>}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
