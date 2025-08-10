import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, Calendar, Phone, Globe, MapPin, Search } from 'lucide-react';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { API_PATH } from "../path/apiPath";

const districts = [
  { name: 'Bidar', latMin: 17.5, latMax: 18.2, lonMin: 76.5, lonMax: 77.5 },
  { name: 'Kalaburagi', latMin: 17.0, latMax: 17.6, lonMin: 76.5, lonMax: 77.5 },
  { name: 'Yadgir', latMin: 16.5, latMax: 17.2, lonMin: 76.5, lonMax: 77.5 },
  { name: 'Raichur', latMin: 16.0, latMax: 16.9, lonMin: 76.0, lonMax: 77.0 },
  { name: 'Koppal', latMin: 15.8, latMax: 16.5, lonMin: 75.9, lonMax: 76.8 },
  { name: 'Ballari', latMin: 15.0, latMax: 15.9, lonMin: 76.0, lonMax: 77.2 },
  { name: 'Vijayanagara', latMin: 15.0, latMax: 15.9, lonMin: 75.5, lonMax: 76.8 },
];

// Sample hotel images for the landing page carousel
const featuredHotels = [
  {
    id: 'featured1',
    name: 'Hotel Kalaburagi Grand',
    image: '/Images/Hotels/Hotel VKG.jpg',
    rating: 4.5,
    price: '₹2,500',
    district: 'Kalaburagi',
    latitude: 17.3297,
    longitude: 76.8343
  },
  {
    id: 'featured2',
    name: 'Bidar Heritage Inn',
    image: '/Images/Hotels/hotel_lotus_park.jpg',
    rating: 4.2,
    price: '₹2,200',
    district: 'Bidar',
    latitude: 17.9104,
    longitude: 77.5199
  },
  {
    id: 'featured3',
    name: 'Raichur Plaza',
    image: '/Images/Hotels/plaza_hotel.jpg',
    rating: 4.0,
    price: '₹2,000',
    district: 'Raichur',
    latitude: 16.2120,
    longitude: 77.3439
  }
];

// Sample reviews
const sampleReviews = {
  'featured1': [
    { id: 1, user: 'Rahul S.', rating: 5, comment: 'Excellent service and amenities. The staff was very helpful.', date: '2023-10-15' },
    { id: 2, user: 'Priya M.', rating: 4, comment: 'Clean rooms and good location. Breakfast could be better.', date: '2023-09-22' }
  ],
  'featured2': [
    { id: 3, user: 'Amit K.', rating: 4, comment: 'Beautiful heritage property with modern amenities.', date: '2023-11-05' },
    { id: 4, user: 'Sneha R.', rating: 5, comment: 'Perfect stay for history lovers. Amazing architecture!', date: '2023-10-30' }
  ],
  'featured3': [
    { id: 5, user: 'Vikram J.', rating: 3, comment: 'Decent hotel but needs renovation in some areas.', date: '2023-11-12' },
    { id: 6, user: 'Meera P.', rating: 4, comment: 'Good value for money. Friendly staff.', date: '2023-10-18' }
  ]
};

// Define mapContainerStyle for the map tab
const mapContainerStyle = { width: '100%', height: '100%' };

