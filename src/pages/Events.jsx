import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventsData } from "../data/eventsData";

// Monthly cultural calendar data
const monthlyEvents = {
  "January": ["Sankranti Festival (14-16)", "Bidar Heritage Walk (15)", "Republic Day Celebrations (26)"],
  "February": ["Koppal Food Festival (5-7)", "Hampi Photography Contest (15-20)"],
  "March": ["Raichur Heritage Run (12)", "Holi Celebrations (25)"],
  "April": ["Yadgir Music Festival (20-22)", "Ugadi - Karnataka New Year (10)"],
  "May": ["Summer Cultural Workshop (15-20)"],
  "June": ["Ballari Dance Festival (5-7)"],
  "July": ["Monsoon Photography Contest (15-30)"],
  "August": ["Independence Day Cultural Programs (15)", "Kalaburagi Craft Fair (20-25)"],
  "September": ["Ganesh Chaturthi Celebrations (7-17)"],
  "October": ["Dasara Celebrations (15-24)", "Bidar Food Festival (28-30)"],
  "November": ["Hampi Utsav (3-5)", "Karnataka Rajyotsava (1)"],
  "December": ["Kalyana Karnataka Jatre (10-12)", "Winter Cultural Festival (25-30)"]
};

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("events"); // New state for tab switching
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Handle "View Details" button click
  const handleViewDetails = (eventId) => {
    // Example: navigate to an event details page
    navigate(`/events/${eventId}`);
  };

  // Filter events based on category and search query
  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter
  const categories = ["All", ...new Set(eventsData.map(event => event.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative h-40 md:h-[40vh]">
        <img 
          src="/Images/KKR Region/ballari/bb1.jpg" 
          alt="Ballari Fort" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <motion.h1 
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Upcoming Events
          </motion.h1>
          <motion.p 
            className="text-base md:text-xl text-white max-w-2xl text-center px-2 md:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover cultural festivals, heritage walks, and exciting activities in Kalyan Karnataka
          </motion.p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-6 px-4 bg-white shadow-md">
        <div className="container mx-auto max-w-6xl">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "events"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("events")}
            >
              Upcoming Events
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "calendar"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("calendar")}
            >
              Cultural Calendar
            </button>
          </div>
        </div>
      </section>

      {activeTab === "events" ? (
        <>
          {/* Search and Filter Section */}
          <section className="py-8 px-2 md:px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Events Grid */}
          <section className="py-8 px-2 md:px-4">
            <div className="container mx-auto max-w-6xl">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">No events found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            {event.category}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <span className="mr-4">
                            <i className="far fa-calendar mr-1"></i> {event.date}
                          </span>
                          <span>
                            <i className="fas fa-map-marker-alt mr-1"></i> {event.location}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          onClick={() => handleViewDetails(event.id)}
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        /* Cultural Calendar Section */
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Annual Cultural Calendar</h2>
              <p className="text-gray-600 mb-8">
                Experience the vibrant cultural heritage of Kalyan Karnataka through these annual festivals and events.
                Plan your visit to coincide with these celebrations for an authentic cultural experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(monthlyEvents).map(([month, events]) => (
                  <motion.div
                    key={month}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-bold text-blue-700 mb-3">{month}</h3>
                    <ul className="space-y-2">
                      {events.map((event, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-gray-700">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Planning Your Cultural Visit</h3>
                <p className="text-gray-700 mb-4">
                  The Kalyan Karnataka region celebrates numerous festivals throughout the year. 
                  Major celebrations include Hampi Utsav in November, Sankranti in January, and Dasara in October.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={() => navigate('/itinerary')}
                  >
                    Plan Your Visit
                  </button>
                  <button 
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                    onClick={() => setActiveTab("events")}
                  >
                    View Upcoming Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Events;

