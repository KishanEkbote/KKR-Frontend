
import { useState } from 'react';
import { motion } from 'framer-motion';

const RaichurPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const places = [
    {
      name: "Raichur Fort",
      image: "Images/KKR Region/Raichur/img1.jpg",
      description: "Raichur Fort, built during the Kakatiya dynasty, stands as a testament to the region's rich historical heritage. It offers panoramic views and insights into ancient architecture."
    },
    {
      name: "Thermal Power Station",
      image: "Images/KKR Region/Raichur/img2.jpg",
      description: "The Raichur Thermal Power Station is a significant industrial landmark, playing a pivotal role in Karnataka's electricity supply. It utilizes coal as its primary fuel source for large-scale power generation."
    },
    {
      name: "Ek Minar Ki Masjid",
      image: "Images/KKR Region/Raichur/img3.jpg",
      description: "The Ek Minar Ki Masjid is a historic mosque known for its distinctive single minaret. This architectural marvel reflects the rich cultural heritage and Islamic influence in Raichur."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-900">
      <header className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-bold">Discover Raichur</h1>
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
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Explore Raichur Region</h3>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122232.74926457!2d77.30537099999999!3d16.2120207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8c6e03e08a9e1%3A0x1a9f0fb8b7c63fe3!2sRaichur%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Raichur Map"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        
        {/* Travel Tips Section */}
        <section className="bg-blue-50 py-12 mt-12 rounded-xl">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Travel Tips for Raichur</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Best Time to Visit</h4>
                <p className="text-gray-700">October to March is ideal for visiting Raichur when the weather is pleasant and perfect for exploring the historical sites and monuments.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Local Cuisine</h4>
                <p className="text-gray-700">Try the local North Karnataka cuisine including Jolada Rotti, Benne Dosa, and the famous Raichur Biryani for an authentic culinary experience.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Getting Around</h4>
                <p className="text-gray-700">Auto-rickshaws and local buses are available for travel within the city. For visiting nearby attractions, consider hiring a taxi for a more comfortable experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Historical Significance Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Historical Significance</h3>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 leading-relaxed">
                Raichur has a rich historical background, having been ruled by various dynasties including the Chalukyas, Kakatiyas, Vijayanagara Empire,
                 and the Bahmani Sultanate. The district is known for its historical monuments, temples, and mosques that reflect 
                 the diverse cultural influences throughout its history. The famous Raichur Fort, built in 1294 CE, has witnessed numerous battles and stands as a symbol of the regions strategic importance in medieval India.
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-between mt-10">
          <a href="#" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Previous District</a>
          <a href="#" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Next District</a>
        </div>
      </main>
    </div>
  );
};

export default RaichurPage;
