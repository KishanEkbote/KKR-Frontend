import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import the events data
import { eventsData } from "../data/eventsData";

// Additional event-specific content
const eventSpecificContent = {
  1: { // Hampi Utsav
    highlights: [
      "Grand opening ceremony with traditional lamp lighting",
      "Classical dance performances by renowned artists",
      "Sound and light show depicting Vijayanagara history",
      "Handicrafts exhibition featuring local artisans",
      "Traditional music concerts at the Vittala Temple complex"
    ],
    schedule: [
      { day: "Day 1", activities: ["Opening Ceremony (5 PM)", "Cultural Performances (6 PM - 9 PM)", "Light Show (9:30 PM)"] },
      { day: "Day 2", activities: ["Heritage Walks (8 AM)", "Craft Demonstrations (11 AM - 4 PM)", "Music Concert (6 PM - 9 PM)"] },
      { day: "Day 3", activities: ["Photography Contest (10 AM)", "Food Festival (12 PM - 8 PM)", "Closing Ceremony (8 PM)"] }
    ],
    gallery: [
      "/Images/KKR Region/ballari/bb1.jpg",
      "/Images/KKR Region/ballari/bb2.jpg",
      "/Images/KKR Region/ballari/bb3.jpg"
    ],
    organizer: "Karnataka Tourism Department & Ballari District Administration",
    contactInfo: "tourism.hampi@karnataka.gov.in | +91 98765 43210",
    entryFee: "Free for general entry, special shows: ₹100 per person"
  },
  2: { // Kalyana Karnataka Jatre
    highlights: [
      "Traditional folk performances from all districts of Kalyana Karnataka",
      "Rural sports competitions including wrestling and kabaddi",
      "Exhibition of agricultural products and farm equipment",
      "Authentic regional cuisine from different parts of North Karnataka",
      "Handloom and handicraft stalls featuring local artisans"
    ],
    schedule: [
      { day: "Day 1", activities: ["Inauguration (10 AM)", "Folk Dance Competition (2 PM - 5 PM)", "Cultural Night (7 PM - 10 PM)"] },
      { day: "Day 2", activities: ["Rural Sports (9 AM - 1 PM)", "Cooking Demonstrations (3 PM - 5 PM)", "Musical Evening (7 PM - 10 PM)"] },
      { day: "Day 3", activities: ["Farmers' Meet (10 AM)", "Craft Exhibition (All Day)", "Closing Ceremony (7 PM)"] }
    ],
    gallery: [
      "/Images/jatre.jpeg",
      "/Images/KKR Region/kalaburagi/kk1.jpg",
      "/Images/KKR Region/kalaburagi/kk2.jpg"
    ],
    organizer: "Kalaburagi District Administration & Cultural Department",
    contactInfo: "info.kkjatre@gmail.com | +91 94567 12345",
    entryFee: "Free Entry"
  },
  3: { // Bidar Heritage Walk
    highlights: [
      "Expert-guided tour of the 500-year-old Bidar Fort",
      "Exploration of the unique water system 'Karez'",
      "Visit to the ancient Mahmud Gawan Madrasa",
      "Demonstration of Bidriware metal crafting",
      "Historical storytelling sessions at key monuments"
    ],
    schedule: [
      { day: "Morning Session", activities: ["Assembly at Fort Entrance (8:30 AM)", "Fort Tour (9 AM - 11 AM)", "Karez System Visit (11:30 AM - 12:30 PM)"] },
      { day: "Afternoon Session", activities: ["Lunch Break (12:30 PM - 1:30 PM)", "Madrasa & Tombs Tour (2 PM - 3:30 PM)", "Bidriware Workshop (4 PM - 5 PM)"] }
    ],
    gallery: [
      "/Images/bidar_fort.jpg",
      "/Images/KKR Region/bidar/bd1.jpg",
      "/Images/KKR Region/bidar/bd2.jpg"
    ],
    organizer: "Bidar Heritage Society & Karnataka Tourism",
    contactInfo: "heritagewalk@bidar.org | +91 87654 32109",
    entryFee: "₹250 per person (includes guide fee and refreshments)"
  },
  4: { // Koppal Food Festival
    highlights: [
      "Over 50 traditional North Karnataka dishes",
      "Live cooking demonstrations by local chefs",
      "Rotti-making competition open to visitors",
      "Special focus on forgotten recipes and ingredients",
      "Organic produce market from local farmers"
    ],
    schedule: [
      { day: "Day 1", activities: ["Inauguration & Food Stalls Open (11 AM)", "Cooking Demo: Jolada Rotti & Ennegayi (3 PM)", "Evening Cultural Program (7 PM)"] },
      { day: "Day 2", activities: ["Breakfast Specialties (8 AM - 11 AM)", "Rotti Competition (2 PM)", "Dessert Showcase (5 PM)"] },
      { day: "Day 3", activities: ["Farm to Table Exhibition (10 AM)", "Traditional Cooking Methods Demo (1 PM)", "Closing Event & Awards (6 PM)"] }
    ],
    gallery: [
      "/Images/food_fest.jpeg",
      "/Images/KKR Region/koppal/kp1.jpg",
      "/Images/KKR Region/koppal/kp2.jpg"
    ],
    organizer: "Koppal District Tourism & Food Craft Institute",
    contactInfo: "foodfest@koppal.in | +91 90123 45678",
    entryFee: "₹100 per person (includes food sampling tokens)"
  },
  5: { // Raichur Heritage Run
    highlights: [
      "5K, 10K and 21K run categories through historical sites",
      "Route passing through the ancient Raichur Fort",
      "Heritage information boards along the running path",
      "Post-run cultural celebration and local food",
      "Participation medals inspired by local architecture"
    ],
    schedule: [
      { day: "Pre-Event Day", activities: ["Registration & Kit Collection (10 AM - 6 PM)", "Route Briefing (5 PM)"] },
      { day: "Event Day", activities: ["Assembly (5:30 AM)", "Half Marathon Flag-off (6 AM)", "10K Flag-off (6:30 AM)", "5K Flag-off (7 AM)", "Prize Distribution (10 AM)"] }
    ],
    gallery: [
      "/Images/Marathon.jpeg",
      "/Images/KKR Region/Raichur/img1.jpg",
      "/Images/KKR Region/Raichur/img2.jpg"
    ],
    organizer: "Raichur Runners Club & District Sports Authority",
    contactInfo: "run@raichurheritage.org | +91 76543 21098",
    entryFee: "5K: ₹500, 10K: ₹700, Half Marathon: ₹1000"
  },
  6: { // Yadgir Music Festival
    highlights: [
      "Classical music performances by national artists",
      "Folk music showcase from North Karnataka region",
      "Fusion performances blending traditional and modern styles",
      "Instrument exhibition and demonstration",
      "Workshop on regional musical traditions"
    ],
    schedule: [
      { day: "Day 1", activities: ["Inaugural Concert (6 PM - 9 PM)"] },
      { day: "Day 2", activities: ["Morning Ragas (7 AM - 10 AM)", "Instrument Workshop (11 AM - 1 PM)", "Folk Music Evening (6 PM - 9 PM)"] },
      { day: "Day 3", activities: ["Young Artists Platform (3 PM - 5 PM)", "Grand Finale Concert (6 PM - 10 PM)"] }
    ],
    gallery: [
      "/Images/music_fest.jpeg",
      "/Images/KKR Region/yadgir/yy1.jpg",
      "/Images/KKR Region/yadgir/yy2.jpg"
    ],
    organizer: "Yadgir Arts Foundation & Karnataka Sangeet Academy",
    contactInfo: "yadgirmusic@gmail.com | +91 81234 56789",
    entryFee: "Free Entry (Registration required for workshops)"
  }
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [eventContent, setEventContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Reset state when ID changes
    setLoading(true);
    setActiveImageIndex(0);
    
    // Find the event data
    const eventId = parseInt(id);
    const foundEvent = eventsData.find(e => e.id === eventId);
    
    if (foundEvent) {
      setEvent(foundEvent);
      
      // Get event-specific content
      const content = eventSpecificContent[eventId] || {
        highlights: ["Event details coming soon"],
        schedule: [{ day: "Event Day", activities: ["Schedule to be announced"] }],
        gallery: [foundEvent.image],
        organizer: "Karnataka Tourism Department",
        contactInfo: "tourism@karnataka.gov.in",
        entryFee: "Details to be announced"
      };
      
      setEventContent(content);
      
      // Find related events (same category or location)
      const related = eventsData
        .filter(e => e.id !== eventId && 
                    (e.category === foundEvent.category || 
                     e.location === foundEvent.location))
        .slice(0, 3);
      
      setRelatedEvents(related);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
        <p className="text-gray-600 mb-6">The event youre looking for doesnt exist or has been removed.</p>
        <button 
          onClick={() => navigate("/events")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Back button */}
        <button 
          onClick={() => navigate("/events")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Events
        </button>
        
        {/* Event Hero */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-80">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full mb-3 inline-block">
                {event.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center text-sm opacity-90">
                <span className="mr-4">
                  <i className="far fa-calendar mr-1"></i> {event.date}
                </span>
                <span>
                  <i className="fas fa-map-marker-alt mr-1"></i> {event.location}
                </span>
              </div>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {event.description}
                </p>
                
                {/* Event Highlights */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Event Highlights</h3>
                  <ul className="space-y-2">
                    {eventContent.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Event Schedule */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Event Schedule</h3>
                <div className="mb-8">
                  {eventContent.schedule.map((day, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h4 className="font-medium text-blue-700">{day.day}</h4>
                      <ul className="mt-2 space-y-1 pl-5">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-gray-700">{activity}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                {/* Photo Gallery */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Photo Gallery</h3>
                <div className="mb-8">
                  <div className="relative h-64 mb-2 overflow-hidden rounded-lg">
                    <img 
                      src={eventContent.gallery[activeImageIndex]} 
                      alt={`${event.title} gallery image`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation arrows */}
                    {eventContent.gallery.length > 1 && (
                      <>
                        <button 
                          onClick={() => setActiveImageIndex((prev) => (prev === 0 ? eventContent.gallery.length - 1 : prev - 1))}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => setActiveImageIndex((prev) => (prev === eventContent.gallery.length - 1 ? 0 : prev + 1))}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnail navigation */}
                  {eventContent.gallery.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {eventContent.gallery.map((img, index) => (
                        <button 
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                        >
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Organizer</h4>
                      <p className="text-gray-800">{eventContent.organizer}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                      <p className="text-gray-800">{eventContent.contactInfo}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Entry Fee</h4>
                      <p className="text-gray-800">{eventContent.entryFee}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Location</h4>
                      <p className="text-gray-800">{event.location}</p>
                    </div>
                  </div>
                </div>
                
                {/* Register Button */}
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-6">
                  Register for This Event
                </button>
                
                {/* Share Event */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Share This Event</h3>
                  <div className="flex space-x-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <i className="fab fa-facebook-f text-xl"></i>
                    </button>
                    <button className="text-blue-400 hover:text-blue-600">
                      <i className="fab fa-twitter text-xl"></i>
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <i className="fab fa-whatsapp text-xl"></i>
                    </button>
                    <button className="text-blue-700 hover:text-blue-900">
                      <i className="fab fa-linkedin-in text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedEvents.map((relEvent) => (
                <motion.div
                  key={relEvent.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div 
                    className="cursor-pointer" 
                    onClick={() => {
                      navigate(`/events/${relEvent.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relEvent.image} 
                        alt={relEvent.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {relEvent.category}
                        </span>
                        <span className="text-xs text-gray-500">{relEvent.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{relEvent.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{relEvent.location}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{relEvent.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;





