import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../path/apiPath";

export default function UserDashboard() {
  const navigate = useNavigate();
  
  // Blog creation states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  
  // Profile states
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  
  // Social links
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const userId = localStorage.getItem("userId");
    console.log("userId: ", userId);
    if (!userId) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
      fetchUserProfile(userId);
    }
  }, [navigate]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`${API_PATH}/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
        
        // Populate form fields with existing data
        setName(userData.name || "");
        setBio(userData.bio || "");
        setLocation(userData.location || "");
        setWebsite(userData.website || "");
        setInterests(userData.interests || []);
        
        // Social links
        if (userData.socialLinks) {
          setTwitter(userData.socialLinks.twitter || "");
          setInstagram(userData.socialLinks.instagram || "");
          setFacebook(userData.socialLinks.facebook || "");
          setLinkedin(userData.socialLinks.linkedin || "");
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleBlogImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(item => item !== interest));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    
    const profileData = {
      name,
      bio,
      location,
      website,
      interests,
      socialLinks: {
        twitter,
        instagram,
        facebook,
        linkedin
      }
    };
    
    try {
      // Update profile information
      const profileResponse = await fetch(`${API_PATH}/users/${userId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      
      // Upload profile image if selected
      if (profileImage) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", profileImage);
        imageFormData.append("userId", userId);
        
        const imageResponse = await fetch(`${API_PATH}/users/profile-image`, {
          method: "POST",
          body: imageFormData,
        });
        
        if (!imageResponse.ok) {
          const errorData = await imageResponse.json();
          throw new Error(errorData.message || "Failed to upload profile image");
        }
      }
      
      alert("Profile updated successfully!");
      // Reset profile image state after successful upload
      setProfileImage(null);
      // Refresh user data
      fetchUserProfile(userId);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`Error updating profile: ${error.message}`);
    }
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
  
    if (!title || !description || !image) {
      alert("Please fill all fields before submitting!");
      return;
    }
  
    const formData = new FormData();
    formData.append("name",name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("author", localStorage.getItem("userId"));
  
    try {
      const response = await fetch(`${API_PATH}/blogs/create`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Blog created successfully!");
        // Clear form
        
        setName("");
        setTitle("");
        setDescription("");
        setImage(null);
      } else {
        throw new Error(result.message || "Failed to create blog");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error creating blog: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-4">
      {isAuthenticated && (
        <div className="container mx-auto py-4 md:py-8 px-2 md:px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-1/4 w-full mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-blue-50 to-blue-200 p-6 rounded-2xl shadow-xl border border-blue-100">
                <div className="flex flex-col items-center mb-6">
                  {userData?.profileImage ? (
                    <img 
                      src={`${API_PATH}${userData.profileImage}`} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center mb-4 shadow-lg">
                      <span className="text-4xl text-white font-bold">{userData?.name?.charAt(0) || "U"}</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-blue-800">{userData?.name || "User"}</h3>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${activeTab === "profile" ? "bg-blue-600 text-white shadow" : "bg-white text-blue-700 hover:bg-blue-100 border border-blue-200"}`}
                  >
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => setActiveTab("blogs")}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${activeTab === "blogs" ? "bg-blue-600 text-white shadow" : "bg-white text-blue-700 hover:bg-blue-100 border border-blue-200"}`}
                  >
                    Create Blog
                  </button>
                  <button 
                    onClick={() => navigate("/blog")}
                    className="w-full py-2 px-4 rounded-lg bg-white text-blue-700 hover:bg-blue-100 border border-blue-200 font-semibold transition-colors duration-200"
                  >
                    View All Blogs
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.removeItem("userId");
                      localStorage.removeItem("authToken");
                      navigate("/blog");
                    }}
                    className="w-full py-2 px-4 rounded-lg bg-red-600 text-white mt-4 font-semibold hover:bg-red-700 transition-colors duration-200 shadow"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="md:w-3/4 w-full">
              {activeTab === "profile" && (
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2"><span className="inline-block w-2 h-6 bg-blue-600 rounded-full"></span>Profile Settings</h2>
                  <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Essential Information Section */}
                    <div className="md:col-span-2 border-b pb-3 mb-2">
                      <h3 className="text-md font-semibold text-blue-700 mb-2 flex items-center gap-2"><span className="inline-block w-2 h-4 bg-blue-400 rounded-full"></span>Essential Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Profile Image */}
                        <div className="md:col-span-1">
                          <label className="block text-blue-700 mb-1 text-sm font-medium">Profile Image</label>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center cursor-pointer bg-blue-100 p-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                              <span className="mr-2">📷 Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfileImageChange}
                              />
                            </label>
                            {profileImage && (
                              <img
                                src={URL.createObjectURL(profileImage)}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-lg border-2 border-blue-200"
                              />
                            )}
                          </div>
                        </div>
                        {/* Name */}
                        <div className="md:col-span-1">
                          <label className="block text-blue-700 mb-1 text-sm font-medium">Name*</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-blue-50"
                            required
                          />
                        </div>
                        {/* Bio */}
                        <div className="md:col-span-2">
                          <label className="block text-blue-700 mb-1 text-sm font-medium">Bio</label>
                          <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-blue-50"
                            rows="2"
                          />
                        </div>
                        {/* Location */}
                        <div className="md:col-span-1">
                          <label className="block text-blue-700 mb-1 text-sm font-medium">Location</label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-blue-50"
                          />
                        </div>
                        {/* Interests */}
                        <div className="md:col-span-2">
                          <label className="block text-blue-700 mb-1 text-sm font-medium">Interests</label>
                          <div className="flex flex-wrap gap-1 mb-1 max-h-16 overflow-y-auto">
                            {interests.map((interest, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs flex items-center border border-blue-200">
                                {interest}
                                <button 
                                  type="button" 
                                  onClick={() => handleRemoveInterest(interest)}
                                  className="ml-1 text-blue-800 hover:text-blue-900"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex">
                            <input
                              type="text"
                              value={newInterest}
                              onChange={(e) => setNewInterest(e.target.value)}
                              placeholder="Add an interest"
                              className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 text-sm bg-blue-50"
                            />
                            <button
                              type="button"
                              onClick={handleAddInterest}
                              className="bg-blue-600 text-white px-3 rounded-r-lg text-sm hover:bg-blue-700 transition"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Submit Button */}
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors text-base shadow-md mt-2"
                      >
                        Save Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {activeTab === "blogs" && (
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2"><span className="inline-block w-2 h-6 bg-blue-600 rounded-full"></span>Create a Blog</h2>
                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-50"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-50"
                      rows="6"
                      required
                    />
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center cursor-pointer bg-blue-100 p-2 rounded-lg shadow-md hover:bg-blue-200 transition">
                        <span className="mr-2">📷 Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleBlogImageChange}
                        />
                      </label>
                      {image && (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg border-2 border-blue-200"
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors text-base shadow-md"
                    >
                      Publish Blog
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
