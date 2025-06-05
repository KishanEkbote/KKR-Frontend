import { useState, useEffect } from "react";

const places = [
  {
    name: "Yadgiri",
    image: "Images/KKR Region/yadgir/21 Yadgiri District.jpg",
    fullImage: "Images/KKR Region/yadgir/21 Yadgiri District.jpg",
    description:
      "Yadgiri is known for its historical significance and beautiful landscapes, offering a glimpse into the past with its ancient forts and temples.",
    link: "/yadgir",
  },
  {
    name: "Koppal",
    image: "Images/KKR Region/Koppal/koppal.jpg",
    fullImage: "Images/KKR Region/Koppal/koppal.jpg",
    description:
      "Koppal is a treasure trove of ancient architecture and cultural heritage, inviting visitors to explore its storied past.",
    link: "/koppal",
  },
  {
    name: "Kalaburgi",
    image: "Images/KKR Region/Klb/klb.jpg",
    fullImage: "Images/KKR Region/Klb/klb.jpg",
    description:
      "Kalaburgi stands as a testament to the region's rich cultural heritage and architectural prowess.",
    link: "/klb",
  },
  {
    name: "Raichur",
    image: "Images/KKR Region/Raichur/Raichur_img.jpg",
    fullImage: "Images/KKR Region/Raichur/Raichur_img.jpg",
    description:
      "Raichur is famous for its stunning fort and rich history, making it a must-visit destination for history enthusiasts.",
    link: "/raichur",
  },
  {
    name: "Bellari",
    image: "Images/KKR Region/ballari/blr-12.jpg",
    fullImage: "Images/KKR Region/ballari/blr-12.jpg",
    description:
      "Bellari is known for its historical significance and beautiful landscapes, offering a glimpse into the past with its ancient forts and temples.",
    link: "/ballari",
  },
  {
    name: "Vijayanagar",
    image: "Images/KKR Region/Vijayanagar/vijaynagar.jpg",
    fullImage: "Images/KKR Region/Vijayanagar/vijaynagar.jpg",
    description:
      "Vijayanagar is a historical city that showcases the grandeur of the Vijayanagara Empire with its impressive ruins and monuments.",
    link: "/vijayanagar",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + places.length) % places.length;
    setCurrentIndex(newIndex);
    setSelectedImage(places[newIndex].fullImage);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % places.length;
    setCurrentIndex(newIndex);
    setSelectedImage(places[newIndex].fullImage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b py-10 md:py-16 px-2 md:px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-indigo-900 mb-3 text-center">
          Explore Kalyana Karnataka
        </h1>
        <p className="text-base md:text-lg text-indigo-700 mb-8 md:mb-12 text-center max-w-3xl mx-auto">
          Discover the rich heritage, stunning landscapes, and cultural treasures of this beautiful region
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {places.map((place, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div 
                className="relative h-48 md:h-64 overflow-hidden cursor-pointer transition-transform duration-500 group-hover:scale-110"
                onClick={() => openLightbox(place.fullImage, index)}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white bg-opacity-75 text-indigo-800 px-4 py-2 rounded-full font-medium">View Larger</span>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{place.name}</h3>
                <p className="text-gray-600 mb-4">{place.description}</p>
                <a 
                  href={place.link} 
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Explore More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-full">
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
              onClick={closeLightbox}
            >
              ×
            </button>
            
            {/* Navigation buttons */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold z-10 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
              onClick={goToPrevious}
            >
              ‹
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold z-10 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
              onClick={goToNext}
            >
              ›
            </button>
            
            {/* Image */}
            <img 
              src={selectedImage} 
              alt={places[currentIndex].name} 
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Caption */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-3 px-6 mx-auto rounded-lg max-w-lg">
              <h3 className="text-xl font-bold">{places[currentIndex].name}</h3>
              <p className="text-sm mt-1">{places[currentIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
