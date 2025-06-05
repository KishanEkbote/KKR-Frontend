
import { useState } from "react";
import { motion } from "framer-motion";

const BellaryPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const places = [
    {
      name: "Hampi UNESCO",
      image: "Images/KKR Region/ballari/bb1.jpg",
      description: "Hampi: A UNESCO World Heritage Site, Hampi is an ancient city known for its magnificent ruins, temples, and monuments dating back to the Vijayanagara Empire."
    },
    {
      name: "Tungabhadra Dam",
      image: "Images/KKR Region/ballari/bb2.jpg",
      description: "The Tungabhadra Dam, situated near Hampi, serves as a vital source for irrigation and hydroelectric power, while also offering breathtaking views and recreational activities."
    },
    {
      name: "Bellary Fort",
      image: "Images/KKR Region/ballari/bb3.jpg",
      description: "Perched atop a hill, Bellary Fort is a historical landmark offering panoramic views of the cityscape and insights into the region's storied past."
    },
    {
      name: "Lotus Mahal",
      image: "Images/KKR Region/ballari/bb4.jpg",
      description: "A masterpiece of Indo-Islamic architecture, the Lotus Mahal in Hampi captivates visitors with its delicate arches and ornate carvings."
    }
  ];

  const nextPlace = () => {
    setActiveIndex((prev) => (prev + 1) % places.length);
  };

  const prevPlace = () => {
    setActiveIndex((prev) => (prev - 1 + places.length) % places.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-800">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-bold">Discover Bellary</h1>
        <p className="mt-2 text-lg">Experience the historical wonders and natural beauty</p>
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
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
                  View Details
                </button>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Add to Itinerary
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
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Travel Tips for Bellary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Best Time to Visit</h4>
              <p className="text-gray-700">October to February is ideal for visiting Bellary and Hampi when the weather is pleasant and perfect for exploring the ruins.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Local Cuisine</h4>
              <p className="text-gray-700">Try the local Karnataka cuisine including Jolada Rotti, Bisi Bele Bath, and the famous Bellary Biryani for an authentic experience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Getting Around</h4>
              <p className="text-gray-700">Auto-rickshaws and taxis are available for local travel. Consider hiring a guide in Hampi to learn about its rich history.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Explore Bellary Region</h3>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123169.50231889532!2d76.8646361!3d15.1394831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb7e7e4b2c75adf%3A0x5f76d2a7cc2b7fde!2sBallari%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Bellary Map"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-xl font-bold mb-4">Kalyan Karnataka Tourism</h3>
          <p className="mb-4">Discover the hidden gems of Bellary and the Kalyan Karnataka region</p>
          <p>&copy; 2025 Kalyan Karnataka Tourism. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BellaryPage;
