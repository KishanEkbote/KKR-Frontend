
import { motion } from "framer-motion";
import { useState } from "react";

const KalaburagiPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const places = [
    {
      name: "Buddha Vihara",
      image: "/Images/KKR Region/Klb/places/Buddvihar.jpg",
      description:
        "Buddha Vihara is a place for Buddhists, situated in Kalaburagi, Karnataka. It blends architectural features from Sanchi, Sarnath, Ajanta, and Nagpur, conforming to traditional Buddhist architecture.",
    },
    {
      name: "Sharana Basaveshwara Temple",
      image: "/Images/KKR Region/Klb/places/SBtemple.jpg",
      description:
        "The temple is dedicated to Shri Sharana Basaveshwara, a Lingayat saint of the 18th century known for his Dasoha (Giving is earning) and Kayaka philosophy.",
    },
    {
      name: "Jama Masjid",
      image: "/Images/KKR Region/Klb/places/jamma.jpg",
      description:
        "The Jama Masjid was regarded as a symbolic gesture of Islamic power across India. It remains in active use and is one of Kalaburagi’s most iconic sites.",
    },
  ];

  const nextPlace = () => {
    setActiveIndex((prev) => (prev + 1) % places.length);
  };

  const prevPlace = () => {
    setActiveIndex((prev) => (prev - 1 + places.length) % places.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100  text-gray-900">
      <header className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-bold">Discover Kalaburagi</h1>
        <p className="mt-2 text-lg">Experience the rich cultural heritage of this historic city</p>
      </header>
      
      <main className="max-w-5xl mx-auto p-6">
        {/* Featured Place */}
        <motion.section
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg mb-10 overflow-hidden"
        >
          <div className="md:flex gap-8 items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={places[activeIndex].image}
                alt={places[activeIndex].name}
                className="w-full h-80 object-cover rounded-lg shadow-md hover:shadow-xl transition duration-300"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">{places[activeIndex].name}</h2>
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

        {/* Other Places */}
        <h3 className="text-2xl font-bold text-center mb-6 text-indigo-800">More Places to Explore</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {places.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition duration-300 ${
                index === activeIndex ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold text-blue-900">{place.name}</h3>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-10">
          <button 
            onClick={prevPlace}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition shadow-md flex items-center"
          >
            <span className="mr-2">←</span> Previous
          </button>
          <button 
            onClick={nextPlace}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition shadow-md flex items-center"
          >
            Next <span className="ml-2">→</span>
          </button>
        </div>
        {/* Travel Tips Section */}
        <section className="bg-blue-50 py-12 mt-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Travel Tips for Kalaburagi</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Best Time to Visit</h4>
                <p className="text-gray-700">October to March is ideal for visiting Kalaburagi when the weather is pleasant and perfect for exploring the historical sites and temples.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Local Cuisine</h4>
                <p className="text-gray-700">Try the local North Karnataka cuisine including Jolada Rotti, Ennegayi (stuffed brinjal), and the famous Kalaburagi Khara Boondi for an authentic experience.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Getting Around</h4>
                <p className="text-gray-700">Auto-rickshaws and city buses are available for local travel. Consider hiring a local guide to learn about the rich history of Buddha Vihara and Sharana Basaveshwara Temple.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Explore Kalaburagi Region</h3>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122232.29598033437!2d76.76891121640625!3d17.33002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8c7a5f8b3d46f%3A0xb5f4ab1c6f0fd6e!2sKalaburagi%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kalaburagi Map"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        
        
      </main>
      
      <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center py-6 mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-xl font-bold mb-4">Kalyan Karnataka Tourism</h3>
          <p className="mb-4">Discover the hidden gems of Kalaburagi and the Kalyan Karnataka region</p>
          <p>&copy; 2025 Kalyan Karnataka Tourism. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default KalaburagiPage;