// MapUpdater component to update map view when hotel changes
function MapUpdater({ hotel }) {
  const map = useMap();
  useEffect(() => {
    if (hotel && hotel.latitude && hotel.longitude) {
      map.setView([hotel.latitude, hotel.longitude], 13);
    }
  }, [hotel, map]);
  return null;
}
MapUpdater.propTypes = {
  hotel: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  })
};

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleError = (errorMessage) => {
    setError(errorMessage);
    console.error(errorMessage);
  };
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    name: '',
    email: '',
    phone: ''
  });
  const [activeTab, setActiveTab] = useState('details');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fix Leaflet icon issues
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        
        // More detailed error handling for API connection
        const response = await axios.get(`${API_PATH}/api/hotels`, {
          timeout: 8000, // Increase timeout to 8 seconds
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log("API Response:", response);
        
        if (response.data && response.data.length > 0) {
          setHotels(response.data);
          setFilteredHotels(response.data);
          setError(null); // Clear any previous errors
        } else {
          console.warn("API returned empty data");
          handleError("No hotels found in database. Showing featured hotels instead.");
          setHotels(featuredHotels);
          setFilteredHotels(featuredHotels);
        }
      } catch (err) {
        // More detailed error logging
        if (err.response) {
          // Server responded with error status
          console.error("Server error:", err.response.status, err.response.data);
          handleError(`Server error (${err.response.status}). Using fallback data.`);
        } else if (err.request) {
          // Request made but no response received
          console.error("No response from server:", err.request);
          handleError("Cannot connect to server. Check if backend is running.");
        } else {
          // Error in request setup
          console.error("Request error:", err.message);
          handleError(`Request error: ${err.message}`);
        }
        
        setHotels(featuredHotels);
        setFilteredHotels(featuredHotels);
      } finally {
        setLoading(false);
      }
    };

    // Start with featured hotels immediately
    setHotels(featuredHotels);
    setFilteredHotels(featuredHotels);
    setLoading(false);
    
    // Then try to fetch from API
    fetchHotels();
  }, []);

  useEffect(() => {
    let filtered = hotels;
    if (searchDistrict) {
      filtered = filtered.filter((hotel) => hotel.district === searchDistrict);
    }
    if (searchQuery) {
      filtered = filtered.filter((hotel) => hotel.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredHotels(filtered);
  }, [searchDistrict, searchQuery, hotels]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${selectedHotel.name}!\nCheck-in: ${bookingData.checkIn}\nCheck-out: ${bookingData.checkOut}\nThank you, ${bookingData.name}!`);
    setShowBookingForm(false);
    setBookingData({
      checkIn: '',
      checkOut: '',
      guests: 1,
      rooms: 1,
      name: '',
      email: '',
      phone: ''
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredHotels.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredHotels.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-yellow-400 fill-current" size={16} />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="text-yellow-400 fill-current" size={16} style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={16} />);
    }
    
    return stars;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Carousel */}
      <div className="relative h-56 md:h-80 lg:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-in-out flex"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredHotels.map((hotel, index) => (
            <div key={hotel.id} className="relative w-full flex-shrink-0">
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-56 md:h-80 lg:h-96 object-contain"
              />
              <div className="absolute inset-0 bg-black/10 bg-opacity-40 flex items-end px-3">
                <div className="p-5 md:p-8 text-black max-w-3xl">
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 ">{hotel.name}</h1>
                  <div className="flex items-center mb-2 ">
                    {renderStars(hotel.rating)}
                    <span className="ml-2">{hotel.rating}/5</span>
                  </div>
                  <p className="text-base md:text-xl mb-2 md:mb-4">{hotel.location}  {hotel.price} per night</p>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-md transition duration-300 text-sm md:text-base"
                    onClick={() => {
                      setSelectedHotel(featuredHotels[index]);
                      setShowBookingForm(true);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button 
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          onClick={nextSlide}
        >
          &#10095;
        </button>
        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredHotels.map((_, index) => (
            <button 
              key={index} 
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-4 py-8 md:py-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-3">Accommodations in Kalyana Karnataka</h2>
          <div className="w-16 md:w-24 h-1 bg-blue-600 mx-auto mb-2 md:mb-4"></div>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the finest hotels and stays across the historic Kalyana Karnataka region, 
            offering comfort and luxury with authentic local experiences.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          {/* Search and filter controls */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search hotels..."
                className="pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48 md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 md:top-3.5 text-gray-400" size={18} />
            </div>
            <select
              className="border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
            >
              <option value="">All Districts</option>
              {districts.map((district) => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <p className="text-gray-600 font-medium text-sm md:text-base">
              {filteredHotels.length} {filteredHotels.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
        </div>
        {/* Loading Indicator */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
            {[...Array(6)].map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-32 md:h-48 bg-gray-300"></div>
                <div className="p-4 md:p-6">
                  <div className="h-5 md:h-6 bg-gray-300 rounded w-3/4 mb-2 md:mb-4"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-full mb-1 md:mb-2"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-full mb-1 md:mb-2"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-2/3 mb-2 md:mb-4"></div>
                  <div className="h-8 md:h-10 bg-gray-300 rounded w-1/3 mt-2 md:mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Hotel Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-xl text-gray-600">Loading hotels...</p>
            </div>
          ) : error ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-xl text-red-600">{error}</p>
              <button 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={hotel.image || '/Images/Hotels/Hotel VKG.jpg'} 
                  alt={hotel.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
                    <div className="flex items-center">
                      {renderStars(hotel.rating || 4)}
                      <span className="ml-1 text-sm text-gray-600">{hotel.rating || 4}/5</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <p>{hotel.district || 'Unknown'}</p>
                  </div>
                  
                  <p className="mt-1 text-gray-600">{hotel.address || 'Address not available'}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-blue-600">₹{hotel.price || '2,500'}<span className="text-sm font-normal text-gray-600">/night</span></p>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                      onClick={() => {
                        setSelectedHotel(hotel);
                        setShowBookingForm(true);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-xl text-gray-600">⚠ No hotels found matching your criteria.</p>
              <button 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                onClick={() => {
                  setSearchDistrict('');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hotel Detail Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedHotel.image || '/Images/Hotels/Hotel VKG.jpg'} 
                alt={selectedHotel.name} 
                className="w-full h-64 object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                onClick={() => {
                  setSelectedHotel(null);
                  setShowBookingForm(false);
                  setActiveTab('details');
                }}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h2>
              
              <div className="flex items-center mb-4">
                {renderStars(selectedHotel.rating || 4)}
                <span className="ml-2 text-gray-600">{selectedHotel.rating || 4}/5</span>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <button 
                  className={`px-4 py-2 rounded-md ${activeTab === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${activeTab === 'map' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setActiveTab('map')}
                >
                  Map
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>
              
              {activeTab === 'details' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin className="text-blue-600 mr-2" size={18} />
                      <p>{selectedHotel.address || 'Address not available'}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-blue-600 mr-2" size={18} />
                      <p>{selectedHotel.phone || 'Phone not available'}</p>
                    </div>
                    <div className="flex items-center">
                      <Globe className="text-blue-600 mr-2" size={18} />
                      <a href={selectedHotel.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-blue-600 mr-2" size={18} />
                      <p>Check-in: 2:00 PM, Check-out: 12:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">About this hotel</h3>
                    <p className="text-gray-700">
                      Experience luxury and comfort at {selectedHotel.name} located in the heart of {selectedHotel.district || 'Kalyana Karnataka'}. 
                      Our hotel offers modern amenities, spacious rooms, and exceptional service to make your stay memorable.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <p className="flex items-center"><span className="mr-2">✓</span> Free Wi-Fi</p>
                      <p className="flex items-center"><span className="mr-2">✓</span> Air Conditioning</p>
                      <p className="flex items-center"><span className="mr-2">✓</span> Restaurant</p>
                      <p className="flex items-center"><span className="mr-2">✓</span> Room Service</p>
                      <p className="flex items-center"><span className="mr-2">✓</span> Parking</p>
                      <p className="flex items-center"><span className="mr-2">✓</span> Swimming Pool</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'map' && (
                <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
                  {selectedHotel ? (
                    <MapContainer 
                      center={[
                        selectedHotel.latitude || 17.3297, // Default to Kalaburagi coordinates
                        selectedHotel.longitude || 76.8343
                      ]} 
                      zoom={13} 
                      style={mapContainerStyle}
                      whenCreated={(mapInstance) => {
                        // Store map instance for later use
                        setTimeout(() => mapInstance.invalidateSize(), 200);
                      }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker 
                        position={[
                          selectedHotel.latitude || 
                          ((districts.find(d => d.name === selectedHotel.district)?.latMin || 15) + 
                           (districts.find(d => d.name === selectedHotel.district)?.latMax || 18)) / 2,
                          selectedHotel.longitude || 
                          ((districts.find(d => d.name === selectedHotel.district)?.lonMin || 76) + 
                           (districts.find(d => d.name === selectedHotel.district)?.lonMax || 77)) / 2
                        ]}
                      >
                        <Popup>{selectedHotel.name}</Popup>
                      </Marker>
                      <MapUpdater hotel={selectedHotel} />
                    </MapContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-100">
                      <p className="text-gray-500">Select a hotel to view on map</p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Guest Reviews</h3>
                  {sampleReviews[selectedHotel.id] ? (
                    sampleReviews[selectedHotel.id].map(review => (
                      <div key={review.id} className="mb-4 pb-4 border-b border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold">{review.user}</p>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                            <span className="ml-1 text-sm">{review.rating}/5</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-1">{review.comment}</p>
                        <p className="text-sm text-gray-500">Stayed on {review.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No reviews available for this hotel.</p>
                  )}
                </div>
              )}
              
              {showBookingForm && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
                  <form onSubmit={handleBookingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Check-in Date</label>
                        <input 
                          type="date" 
                          name="checkIn"
                          value={bookingData.checkIn}
                          onChange={handleBookingChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Check-out Date</label>
                        <input 
                          type="date" 
                          name="checkOut"
                          value={bookingData.checkOut}
                          onChange={handleBookingChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Guests</label>
                        <input 
                          type="number" 
                          name="guests"
                          value={bookingData.guests}
                          onChange={handleBookingChange}
                          min="1"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Rooms</label>
                        <input 
                          type="number" 
                          name="rooms"
                          value={bookingData.rooms}
                          onChange={handleBookingChange}
                          min="1"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={bookingData.name}
                        onChange={handleBookingChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={bookingData.email}
                          onChange={handleBookingChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleBookingChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-blue-600">
                        Total: ₹{selectedHotel.price ? parseInt(selectedHotel.price) * bookingData.rooms : 2500 * bookingData.rooms}
                      </p>
                      <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
