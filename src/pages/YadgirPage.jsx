
import { useState } from 'react';
import { motion } from 'framer-motion';

const YadgirPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const places = [
    {
      name: "Chayabhagavati / Chaya Devi",
      image: "Images/KKR Region/yadgir/yy1.jpg",
      description: "The story of Chaya begins with Surya's marriage to Sanjna. Unable to withstand his heat, she creates a look-alike from her own reflection named Chaya, who takes her place and bears him three children."
    },
    {
      name: "Kodekal Basavanna Temple",
      image: "Images/KKR Region/yadgir/yy2.jpg",
      description: "The Kodekal Basavanna Temple in Yadgir is dedicated to Saint Kodekal Basawanna, a devout follower of Saint Basavanna, known for his contributions to the 'Kala Gnana' (Divine Knowledge of Time)."
    },
    {
      name: "Venugopalaswamy Temple, Surapur",
      image: "Images/KKR Region/yadgir/yy3.jpg",
      description: "Built in 1705 by Raja Pitambar Bahari Pidda Nayaka, the temple is famous for its stunning stucco sculptures and the annual Gokulastami fair, attracting devotees from across the region."
    },
    {
      name: "Sri Vishwaradhya Sidda Samsthana Matha",
      image: "Images/KKR Region/yadgir/yy4.jpg",
      description: "Managed by Poojya Shri Shatasthala Brahmi Acharya Ratna Shri Dr. Gangadhara Shivacharya Mahaswamiji, the matha hosts an annual Jaatra after Maha Shivaratri, drawing devotees from various states."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-900">
      <header className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-bold">Discover Yadgir</h1>
        <p className="mt-2 text-lg">Experience the rich cultural heritage and historical landmarks</p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <motion.section
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-12"
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={places[activeIndex].image}
                alt={places[activeIndex].name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">{places[activeIndex].name}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{places[activeIndex].description}</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setActiveIndex((prev) => (prev === 0 ? places.length - 1 : prev - 1))}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setActiveIndex((prev) => (prev === places.length - 1 ? 0 : prev + 1))}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Places Grid */}
        <h3 className="text-2xl font-bold text-center mb-6 text-indigo-800">Explore All Attractions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {places.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className={`bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition duration-300 ${
                index === activeIndex ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative h-48">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                {index === activeIndex && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Selected
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-1">{place.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{place.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Explore Yadgir Region</h3>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122232.74926457!2d77.1!3d16.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8c6e03e08a9e1%3A0x1a9f0fb8b7c63fe3!2sYadgir%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yadgir Map"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Travel Tips */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">Travel Tips</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Best Time to Visit</h4>
                <p className="text-gray-600">October to March is ideal for visiting Yadgir when the weather is pleasant and suitable for sightseeing.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Local Transportation</h4>
                <p className="text-gray-600">Auto-rickshaws and taxis are readily available. Consider hiring a local guide to explore the historical sites.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Local Cuisine</h4>
                <p className="text-gray-600">Dont miss trying the local Hyderabadi-influenced cuisine, especially the biryani and traditional sweets.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Historical Significance */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">Historical Significance</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 leading-relaxed">
              Yadgir has a rich historical background, having been ruled by various dynasties including the Chalukyas, Kalachuris,
               Yadavas, and the Bahmani Sultanate. The region is known for its blend of Hindu and Islamic architectural influences, 
               with numerous temples and historical structures that showcase this cultural fusion. The district was officially formed in 2009 
               when it was carved out of the Gulbarga district, making it one of Karnatakas newer districts while still preserving its ancient heritage.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>© 2023 Yadgir Tourism | Explore the Heritage of Karnataka</p>
      </footer>
    </div>
  );
};

export default YadgirPage;
