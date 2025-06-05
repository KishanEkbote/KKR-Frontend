import { motion } from "framer-motion";
import {  useEffect } from "react";
import { Link } from "react-router-dom";

const KalyanKarnatakaRegion = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  
  const districts = [
    { id: "klb", name: "Kalaburagi", image: "/Images/KKR Region/Klb/kalaburgi.jpg" },
    { id: "bidar", name: "Bidar", image: "/Images/bidar_fort.jpg" },
    { id: "koppal", name: "Koppal", image: "/Images/KKR Region/Koppal/anjanadri.jpg" },
    { id: "yadgir", name: "Yadgir", image: "/Images/KKR Region/yadgir/yy1.jpg" },
    { id: "raichur", name: "Raichur", image: "/Images/KKR Region/Raichur/img2.jpg" },
    { id: "ballari", name: "Ballari", image: "/Images/KKR Region/ballari/bb1.jpg" }
  ];
  

  const culturalTimeline = [
    { year: "12th Century", event: "Kalachuri & Sharana Movement", description: "Basavanna's revolutionary social reforms from Basavakalyan" },
    { year: "14th-16th Century", event: "Bahmani Sultanate", description: "Persian-inspired architecture in Gulbarga and Bidar" },
    { year: "16th-17th Century", event: "Vijayanagara Empire", description: "Hindu cultural revival and artistic patronage" },
    { year: "18th-20th Century", event: "Nizam Rule", description: "Introduction of Urdu and Indo-Islamic art forms" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Banner */}
     <div className="w-full h-24 md:h-28 bg-gradient-to-r from-gray-800 to-gray-900 text-white flex items-center justify-center shadow-lg">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            Places
          </h1>
          <div className="w-16 h-0.5 bg-white mx-auto mt-2 opacity-60"></div>
        </motion.div>
      </div>


      {/* Interactive District Showcase */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-800">Explore Our Districts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {districts.map((district) => (
            <motion.div
              key={district.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <Link to={`/${district.id}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={district.image} 
                    alt={district.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-2">{district.name}</h3>
                  <p className="text-gray-600 mb-4">{district.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-600 font-medium">Explore →</span>
                    <motion.div 
                      className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center"
                      whileHover={{ backgroundColor: "#fef3c7", scale: 1.1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Region Overview Card */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-8 border border-amber-200"
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4">About Kalyan Karnataka</h3>
              <p className="text-gray-700 mb-4">
                Kalyan Karnataka, formerly known as Hyderabad Karnataka, is a region in the northeastern part of Karnataka state. 
                Rich in history and culture, this region offers a unique blend of architectural marvels, natural beauty, and vibrant traditions.
              </p>
              <div className="flex space-x-4 mt-6">
                <Link to="/itinerary">
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                    Plan Your Visit
                  </button>
                </Link>
                <Link to="/hotels">
                  <button className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition">
                    Find Accommodations
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-amber-800 mb-2">6 Districts</h4>
                <p className="text-sm text-gray-600">Each with unique cultural heritage</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-amber-800 mb-2">Rich History</h4>
                <p className="text-sm text-gray-600">Dating back to 12th century</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-amber-800 mb-2">UNESCO Sites</h4>
                <p className="text-sm text-gray-600">Including the ruins of Hampi</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-amber-800 mb-2">Local Cuisine</h4>
                <p className="text-sm text-gray-600">Famous for Jolada Rotti & Ennegayi</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Cultural Timeline */}
      <section className="py-16 bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Cultural Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200"></div>
            
            <div className="space-y-12">
              {culturalTimeline.map((item, index) => (
                <motion.div 
                  key={index}
                  className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-1/2 pr-8 text-right">
                    {index % 2 === 0 ? (
                      <>
                        <h3 className="text-xl font-bold text-amber-200">{item.year}</h3>
                        <h4 className="text-lg font-semibold">{item.event}</h4>
                        <p>{item.description}</p>
                      </>
                    ) : <div></div>}
                  </div>
                  
                  <div className="z-10 w-6 h-6 rounded-full bg-amber-200 border-4 border-amber-800"></div>
                  
                  <div className="w-1/2 pl-8">
                    {index % 2 !== 0 ? (
                      <>
                        <h3 className="text-xl font-bold text-amber-200">{item.year}</h3>
                        <h4 className="text-lg font-semibold">{item.event}</h4>
                        <p>{item.description}</p>
                      </>
                    ) : <div></div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Heritage, Cuisine, and Crafts */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-800">Cultural Heritage</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Heritage */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            whileHover={{ y: -10 }}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="/Images/rich_heritage.jpg" 
                alt="Heritage" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-2">Rich Heritage</h3>
              <p className="text-gray-600">Explore ancient temples, forts, and historical monuments that showcase the regions rich cultural past.</p>
              <button className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                Discover Heritage
              </button>
            </div>
          </motion.div>
          
          {/* Cuisine */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            whileHover={{ y: -10 }}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="/Images/cruisine.jpeg" 
                alt="Cuisine" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-2">Local Cuisine</h3>
              <p className="text-gray-600">Savor the authentic flavors of Kalyan Karnataka with its unique blend of spices and traditional recipes.</p>
              <button className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                Explore Cuisine
              </button>
            </div>
          </motion.div>
          
          {/* Crafts */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            whileHover={{ y: -10 }}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="/Images/triditional.jpeg" 
                alt="Crafts" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-2">Traditional Crafts</h3>
              <p className="text-gray-600">Discover the intricate handloom textiles, pottery, and other crafts that showcase local artisanship.</p>
              <button className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                View Crafts
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Travel Tips & Weather */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-orange-600 text-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weather */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">Weather & Climate</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-white bg-opacity-20 rounded-lg">
                  <p className="font-bold">Winter</p>
                  <p>15-25°C</p>
                  <p className="text-sm">Nov-Feb</p>
                </div>
                <div className="text-center p-3 bg-white bg-opacity-20 rounded-lg">
                  <p className="font-bold">Summer</p>
                  <p>25-40°C</p>
                  <p className="text-sm">Mar-Jun</p>
                </div>
                <div className="text-center p-3 bg-white bg-opacity-20 rounded-lg">
                  <p className="font-bold">Monsoon</p>
                  <p>20-30°C</p>
                  <p className="text-sm">Jul-Oct</p>
                </div>
              </div>
              <p>Best time to visit: October to March when the weather is pleasant for sightseeing and outdoor activities.</p>
            </div>
            
            {/* Travel Tips */}
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">Travel Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Carry light cotton clothes during summer and light woolens during winter</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Local transport includes buses, auto-rickshaws, and taxis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Try local cuisine like Jolada Rotti, Ennegai, and Bele Holige</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Visit during festivals like Dasara for a cultural experience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-800">Tourist Gallery</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Images/KKR Region/Klb/places/SBtemple.jpg" 
              alt="Sharana Basaveshwara Temple" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <motion.div 
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Images/KKR Region/Koppal/anjanadri.jpg" 
              alt="Anjanadri Hills" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <motion.div 
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Images/KKR Region/ballari/bb1.jpg" 
              alt="Ballari Fort" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <motion.div 
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Images/KKR Region/Raichur/img2.jpg" 
              alt="Raichur Monument" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <motion.div 
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Images/KKR Region/yadgir/yy1.jpg" 
              alt="Yadgir Landscape" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <motion.div 
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Images/bidar_fort.jpg" 
              alt="Bidar Fort" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <motion.div 
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Images/KKR Region/Vijayanagar/vijaynagar.jpg" 
              alt="Vijayanagar Ruins" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <motion.div 
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Images/KKR Region/ballari/blr-12.jpg" 
              alt="Ballari Temple" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/gallery">
            <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              View Full Gallery
            </button>
          </Link>
        </div>
      </section>

      {/* Travel Itineraries */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-800">Suggested Itineraries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 3-Day Itinerary */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">3-Day Heritage Tour</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">Day 1:</span>
                    <span>Kalaburagi Fort & Sharana Basaveshwara Temple</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">Day 2:</span>
                    <span>Bidar Fort & Bahmani Tombs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">Day 3:</span>
                    <span>Hampi UNESCO Sites</span>
                  </li>
                </ul>
                <Link to="/itinerary">
                  <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
            
            {/* 5-Day Itinerary */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">5-Day Complete Tour</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">Day 1-2:</span>
                    <span>Kalaburagi & Bidar historical sites</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">Day 3:</span>
                    <span>Yadgir & Raichur attractions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">Day 4-5:</span>
                    <span>Koppal & Ballari with Hampi exploration</span>
                  </li>
                </ul>
                <Link to="/itinerary">
                  <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
            
            {/* Custom Itinerary */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">Plan Your Custom Trip</h3>
                <p className="text-gray-600 mb-4">
                  Create your own personalized itinerary based on your interests, time, and preferences.
                </p>
                <Link to="/itinerary">
                  <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                    Create Custom Itinerary
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kalyan Karnataka Tourism</h3>
              <p>Discover the hidden treasures of North Karnatakas cultural heartland.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-amber-200">Home</Link></li>
                <li><Link to="/districts" className="hover:text-amber-200">Districts</Link></li>
                <li><Link to="/gallery" className="hover:text-amber-200">Gallery</Link></li>
                <li><Link to="/contact" className="hover:text-amber-200">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p>Email: info@kalyankarnataka.com</p>
              <p>Phone: +91 1234567890</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-amber-200">Facebook</a>
                <a href="#" className="hover:text-amber-200">Instagram</a>
                <a href="#" className="hover:text-amber-200">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-700 mt-8 pt-8 text-center">
            <p>&copy; 2023 Kalyan Karnataka Tourism. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KalyanKarnatakaRegion;
