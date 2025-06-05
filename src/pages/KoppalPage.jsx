
import { useState } from 'react';
import { motion } from 'framer-motion';

const KoppalPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const places = [
    {
      name: "Anjanadri Betta Temple",
      image: "Images/KKR Region/Koppal/anjanadri.jpg",
      description: "Lord Hanuman was born here. It's a climb with 575 steps to the top of the hill. This is also a sunset point, offering a scenic view of the Tungabhadra River flowing between the rocks and mountains."
    },
    {
      name: "Kanakagiri",
      image: "Images/KKR Region/Koppal/Kanakagiri.jpg",
      description: "Kanakagiri (also known as Suvarnagiri) was a provincial capital of the Mauryan Empire and later the Nayaka dynasty under the Vijayanagara Empire. It is home to the historically significant Kanakachalapathi Temple."
    },
    {
      name: "Gavimath",
      image: "Images/KKR Region/Koppal/Gavimath.jpg",
      description: "The present-day Gavi Math of Koppal is an attraction of great spiritual importance. Anegundi, the first capital of the Vijayanagara Dynasty, is nearby, where the annual Anegundi Utsava festival is celebrated."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-900">
      <header className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-bold">Discover Koppal</h1>
        <p className="mt-2 text-lg">Experience the rich cultural heritage and natural beauty</p>
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

           
        {/* Travel Tips Section */}
        <section className="bg-blue-50 py-12 mt-12 rounded-xl">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Travel Tips for Koppal</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Best Time to Visit</h4>
                <p className="text-gray-700">October to March is ideal for visiting Koppal when the weather is pleasant and perfect for exploring the temples and historical sites.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Local Cuisine</h4>
                <p className="text-gray-700">Try the local North Karnataka cuisine including Jolada Rotti, Ennegayi, and the famous spicy chutneys for an authentic experience.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Getting Around</h4>
                <p className="text-gray-700">Auto-rickshaws and local buses are available for travel. For visiting Anjanadri Betta, comfortable footwear is recommended for the 575 steps.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-between mt-10">
          <a href="#" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Previous District</a>
          <a href="kalaburagi_page.html" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Next District</a>
        </div>
        {/* Map Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-800">Explore Koppal Region</h3>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61456.81035825055!2d76.12861534863282!3d15.349999899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb7e8a2d6619857%3A0x5fe4e67e8a2f5e1!2sKoppal%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Koppal Map"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
       
      </main>
    </div>
  );
};

export default KoppalPage;
