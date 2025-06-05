
import { useState } from "react";
import { motion } from "framer-motion";

const BidarPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const places = [
    {
      name: "Bidar Famous Places",
      image: "/Images/KKR Region/bidar/bidar.jpg",
      description:
        "Bidar, situated in the heart of the Kalyana Karnataka region, boasts a plethora of famous landmarks that embody the area’s rich historical and cultural heritage.",
      coordinates: [17.9104, 77.5199]
    },
    {
      name: "Bidar Fort",
      image: "/Images/KKR Region/bidar/bb1.jpg",
      description:
        "Bidar Fort, a majestic architectural marvel, stands as a testament to the region’s rich history and cultural heritage. Built during the Bahmani Sultanate era in the 15th century, it served as a symbol of power and authority.",
      coordinates: [17.9156, 77.5307]
    },
    {
      name: "Bidar Tomb",
      image: "/Images/KKR Region/bidar/bb2.jpg",
      description:
        "Bidar Tomb showcases ancient Indo-Islamic architectural brilliance. It serves as a key attraction, reflecting the grandeur of historical rulers and their contributions to the city’s legacy.",
      coordinates: [17.9120, 77.5250]
    },
    {
      name: "Basavakalyan",
      image: "/Images/KKR Region/bidar/bb3.jpg",
      description:
        "Basavakalyan is known for its significance in Lingayatism, founded by Basavanna. It is home to Anubhava Mantapa, a spiritual and social reform center promoting equality and devotion.",
      coordinates: [17.8756, 76.9498]
    },
  ];

  const nextPlace = () => {
    setActiveIndex((prev) => (prev + 1) % places.length);
  };

  const prevPlace = () => {
    setActiveIndex((prev) => (prev - 1 + places.length) % places.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-900">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-bold">Discover Bidar</h1>
        <p className="mt-2 text-lg">Explore the historical wonders of this ancient city</p>
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

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevPlace}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition shadow-md flex items-center"
          >
            <span className="mr-2">←</span> Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextPlace}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition shadow-md flex items-center"
          >
            Next <span className="ml-2">→</span>
          </motion.button>
        </div>
      </main>
      
      {/* Travel Tips Section */}
      <section className="bg-blue-50 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Travel Tips for Bidar</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Best Time to Visit</h4>
              <p className="text-gray-700">October to March is ideal for visiting Bidar when the weather is pleasant and perfect for sightseeing.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Local Cuisine</h4>
              <p className="text-gray-700">Dont miss trying the local Bidri crafts and traditional Karnataka dishes like Jolada Rotti and Ennegayi.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Getting Around</h4>
              <p className="text-gray-700">Auto-rickshaws and taxis are readily available. Consider hiring a guide to learn about the rich history.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Explore Bidar Region</h3>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60708.61077133621!2d77.47942282167967!3d17.913705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5ceb8e1a3b959%3A0x39580a5e5f3dd2fc!2sBidar%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Bidar Map"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-xl font-bold mb-4">Kalyan Karnataka Tourism</h3>
          <p className="mb-4">Discover the hidden gems of Bidar and the Kalyan Karnataka region</p>
          <p>&copy; 2025 Kalyan Karnataka Tourism. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BidarPage;
