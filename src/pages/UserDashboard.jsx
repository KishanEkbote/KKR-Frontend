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
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Sidebar */}
            <div className="md:w-1/4 w-full mb-4 md:mb-0">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-4 md:mb-6">
                  {userData?.profileImage ? (
                    <img 
                      src={`${API_PATH}${userData.profileImage}`} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                      <span className="text-4xl text-gray-600">{userData?.name?.charAt(0) || "U"}</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{userData?.name || "User"}</h3>
                </div>
                
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`w-full py-2 px-4 rounded-lg ${activeTab === "profile" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => setActiveTab("blogs")}
                    className={`w-full py-2 px-4 rounded-lg ${activeTab === "blogs" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    Create Blog
                  </button>
                  <button 
                    onClick={() => navigate("/blog")}
                    className="w-full py-2 px-4 rounded-lg bg-gray-200"
                  >
                    View All Blogs
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.removeItem("userId");
                      localStorage.removeItem("authToken");
                      navigate("/login");
                    }}
                    className="w-full py-2 px-4 rounded-lg bg-red-600 text-white mt-4"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4 w-full">
              {activeTab === "profile" && (
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Profile Settings</h2>
                  <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    {/* Essential Information Section */}
                    <div className="md:col-span-2 border-b pb-2 md:pb-3 mb-1 md:mb-2">
                      <h3 className="text-sm md:text-md font-semibold text-gray-700 mb-1 md:mb-2">Essential Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {/* Profile Image */}
                        <div className="md:col-span-1">
                          <label className="block text-gray-700 mb-1 text-sm font-medium">Profile Image</label>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center cursor-pointer bg-gray-200 p-2 rounded-lg text-sm">
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
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )}
                          </div>
                        </div>
                        
                        {/* Name */}
                        <div className="md:col-span-1">
                          <label className="block text-gray-700 mb-1 text-sm font-medium">Name*</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 text-sm"
                            required
                          />
                        </div>
                        
                        {/* Bio */}
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1 text-sm font-medium">Bio</label>
                          <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 text-sm"
                            rows="2"
                          />
                        </div>
                        
                        {/* Location */}
                        <div className="md:col-span-1">
                          <label className="block text-gray-700 mb-1 text-sm font-medium">Location</label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        
                        {/* Interests */}
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-1 text-sm font-medium">Interests</label>
                          <div className="flex flex-wrap gap-1 mb-1 max-h-16 overflow-y-auto">
                            {interests.map((interest, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs flex items-center">
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
                              className="flex-1 p-2 border rounded-l-lg focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                            <button
                              type="button"
                              onClick={handleAddInterest}
                              className="bg-blue-600 text-white px-3 rounded-r-lg text-sm"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Optional Information Section - Collapsible */}
                    <div className="md:col-span-2">
                      <details className="mb-2">
                        <summary className="text-md font-semibold text-gray-700 cursor-pointer">
                          Optional Information
                        </summary>
                        <div className="mt-3 pl-2 border-l-2 border-gray-200">
                          {/* Website */}
                          <div className="mb-3">
                            <label className="block text-gray-700 mb-1 text-sm font-medium">Website (Optional)</label>
                            <input
                              type="url"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 text-sm"
                              placeholder="https://yourwebsite.com"
                            />
                          </div>
                          
                          {/* Social Links */}
                          <div className="mb-3">
                            <label className="block text-gray-700 mb-1 text-sm font-medium">Social Links (Optional)</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                type="url"
                                placeholder="Twitter URL"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                className="p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                              <input
                                type="url"
                                placeholder="Instagram URL"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                className="p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                              <input
                                type="url"
                                placeholder="Facebook URL"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                className="p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                              <input
                                type="url"
                                placeholder="LinkedIn URL"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                className="p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors text-sm"
                      >
                        Save Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === "blogs" && (
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Create a Blog</h2>
                  <form onSubmit={handleBlogSubmit} className="space-y-2 md:space-y-4">
                  <input
                      type="text"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="6"
                      required
                    />
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center cursor-pointer bg-gray-200 p-2 rounded-lg shadow-md">
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
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
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
