import { useEffect, useState } from "react";
import { Home, Users, BarChart, LogOut, PieChart, Map, Calendar, Search, Clock, ArrowDownUp, Download, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../path/apiPath";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [notifications, setNotifications] = useState(3);
  // const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 shadow-lg p-4 md:p-5 flex flex-col justify-between min-h-[70px] md:min-h-screen">
        <div>
          <h1 className="text-xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-3 text-center md:text-left">KKR Admin Panel</h1>
          <nav className="mt-5 space-y-2">
            {/* Responsive nav buttons */}
            <button
              className={`w-full flex items-center p-3 rounded-lg transition-colors text-sm md:text-base ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <Home className="mr-3" size={18} /> Dashboard
            </button>
            <button
              className={`w-full flex items-center p-3 rounded-lg transition-colors text-sm md:text-base ${activeTab === "content" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
              onClick={() => setActiveTab("content")}
            >
              <BarChart className="mr-3" size={18} /> Content Management
            </button>
            <button
              className={`w-full flex items-center p-3 rounded-lg transition-colors text-sm md:text-base ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-3" size={18} /> User Management
            </button>
            <button
              className={`w-full flex items-center p-3 rounded-lg transition-colors text-sm md:text-base ${activeTab === "analytics" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
              onClick={() => setActiveTab("analytics")}
            >
              <PieChart className="mr-3" size={18} /> Analytics
            </button>
            <button
              className={`w-full flex items-center p-3 rounded-lg transition-colors text-sm md:text-base ${activeTab === "locations" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
              onClick={() => setActiveTab("locations")}
            >
              <Map className="mr-3" size={18} /> Locations
            </button>
          </nav>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            className="w-full flex items-center p-3 rounded-lg transition-colors bg-red-600 text-white hover:bg-red-700 text-sm md:text-base"
            onClick={handleLogout}
          >
            <LogOut className="mr-3" size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 md:p-6 overflow-y-auto bg-gray-900 min-h-[70px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "content" && <ContentManagement />}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "analytics" && <AnalyticsManagement />}
            {activeTab === "locations" && <LocationManagement />}
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-white mt-1">1,245</h3>
            </div>
            <Users className="text-blue-400" size={24} />
          </div>
          <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Active Sessions</p>
              <h3 className="text-2xl font-bold text-white mt-1">78</h3>
            </div>
            <BarChart className="text-green-400" size={24} />
          </div>
          <p className="text-green-400 text-sm mt-2">↑ 8% from yesterday</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Content Items</p>
              <h3 className="text-2xl font-bold text-white mt-1">342</h3>
            </div>
            <Calendar className="text-purple-400" size={24} />
          </div>
          <p className="text-green-400 text-sm mt-2">↑ 5% from last week</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Repeat Visitors</p>
              <h3 className="text-2xl font-bold text-white mt-1">64%</h3>
            </div>
            <Map className="text-yellow-400" size={24} />
          </div>
          <p className="text-green-400 text-sm mt-2">↑ 3% from last month</p>
        </div>
      </div>
      
      {/* Data Tables */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { user: 'Mahesh SB', action: 'Created new post', date: '2 hours ago', status: 'Completed' },
                { user: 'Amit Rathod', action: 'Updated profile', date: '5 hours ago', status: 'Completed' },
                { user: 'Sachin', action: 'Deleted comment', date: '1 day ago', status: 'Completed' },
                { user: 'Abhishek Kalshetty ', action: 'Uploaded image', date: '2 days ago', status: 'Completed' },
                { user: 'Vignesh', action: 'Changed settings', date: '3 days ago', status: 'Completed' }
              ].map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-6 py-4">{item.user}</td>
                  <td className="px-6 py-4">{item.action}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ContentManagement() {
  const [activeSection, setActiveSection] = useState("destinations");
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Content Management</h2>
      
      <div className="flex mb-6 space-x-4">
        <button 
          onClick={() => setActiveSection("destinations")}
          className={`px-4 py-2 rounded-lg ${activeSection === "destinations" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
        >
          Destinations
        </button>
        <button 
          onClick={() => setActiveSection("events")}
          className={`px-4 py-2 rounded-lg ${activeSection === "events" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
        >
          Events & Festivals
        </button>
        <button 
          onClick={() => setActiveSection("hotels")}
          className={`px-4 py-2 rounded-lg ${activeSection === "hotels" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
        >
          Hotels & Stays
        </button>
        <button 
          onClick={() => setActiveSection("itineraries")}
          className={`px-4 py-2 rounded-lg ${activeSection === "itineraries" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
        >
          Itineraries
        </button>
      </div>
      
      {/* Destinations Section */}
      {activeSection === "destinations" && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">Destinations</h3>
            <button className="bg-green-600 px-4 py-2 rounded-lg text-white flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Destination
            </button>
          </div>
          
          <div className="flex mb-4 space-x-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search destinations..." 
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Districts</option>
              <option value="bidar">Bidar</option>
              <option value="kalburagi">Kalburagi</option>
              <option value="koppal">Koppal</option>
              <option value="raichur">Raichur</option>
              <option value="yadgir">Yadgir</option>
              <option value="bellary">Bellary</option>
            </select>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Categories</option>
              <option value="historical">Historical Sites</option>
              <option value="religious">Religious Places</option>
              <option value="natural">Natural Attractions</option>
              <option value="museums">Museums</option>
              <option value="food">Food & Cuisine</option>
            </select>
          </div>
          
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">District</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Bidar Fort', district: 'Bidar', category: 'Historical', status: 'Published' },
                { name: 'Gulbarga Fort', district: 'Kalburagi', category: 'Historical', status: 'Published' },
                { name: 'Koppal Cave Temples', district: 'Koppal', category: 'Religious', status: 'Published' },
                { name: 'Raichur Fort', district: 'Raichur', category: 'Historical', status: 'Draft' },
                { name: 'Yadgir Fort', district: 'Yadgir', category: 'Historical', status: 'Published' },
                { name: 'Hampi Ruins', district: 'Bellary', category: 'Historical', status: 'Published' },
                { name: 'Tungabhadra Dam', district: 'Koppal', category: 'Natural', status: 'Draft' }
              ].map((destination, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">{destination.name}</td>
                  <td className="px-6 py-4">{destination.district}</td>
                  <td className="px-6 py-4">{destination.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                      destination.status === 'Published' ? 'bg-green-900 text-green-300' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {destination.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                    <button className="text-yellow-400 hover:text-yellow-300 mr-3">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Showing 1-7 of 42 destinations
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Previous</button>
              <button className="bg-blue-600 px-3 py-1 rounded-lg text-white">1</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">2</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">3</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Next</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Events & Festivals Section */}
      {activeSection === "events" && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">Events & Festivals</h3>
            <button className="bg-green-600 px-4 py-2 rounded-lg text-white flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Event
            </button>
          </div>
          
          <div className="flex mb-4 space-x-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Categories</option>
              <option value="festival">Festival</option>
              <option value="fair">Fair</option>
              <option value="tour">Tour</option>
              <option value="food">Food</option>
              <option value="cultural">Cultural</option>
            </select>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
            </select>
          </div>
          
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  title: 'Hampi Utsav', 
                  date: 'November 3-5, 2023', 
                  location: 'Hampi', 
                  category: 'Festival',
                  status: 'Upcoming'
                },
                { 
                  title: 'Kalyana Karnataka Jatre', 
                  date: 'December 10-12, 2023', 
                  location: 'Kalaburagi', 
                  category: 'Fair',
                  status: 'Upcoming'
                },
                { 
                  title: 'Bidar Heritage Walk', 
                  date: 'January 15, 2024', 
                  location: 'Bidar Fort', 
                  category: 'Tour',
                  status: 'Upcoming'
                },
                { 
                  title: 'Koppal Food Festival', 
                  date: 'February 5-7, 2024', 
                  location: 'Koppal', 
                  category: 'Food',
                  status: 'Upcoming'
                },
                { 
                  title: 'Raichur Cultural Festival', 
                  date: 'March 12-15, 2024', 
                  location: 'Raichur', 
                  category: 'Cultural',
                  status: 'Draft'
                }
              ].map((event, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">{event.title}</td>
                  <td className="px-6 py-4">{event.date}</td>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">{event.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                      event.status === 'Upcoming' ? 'bg-blue-900 text-blue-300' : 
                      event.status === 'Ongoing' ? 'bg-green-900 text-green-300' : 
                      event.status === 'Past' ? 'bg-gray-600 text-gray-300' : 
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                    <button className="text-yellow-400 hover:text-yellow-300 mr-3">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Showing 1-5 of 15 events
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Previous</button>
              <button className="bg-blue-600 px-3 py-1 rounded-lg text-white">1</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">2</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">3</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Next</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hotels & Stays Section */}
      {activeSection === "hotels" && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">Hotels & Stays</h3>
            <button className="bg-green-600 px-4 py-2 rounded-lg text-white flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Hotel
            </button>
          </div>
          
          <div className="flex mb-4 space-x-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search hotels..." 
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Districts</option>
              <option value="bidar">Bidar</option>
              <option value="kalburagi">Kalburagi</option>
              <option value="koppal">Koppal</option>
              <option value="raichur">Raichur</option>
              <option value="yadgir">Yadgir</option>
              <option value="bellary">Bellary</option>
            </select>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="hotel">Hotel</option>
              <option value="resort">Resort</option>
              <option value="homestay">Homestay</option>
              <option value="guesthouse">Guesthouse</option>
            </select>
          </div>
          
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">District</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Price Range</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  name: 'Hotel Mayura', 
                  district: 'Bidar', 
                  type: 'Hotel', 
                  rating: 4.2,
                  priceRange: '₹1,500 - ₹3,000'
                },
                { 
                  name: 'Kalburagi Grand Resort', 
                  district: 'Kalburagi', 
                  type: 'Resort', 
                  rating: 4.5,
                  priceRange: '₹3,000 - ₹5,000'
                },
                { 
                  name: 'Hampi Heritage Stay', 
                  district: 'Bellary', 
                  type: 'Homestay', 
                  rating: 4.8,
                  priceRange: '₹2,000 - ₹4,000'
                },
                { 
                  name: 'Raichur Inn', 
                  district: 'Raichur', 
                  type: 'Hotel', 
                  rating: 3.9,
                  priceRange: '₹1,200 - ₹2,500'
                },
                { 
                  name: 'Koppal Riverside Resort', 
                  district: 'Koppal', 
                  type: 'Resort', 
                  rating: 4.6,
                  priceRange: '₹4,000 - ₹7,000'
                },
                { 
                  name: 'Yadgir Guest House', 
                  district: 'Yadgir', 
                  type: 'Guesthouse', 
                  rating: 3.7,
                  priceRange: '₹800 - ₹1,500'
                }
              ].map((hotel, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">{hotel.name}</td>
                  <td className="px-6 py-4">{hotel.district}</td>
                  <td className="px-6 py-4">{hotel.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-1">{hotel.rating}</span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4">{hotel.priceRange}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                    <button className="text-yellow-400 hover:text-yellow-300 mr-3">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Showing 1-6 of 28 hotels
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Previous</button>
              <button className="bg-blue-600 px-3 py-1 rounded-lg text-white">1</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">2</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">3</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Next</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Itineraries Section */}
      {activeSection === "itineraries" && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">Itineraries</h3>
            <button className="bg-green-600 px-4 py-2 rounded-lg text-white flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create New Itinerary
            </button>
          </div>
          
          <div className="flex mb-4 space-x-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search itineraries..." 
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Durations</option>
              <option value="1-day">1 Day</option>
              <option value="2-3-days">2-3 Days</option>
              <option value="4-7-days">4-7 Days</option>
              <option value="week-plus">Week+</option>
            </select>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="heritage">Heritage</option>
              <option value="adventure">Adventure</option>
              <option value="spiritual">Spiritual</option>
              <option value="food">Food & Culture</option>
              <option value="nature">Nature</option>
            </select>
          </div>
          
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Destinations</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  title: 'Historical Kalyana Karnataka Tour', 
                  duration: '5 Days', 
                  type: 'Heritage', 
                  destinations: 'Bidar, Kalburagi, Raichur',
                  status: 'Published'
                },
                { 
                  title: 'Hampi Weekend Getaway', 
                  duration: '2 Days', 
                  type: 'Heritage', 
                  destinations: 'Hampi, Hospet',
                  status: 'Published'
                },
                { 
                  title: 'Spiritual Journey Through KK', 
                  duration: '4 Days', 
                  type: 'Spiritual', 
                  destinations: 'Koppal, Bellary, Raichur',
                  status: 'Draft'
                },
                { 
                  title: 'Adventure Tour of North Karnataka', 
                  duration: '7 Days', 
                  type: 'Adventure', 
                  destinations: 'Bidar, Kalburagi, Koppal, Bellary',
                  status: 'Published'
                },
                { 
                  title: 'Culinary Exploration of KK', 
                  duration: '3 Days', 
                  type: 'Food', 
                  destinations: 'Kalburagi, Bidar, Raichur',
                  status: 'Draft'
                },
                { 
                  title: 'Nature Trails of Kalyana Karnataka', 
                  duration: '6 Days', 
                  type: 'Nature', 
                  destinations: 'Yadgir, Raichur, Koppal, Bellary',
                  status: 'Published'
                }
              ].map((itinerary, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">{itinerary.title}</td>
                  <td className="px-6 py-4">{itinerary.duration}</td>
                  <td className="px-6 py-4">{itinerary.type}</td>
                  <td className="px-6 py-4">{itinerary.destinations}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                      itinerary.status === 'Published' ? 'bg-green-900 text-green-300' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {itinerary.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                    <button className="text-yellow-400 hover:text-yellow-300 mr-3">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Showing 1-6 of 18 itineraries
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Previous</button>
              <button className="bg-blue-600 px-3 py-1 rounded-lg text-white">1</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">2</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">3</button>
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LocationManagement() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const locationsPerPage = 5;
  
  useEffect(() => {
    // Simulate fetching locations data
    const fetchLocations = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`${API_PATH}/locations`, {
        //   headers: {
        //     'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        //   }
        // });
        // const data = await response.json();
        
        // Simulated data
        setTimeout(() => {
          const mockLocations = [
            { id: '1', name: 'Bidar Fort', district: 'Bidar', category: 'Historical', status: 'Published', visitCount: 12450, rating: 4.7, featured: true },
            { id: '2', name: 'Gulbarga Fort', district: 'Kalburagi', category: 'Historical', status: 'Published', visitCount: 8920, rating: 4.5, featured: true },
            { id: '3', name: 'Koppal Cave Temples', district: 'Koppal', category: 'Religious', status: 'Published', visitCount: 7650, rating: 4.6, featured: false },
            { id: '4', name: 'Raichur Fort', district: 'Raichur', category: 'Historical', status: 'Draft', visitCount: 5430, rating: 4.2, featured: false },
            { id: '5', name: 'Yadgir Fort', district: 'Yadgir', category: 'Historical', status: 'Published', visitCount: 4780, rating: 4.3, featured: false },
            { id: '6', name: 'Hampi Ruins', district: 'Bellary', category: 'Historical', status: 'Published', visitCount: 25670, rating: 4.9, featured: true },
            { id: '7', name: 'Tungabhadra Dam', district: 'Koppal', category: 'Natural', status: 'Draft', visitCount: 9870, rating: 4.4, featured: false },
            { id: '8', name: 'Mahadeva Temple', district: 'Bidar', category: 'Religious', status: 'Published', visitCount: 6540, rating: 4.5, featured: false },
            { id: '9', name: 'Krishna River', district: 'Raichur', category: 'Natural', status: 'Published', visitCount: 7890, rating: 4.3, featured: false },
            { id: '10', name: 'Sharana Basaveshwara Temple', district: 'Kalburagi', category: 'Religious', status: 'Published', visitCount: 11230, rating: 4.8, featured: true },
          ];
          
          setLocations(mockLocations);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching locations data:', error);
        setIsLoading(false);
      }
    };
    
    fetchLocations();
  }, []);

  // Toggle featured status
  const toggleFeatured = (id) => {
    setLocations(locations.map(location => 
      location.id === id ? { ...location, featured: !location.featured } : location
    ));
  };

  // Toggle publish status
  const toggleStatus = (id) => {
    setLocations(locations.map(location => 
      location.id === id ? { 
        ...location, 
        status: location.status === 'Published' ? 'Draft' : 'Published' 
      } : location
    ));
  };

  // Filter locations based on search term, district, category, and status filters
  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter === "all" || location.district === districtFilter;
    const matchesCategory = categoryFilter === "all" || location.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || location.status === statusFilter;
    return matchesSearch && matchesDistrict && matchesCategory && matchesStatus;
  });
  
  // Pagination logic
  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);
  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Location Management</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Manage Destinations</h3>
          <button className="bg-green-600 px-4 py-2 rounded-lg text-white flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Destination
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search destinations..." 
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
          <select 
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="all">All Districts</option>
            <option value="Bidar">Bidar</option>
            <option value="Kalburagi">Kalburagi</option>
            <option value="Koppal">Koppal</option>
            <option value="Raichur">Raichur</option>
            <option value="Yadgir">Yadgir</option>
            <option value="Bellary">Bellary</option>
          </select>
          <select 
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Historical">Historical</option>
            <option value="Religious">Religious</option>
            <option value="Natural">Natural</option>
            <option value="Cultural">Cultural</option>
            <option value="Adventure">Adventure</option>
          </select>
          <select 
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">District</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Visitor Count</th>
                    <th className="px-6 py-3">Rating</th>
                    <th className="px-6 py-3">Featured</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLocations.map((location) => (
                    <tr key={location.id} className="border-b border-gray-700">
                      <td className="px-6 py-4 font-medium">{location.name}</td>
                      <td className="px-6 py-4">{location.district}</td>
                      <td className="px-6 py-4">{location.category}</td>
                      <td className="px-6 py-4">{location.visitCount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="mr-1">{location.rating}</span>
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleFeatured(location.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            location.featured ? 'bg-yellow-500 text-white' : 'bg-gray-600 text-gray-300'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(location.id)}
                          className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                            location.status === 'Published' ? 'bg-green-900 text-green-300' : 'bg-gray-600 text-gray-300'
                          }`}
                        >
                          {location.status}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button className="text-blue-400 hover:text-blue-300">View</button>
                          <button className="text-yellow-400 hover:text-yellow-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-400">
                Showing {indexOfFirstLocation + 1}-{Math.min(indexOfLastLocation, filteredLocations.length)} of {filteredLocations.length} destinations
              </div>
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {[...Array(Math.min(totalPages, 5)).keys()].map(number => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                
                <button 
                  className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h4 className="text-gray-400 text-sm font-medium mb-2">Total Destinations</h4>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">{locations.length}</div>
            <div className="ml-2 text-green-400 text-sm">+3 this month</div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h4 className="text-gray-400 text-sm font-medium mb-2">Published</h4>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">
              {locations.filter(loc => loc.status === 'Published').length}
            </div>
            <div className="ml-2 text-green-400 text-sm">
              {Math.round(locations.filter(loc => loc.status === 'Published').length / locations.length * 100)}%
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h4 className="text-gray-400 text-sm font-medium mb-2">Featured</h4>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">
              {locations.filter(loc => loc.featured).length}
            </div>
            <div className="ml-2 text-green-400 text-sm">
              {Math.round(locations.filter(loc => loc.featured).length / locations.length * 100)}%
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h4 className="text-gray-400 text-sm font-medium mb-2">Average Rating</h4>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">
              {locations.length > 0 ? (locations.reduce((sum, loc) => sum + loc.rating, 0) / locations.length).toFixed(1) : 'N/A'}
            </div>
            <div className="ml-2 text-gray-400 text-sm">out of 5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [visitorData, setVisitorData] = useState({
    totalVisitors: 0,
    dailyVisitors: [],
    popularLocations: [],
    deviceStats: { mobile: 0, desktop: 0, tablet: 0 },
    bounceRate: 0
  });
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    // Simulate fetching analytics data
    const fetchAnalyticsData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`${API_PATH}/analytics`, {
        //   headers: {
        //     'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        //   }
        // });
        // const data = await response.json();
        
        // Simulated data
        setTimeout(() => {
          const mockData = {
            totalVisitors: 12458,
            dailyVisitors: [
              { date: '2023-06-01', count: 245 },
              { date: '2023-06-02', count: 267 },
              { date: '2023-06-03', count: 378 },
              { date: '2023-06-04', count: 412 },
              { date: '2023-06-05', count: 325 },
              { date: '2023-06-06', count: 289 },
              { date: '2023-06-07', count: 356 }
            ],
            popularLocations: [
              { name: 'Jijamata Udyan', visits: 2345 },
              { name: 'Gateway of India', visits: 1982 },
              { name: 'Marine Drive', visits: 1756 },
              { name: 'Elephanta Caves', visits: 1432 },
              { name: 'Chhatrapati Shivaji Terminus', visits: 1289 }
            ],
            deviceStats: { mobile: 65, desktop: 28, tablet: 7 },
            bounceRate: 32.5
          };
          
          setVisitorData(mockData);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setIsLoading(true);
    setTimeRange(range);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Analytics Dashboard</h2>
      
      {/* Time range selector */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg ${timeRange === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => handleTimeRangeChange('day')}
          >
            Today
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => handleTimeRangeChange('week')}
          >
            This Week
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => handleTimeRangeChange('month')}
          >
            This Month
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => handleTimeRangeChange('year')}
          >
            This Year
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Total Visitors</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{visitorData.totalVisitors.toLocaleString()}</h3>
                </div>
                <Users className="text-blue-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Page Views</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{(visitorData.totalVisitors * 3.7).toFixed(0).toLocaleString()}</h3>
                </div>
                <BarChart className="text-green-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">↑ 8% from last month</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Avg. Session Duration</p>
                  <h3 className="text-2xl font-bold text-white mt-1">3m 24s</h3>
                </div>
                <Clock className="text-yellow-400" size={24} />
              </div>
              <p className="text-red-400 text-sm mt-2">↓ 2% from last month</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-red-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Bounce Rate</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{visitorData.bounceRate}%</h3>
                </div>
                <ArrowDownUp className="text-red-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">↑ 5% from last month</p>
            </div>
          </div>
          
          {/* Visitor Trends Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Visitor Trends</h3>
            <div className="h-64 w-full">
              {/* In a real app, you would use a chart library like Chart.js or Recharts */}
              <div className="flex items-end h-48 space-x-2 pt-4">
                {visitorData.dailyVisitors.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-blue-500 hover:bg-blue-400 rounded-t transition-all duration-300"
                      style={{ height: `${(day.count / 500) * 100}%` }}
                    ></div>
                    <div className="text-xs text-gray-400 mt-2">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Popular Locations & Device Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Popular Locations */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Popular Locations</h3>
              <div className="space-y-4">
                {visitorData.popularLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-gray-400 mr-3">{index + 1}.</div>
                      <div className="text-white">{location.name}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-blue-400 mr-2">{location.visits.toLocaleString()}</div>
                      <div className="text-gray-400">visits</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Device Stats */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Device Distribution</h3>
              <div className="flex items-center justify-center h-64">
                {/* Simplified pie chart representation */}
                <div className="relative w-48 h-48">
                  {/* Mobile slice */}
                  <div className="absolute inset-0 bg-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
                  {/* Desktop slice */}
                  <div className="absolute inset-0 bg-green-500" style={{ clipPath: 'polygon(50% 50%, 0% 0%, 50% 0%)' }}></div>
                  {/* Tablet slice */}
                  <div className="absolute inset-0 bg-yellow-500" style={{ clipPath: 'polygon(50% 50%, 0% 0%, 0% 100%, 50% 100%)' }}></div>
                  
                  {/* Center circle */}
                  <div className="absolute w-24 h-24 bg-gray-800 rounded-full" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                </div>
                
                <div className="ml-8 space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                    <div className="text-white">Mobile <span className="text-gray-400 ml-2">{visitorData.deviceStats.mobile}%</span></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 mr-2"></div>
                    <div className="text-white">Desktop <span className="text-gray-400 ml-2">{visitorData.deviceStats.desktop}%</span></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
                    <div className="text-white">Tablet <span className="text-gray-400 ml-2">{visitorData.deviceStats.tablet}%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Export Options */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Export Analytics</h3>
            <p className="text-gray-300 mb-4">Download analytics data for reporting and further analysis.</p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center hover:bg-blue-700">
                <Download className="mr-2" size={18} />
                Export as CSV
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded-lg text-white flex items-center hover:bg-gray-600">
                <Download className="mr-2" size={18} />
                Export as PDF
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded-lg text-white flex items-center hover:bg-gray-600">
                <Mail className="mr-2" size={18} />
                Email Report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`${API_PATH}/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      
      if (response.ok) {
        // Update the user in the local state
        setUsers(users.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-400 mb-6">User Management</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Registered Users</h3>
          <button className="bg-green-600 px-4 py-2 rounded-lg text-white flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6m0H6"></path>
            </svg>
            Add New User
          </button>
        </div>
        
        <div className="flex mb-4 space-x-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
          <select 
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="user">User</option>
          </select>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Joined Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredUsers.map(user => (
                  <tr key={user._id} className="border-b border-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.profileImage ? (
                          <img 
                            src={`${API_PATH}${user.profileImage}`} 
                            alt={user.name} 
                            className="w-8 h-8 rounded-full mr-3"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                            <span className="text-sm text-white">{user.name.charAt(0)}</span>
                          </div>
                        )}
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' ? 'bg-red-900 text-red-300' : 
                          user.role === 'editor' ? 'bg-yellow-900 text-yellow-300' : 
                          'bg-green-900 text-green-300'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString() || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <select 
                          className="bg-gray-700 text-white rounded px-2 py-1 text-xs"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button className="text-blue-400 hover:text-blue-300">View</button>
                        <button className="text-red-400 hover:text-red-300">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-400">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex space-x-2">
                <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Previous</button>
                <button className="bg-blue-600 px-3 py-1 rounded-lg text-white">1</button>
                <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">2</button>
                <button className="bg-gray-700 px-3 py-1 rounded-lg text-gray-300">Next</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
