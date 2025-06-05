import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const banners = [
  "🌿Explore the rich heritage of Kalyan Karnataka!",
  "🌄Explore the hidden gems of Kalyan Karnataka!",
  "🏕️Nature, Heritage, Adventure - Experience all in Karnataka!"
];

const districts = [
  {
    name: "Ballari",
    image: "/Images/KKR Region/ballari/bb1.jpg",
    description: "Famous for Hampi, a UNESCO World Heritage Site, and rich historical ruins.",
    link: "https://ballari.nic.in/en/tourism/",
  
  },
  {
    name: "Bidar",
    image: "/Images/KKR Region/bidar/bidar_fort.jpg",
    description: "Known for its fort, unique Bidriware craft, and rich Islamic heritage.",
    link: "https://bidar.nic.in/en/tourism/",

  },
  {
    name: "Kalaburagi",
    image: "/Images/KKR Region/Klb/Buddha_Vihar_Kalaburagi.jpg",
    description: "Land of domes, Sufi shrines, and the famous Kalaburagi fort.",
    link: "https://kalaburagi.nic.in/en/tourism/",

  },
  {
    name: "Koppal",
    image: "/Images/KKR Region/Koppal/anjanadri.jpg",
    description: "Gateway to Hampi, ancient temples, and scenic landscapes.",
    link: "https://koppal.nic.in/en/tourism/",
   
  },
  {
    name: "Raichur",
    image: "/Images/KKR Region/Raichur/img1.jpg",
    description: "Historic forts, river islands, and a blend of cultures.",
    link: "https://raichur.nic.in/en/tourism/",
  
  },
  {
    name: "Yadgir",
    image: "/Images/KKR Region/yadgir/yy1.jpg",
    description: "Famous for hills, forts, and the scenic Krishna river.",
    link: "https://yadgir.nic.in/en/tourism/",
    // color: "border-pink-400"
  }
];

export default function LandingPage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800">
      <div className="bg-amber-100 text-red-800 text-center py-3 font-bold text-lg">
        {banners[currentBanner]}
      </div>

      <motion.section className="text-center mt-6 md:mt-10">
        <img
          className="w-full max-h-56 md:max-h-80 lg:max-h-[400px] object-cover rounded-md md:rounded-2xl mx-auto"
          alt="Heritage"
          src="Images/banner.jpeg"
        />
        <p className="mt-3 md:mt-4 text-lg md:text-xl font-light text-black">
          <b>A land of history, culture, and breathtaking landscapes awaits you.</b>
        </p>
      </motion.section>

      <div className="flex flex-col items-center my-6 md:my-10 px-2">
        <a
          href="https://kkrdb.karnataka.gov.in/en"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg text-center"
        >
          Know more about Kalyan Karnataka
        </a>
      </div>

      <section className="max-w-6xl mx-auto px-2 md:px-4 mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-900 mb-2 tracking-tight drop-shadow-lg">
          Government Tourism Websites by District
        </h2>
        <p className="text-center text-base md:text-lg text-gray-700 mb-6 md:mb-10">
          Discover the best of Kalyan Karnataka! Click on a district to explore its official tourism portal.
        </p>
        <div className="relative mb-8 md:mb-12">
          <img
            src="/Images/map_kkr.png"
            alt="Kalyan Karnataka Map"
            className="mx-auto rounded-xl md:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-2xl opacity-90 border-4 border-blue-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-100 via-transparent to-transparent rounded-xl md:rounded-2xl pointer-events-none"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {districts.map((district) => (
            <div
              key={district.name}
              className={`rounded-lg bg-white shadow-lg overflow-hidden border-t-4 ${district.color} flex flex-col h-full`}
            >
              <a href={district.link} target="_blank" rel="noopener noreferrer">
                <img src={district.image} alt={district.name} className="w-full h-40 md:h-48 object-cover" />
              </a>
              <div className="p-4 md:p-6 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">{district.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 flex-1">{district.description}</p>
                <a
                  href={district.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded bg-blue-600 px-4 md:px-5 py-2 text-xs md:text-sm text-white font-medium hover:bg-blue-700 transition shadow text-center"
                >
                  Visit Tourism Site
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="p-4 md:p-6 bg-black text-center text-white text-xs md:text-base">
        <p>&copy; 2025 Kalyan Karnataka Tourism. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
