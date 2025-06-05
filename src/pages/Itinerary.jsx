import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Polyline, Popup, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Trash2, Calendar, Clock, Car, Cloud, ChevronDown, ChevronUp } from "lucide-react";
import L from 'leaflet';

const { BaseLayer } = LayersControl;
const API_KEY = "5b3ce3597851110001cf6248641adf9be58c4b2c835044401ee6445d";

// Custom marker icons
const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const endIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const stopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const poiIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


const ItineraryPlanner = () => {
  // Add new state variables
  const [tripPlan, setTripPlan] = useState(null);
  const [planDate, setPlanDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState("08:00");
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [showSavedTrips, setShowSavedTrips] = useState(true);

  // Existing state variables
  const [locations, setLocations] = useState(["", ""]);
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null); // Add warning state
  const [coords, setCoords] = useState([]);
  const [travelTime, setTravelTime] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  // Add a new state for detailed weather
  const [detailedWeather, setDetailedWeather] = useState(null);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [showPOI, setShowPOI] = useState(false);
  const [travelMode, setTravelMode] = useState("driving-car"); // Options: driving-car, cycling, foot
  const [mapZoom, setMapZoom] = useState(7);
  const [setMap] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedTrips")) || [];
    setSavedTrips(saved);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleLocationChange = (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

  const addStop = () => setLocations([...locations, ""]);

  const removeStop = (index) => {
    if (locations.length > 2) {
      setLocations(locations.filter((_, i) => i !== index));
    }
  };

  const saveTrip = () => {
    const newTrip = {
      locations,
      route,
      tripPlan,
      planDate,
      startTime,
      travelTime
    };
    const newTrips = [...savedTrips, newTrip];
    setSavedTrips(newTrips);
    localStorage.setItem("savedTrips", JSON.stringify(newTrips));
  };

  const loadTrip = (trip) => {
    setLocations(trip.locations);
    setRoute(trip.route);
    setTripPlan(trip.tripPlan);
    setPlanDate(trip.planDate || new Date().toISOString().split('T')[0]);
    setStartTime(trip.startTime || "08:00");
    setTravelTime(trip.travelTime);
    setShowPlanDetails(true);
  };

  const findRoute = async () => {
    if (locations.some(loc => !loc)) {
      alert("Please enter all locations.");
      return;
    }

    try {
      setError(null);
      setShowPlanDetails(true);

      // Get coordinates for all locations
      const coordinates = await Promise.all(
        locations.map(async (location) => {
          try {
            return await getCoordinates(location);
          } catch (err) {
            console.error(`Error getting coordinates for ${location}:`, err);
            return null;
          }
        })
      );

      // Check if any location couldn't be found
      if (coordinates.includes(null)) {
        setError("One or more locations couldn't be found. Please check the spelling and try again.");
        return;
      }

      // Check if any location might not be near a road
      const locationsWithoutRoads = coordinates
        .map((coord, index) => ({ coord, index }))
        .filter(item => item.coord && item.coord.hasRoad === false)
        .map(item => locations[item.index]);

      if (locationsWithoutRoads.length > 0) {
        // Warn the user about possible routing issues and continue with the routing attempt
        console.warn(`Warning: The following locations may not be near roads: ${locationsWithoutRoads.join(", ")}`);
        setWarning(`Warning: The following locations may not be near roads: ${locationsWithoutRoads.join(", ")}. ` +
                  `This might cause routing issues. Try selecting locations closer to main roads.`);
      } else {
        setWarning(null); // Clear any previous warnings
      }

      setCoords(coordinates);

      // Make the API request with proper error handling
      try {
        const response = await axios.post(
          `https://api.openrouteservice.org/v2/directions/${travelMode}/geojson`,
          {
            coordinates: coordinates.map(({ lon, lat }) => [lon, lat])
          },
          {
            headers: {
              Authorization: API_KEY,
              "Content-Type": "application/json"
            }
          }
        );

        // Check if we have valid route data
        if (!response.data || !response.data.features || response.data.features.length === 0) {
          setError("No route found between these locations. Try locations that are closer together.");
          return;
        }

        const routeData = response.data.features[0];
        setRoute(routeData.geometry.coordinates.map(([lon, lat]) => [lat, lon]));

        // Extract segment durations and distances
        const segments = routeData.properties.segments;
        const totalDuration = routeData.properties.summary.duration / 60; // minutes
        setTravelTime(totalDuration);

        // Generate detailed trip plan
        const plan = generateTripPlan(segments, totalDuration, coordinates);
        setTripPlan(plan);

        fetchWeatherForLocations(coordinates);

      } catch (err) {
        console.error("OpenRouteService API error:", err);

        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (err.response.status === 403 || err.response.status === 401) {
            setError("API key error. Please check your OpenRouteService API key.");
          } else if (err.response.status === 413) {
            setError("Too many locations. Try planning a shorter route.");
          } else if (err.response.status === 429) {
            setError("Too many requests. Please try again later.");
          } else if (err.response.status === 404 && err.response.data.error?.message?.includes("Could not find routable point")) {
            // Handle the specific case of no routable point found
            const errorMsg = err.response.data.error?.message;
            const coordMatch = errorMsg.match(/coordinate (\d+): ([\d.]+) ([\d.]+)/);

            if (coordMatch) {
              const coordIndex = parseInt(coordMatch[1]);
              const locationName = locations[coordIndex] || `location ${coordIndex+1}`;

              setError(
                `Could not find a road or path near ${locationName}. ` +
                `Try selecting a location closer to a main road or a more specific address. ` +
                `(The system searched within 350 meters of the location but couldn't find a routable point.)`
              );
            } else {
              setError(`Could not find a routable point for one of your locations. Try selecting locations closer to roads or more specific addresses.`);
            }
          } else {
            setError(`Server error (${err.response.status}): ${err.response.data.error?.message || "Unknown error"}`);
          }
        } else if (err.request) {
          // The request was made but no response was received
          setError("No response from route service. Check your internet connection.");
        } else {
          // Something happened in setting up the request
          setError(`Error: ${err.message}`);
        }
      }
    } catch (err) {
      console.error("General error in findRoute:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const fetchWeatherForLocations = async (coords) => {
    try {
      const responses = await Promise.all(
        coords.map(({ lat, lon }) =>
          axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        )
      );
      setWeatherData(responses.map(res => res.data.current_weather));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData([]);
    }
  };

  const getCoordinates = async (place) => {
    if (!place || place.trim() === "") {
      return null;
    }

    // Helper to fetch coordinates
    const fetchCoords = async (query) => {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: `${query}, India`,
            format: "json",
            limit: 1,
            addressdetails: 1,
            countrycodes: "in"
          },
          headers: {
            "User-Agent": "TravelPlanner/1.0"
          }
        }
      );
      if (!response.data || response.data.length === 0) return null;
      const result = response.data[0];
      const hasRoad = result.address &&
        (result.address.road || result.address.street || result.address.highway || result.address.path);
      return {
        lat: +result.lat,
        lon: +result.lon,
        display_name: result.display_name,
        hasRoad: hasRoad
      };
    };

    // 1st attempt: as entered
    let coords = await fetchCoords(place);
    if (coords && coords.hasRoad) return coords;

    // 2nd attempt: append 'bus stand'
    coords = await fetchCoords(`${place} bus stand`);
    if (coords && coords.hasRoad) return coords;

    // 3rd attempt: append 'railway station'
    coords = await fetchCoords(`${place} railway station`);
    if (coords && coords.hasRoad) return coords;

    // 4th attempt: just take the first result even if not near a road
    coords = await fetchCoords(place);
    return coords;
  };

  const deleteTrip = (indexToDelete) => {
    const updatedTrips = savedTrips.filter((_, index) => index !== indexToDelete);
    setSavedTrips(updatedTrips);
    localStorage.setItem("savedTrips", JSON.stringify(updatedTrips));
  };

  // New function to generate a detailed trip plan
  const generateTripPlan = (segments, totalDuration, coordinates) => {
    // Parse start time
    const [hours, minutes] = startTime.split(':').map(Number);
    let currentTime = new Date();
    currentTime.setHours(hours, minutes, 0);

    const plan = [];

    // Add start point
    plan.push({
      type: "start",
      location: locations[0],
      time: formatTime(currentTime),
      weather: null,
      coordinates: coordinates[0]
    });

    // Process each segment
    segments.forEach((segment, index) => {
      // Add travel segment
      const segmentDuration = segment.duration / 60; // minutes
      const segmentDistance = segment.distance / 1000; // km

      // Update time after travel
      currentTime = new Date(currentTime.getTime() + segmentDuration * 60000);

      // Add stop
      plan.push({
        type: "travel",
        from: locations[index],
        to: locations[index + 1],
        duration: segmentDuration,
        distance: segmentDistance,
        arrivalTime: formatTime(currentTime)
      });

      // Add 30 min break at intermediate stops (not at final destination)
      if (index < segments.length - 1) {
        currentTime = new Date(currentTime.getTime() + 30 * 60000); // 30 min break

        plan.push({
          type: "stop",
          location: locations[index + 1],
          duration: 30,
          departureTime: formatTime(currentTime),
          coordinates: coordinates[index + 1]
        });
      } else {
        // Final destination
        plan.push({
          type: "destination",
          location: locations[index + 1],
          arrivalTime: formatTime(currentTime),
          coordinates: coordinates[index + 1]
        });
      }
    });

    return plan;
  };

  // Helper function to format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Add this function to fetch detailed weather
  const fetchDetailedWeather = async (lat, lon, location) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`
      );
      setDetailedWeather({
        location,
        data: response.data
      });
    } catch (error) {
      console.error("Error fetching detailed weather:", error);
    }
  };

  const resetForm = () => {
    setLocations(["", ""]);
    setRoute(null);
    setError(null);
    setWarning(null); // Clear any warnings
    setCoords([]);
    setTravelTime(null);
    setWeatherData([]);
    setDetailedWeather(null);
    setTripPlan(null);
    setShowPlanDetails(false);
    setPlanDate(new Date().toISOString().split('T')[0]);
    setStartTime("08:00");
  };

  // (Removed unused calculateTripCost function)

  const findPointsOfInterest = async () => {
    if (!route.length) return;

    // Sample points along the route
    const samplePoints = [];
    route.forEach(segment => {
      if (segment.steps && segment.steps.length > 0) {
        // Sample every 10th point to avoid too many API calls
        for (let i = 0; i < segment.steps.length; i += 10) {
          const point = segment.steps[i];
          if (point && point.lat && point.lon) {
            samplePoints.push([point.lat, point.lon]);
          }
        }
      }
    });

    // For each sample point, find nearby POIs
    const poiPromises = samplePoints.slice(0, 5).map(([lat, lon]) =>
      axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&kinds=interesting_places&format=json&apikey=YOUR_API_KEY`)
    );

    try {
      const responses = await Promise.all(poiPromises);
      const allPOIs = responses.flatMap(res => res.data.features || [])
        .filter((poi, index, self) =>
          index === self.findIndex(p => p.properties.xid === poi.properties.xid)
        )
        .slice(0, 10);

      setPointsOfInterest(allPOIs);
    } catch (error) {
      console.error("Error finding points of interest:", error);
    }
  };

  // Add this function
  const exportItinerary  = () => {
    if (!tripPlan) return;

    const title = `Trip from ${locations[0]} to ${locations[locations.length-1]}`;
    let content = `${title}\nDate: ${new Date(planDate).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}\n\n`;

    tripPlan.forEach(item => {
      if (item.type === "start") {
        content += `${item.time} - Start from ${item.location}\n`;
      } else if (item.type === "travel") {
        content += `Travel from ${item.from} to ${item.to}\n`;
        content += `  Distance: ${Math.round(item.distance * 10) / 10} km\n`;
        content += `  Duration: ${Math.round(item.duration)} min\n`;
        content += `  Arrive at: ${item.arrivalTime}\n`;
      } else if (item.type === "stop") {
        content += `30 min break at ${item.location}\n`;
        content += `  Depart at: ${item.departureTime}\n`;
      } else if (item.type === "destination") {
        content += `${item.arrivalTime} - Arrive at ${item.location}\n`;
      }
    });

    content += `\nTotal travel time: ${Math.floor(travelTime/60)}h ${Math.round(travelTime%60)}m\n`;

    // Create file and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Left column - Input form */}
        <div className="lg:col-span-4">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-xl w-full mb-6 border border-gray-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg md:text-2xl font-bold text-indigo-800 mb-4 border-b pb-2 flex items-center">
              <Calendar className="mr-2 text-indigo-600" size={20} />
              Trip Plan for {new Date(planDate).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}
            </h2>

            {locations.map((location, index) => (
              <div key={index} className="relative mb-4">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => handleLocationChange(index, e.target.value)}
                  placeholder={
                    index === 0
                      ? "Start Point"
                      : index === locations.length - 1
                        ? "Destination"
                        : "Add Stop"
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                {index > 0 && index < locations.length - 1 && (
                  <button
                    onClick={() => removeStop(index)}
                    className="absolute right-3 top-3 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={planDate}
                  onChange={(e) => setPlanDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Mode</label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setTravelMode("driving-car")}
                  className={`p-2 rounded-lg flex items-center justify-center ${
                    travelMode === "driving-car"
                      ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700"
                      : "bg-gray-100 border border-gray-300 text-gray-700"
                  }`}
                >
                  <Car size={18} className="mr-1" /> Car
                </button>
                <button
                  onClick={() => setTravelMode("cycling-regular")}
                  className={`p-2 rounded-lg flex items-center justify-center ${
                    travelMode === "cycling-regular"
                      ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700"
                      : "bg-gray-100 border border-gray-300 text-gray-700"
                  }`}
                >
                  🚲 Cycle
                </button>
                <button
                  onClick={() => setTravelMode("driving-motorcycle")}
                  className={`p-2 rounded-lg flex items-center justify-center ${
                    travelMode === "driving-motorcycle"
                      ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700"
                      : "bg-gray-100 border border-gray-300 text-gray-700"
                  }`}
                >
                  🏍️ Bike
                </button>
                <button
                  onClick={() => setTravelMode("foot-walking")}
                  className={`p-2 rounded-lg flex items-center justify-center ${
                    travelMode === "foot-walking"
                      ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700"
                      : "bg-gray-100 border border-gray-300 text-gray-700"
                  }`}
                >
                  👣 Walk
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={addStop}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <span className="mr-1">+</span> Add Stop
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={findRoute}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  Plan Trip
                </button>
                <button
                  onClick={saveTrip}
                  className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  Save Trip
                </button>
              </div>
            </div>
          </motion.div>

          {/* Saved trips section */}
          {savedTrips.length > 0 && (
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-full border border-gray-100"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h3 className="text-xl font-bold text-indigo-800">Saved Trips</h3>
                <button
                  onClick={() => setShowSavedTrips(!showSavedTrips)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {showSavedTrips ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {showSavedTrips && (
                <div className="space-y-3">
                  {savedTrips.map((trip, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">{trip.locations[0]} to {trip.locations[trip.locations.length - 1]}</p>
                          <p className="text-sm text-gray-600">{trip.locations.length} stops • {Math.round(trip.travelTime)} min</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => loadTrip(trip)}
                            className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors text-sm shadow-sm flex items-center justify-center"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteTrip(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm shadow-sm flex items-center justify-center"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Right column - Trip details and map */}
        <div className="lg:col-span-8 space-y-6">
          {/* Trip plan details */}
          {showPlanDetails && tripPlan && (
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-full border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg md:text-2xl font-bold text-indigo-800 mb-4 border-b pb-2 flex items-center">
                <Calendar className="mr-2 text-indigo-600" size={20} />
                Trip Plan for {new Date(planDate).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}
              </h2>

              <div className="space-y-3 md:space-y-4">
                {tripPlan.map((item, index) => (
                  <div key={index} className="border-l-2 border-indigo-300 pl-4 py-2 relative">
                    {item.type === "start" && (
                      <div className="flex items-center">
                        <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[9px] ring-2 ring-white"></div>
                        <div className="font-semibold text-green-700">{item.time} - Start from {item.location}</div>
                      </div>
                    )}

                    {item.type === "travel" && (
                      <div className="flex items-center">
                        <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[9px] ring-2 ring-white"></div>
                        <div>
                          <div className="font-medium text-indigo-700 flex items-center">
                            {travelMode === "driving-car" && <Car size={16} className="mr-1" />}
                            {travelMode === "cycling-regular" && <span className="mr-1">🚲</span>}
                            {travelMode === "driving-motorcycle" && <span className="mr-1">🏍️</span>}
                            {travelMode === "foot-walking" && <span className="mr-1">👣</span>}
                            Travel from {item.from} to {item.to}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 mt-1">
                            <div>Distance: {Math.round(item.distance * 10) / 10} km</div>
                            <div>Duration: {Math.round(item.duration)} min</div>
                            <div>Arrive at: {item.arrivalTime}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.type === "stop" && (
                      <div className="flex items-center">
                        <div className="absolute w-4 h-4 bg-amber-500 rounded-full -left-[9px] ring-2 ring-white"></div>
                        <div>
                          <span className="font-medium text-amber-700">30 min break at {item.location}</span>
                          <div className="text-sm text-gray-600">Depart at {item.departureTime}</div>
                        </div>
                      </div>
                    )}

                    {item.type === "destination" && (
                      <div className="flex items-center">
                        <div className="absolute w-4 h-4 bg-red-500 rounded-full -left-[9px] ring-2 ring-white"></div>
                        <div className="font-semibold text-red-700">
                          {item.arrivalTime} - Arrive at {item.location}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 pt-4 border-t flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                  <Clock className="mr-2 text-indigo-600" size={16} />
                  <span className="font-medium text-gray-800 text-sm md:text-base">
                    Total travel time: {Math.floor(travelTime/60)}h {Math.round(travelTime%60)}m
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={exportItinerary}
                    className="text-xs md:text-sm text-green-700 hover:text-green-900 font-medium border border-green-200 bg-green-50 px-2 md:px-3 py-2 rounded transition-colors"
                  >
                    Export Itinerary
                  </button>
                  <button
                    onClick={() => setShowPlanDetails(false)}
                    className="text-xs md:text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Hide Details
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Weather information */}
          {weatherData.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-xl w-full border border-gray-100">
              <h3 className="text-lg font-bold text-indigo-800 mb-4 border-b pb-2 flex items-center">
                <Cloud className="mr-2 text-indigo-600" size={20} />
                Weather at Stops
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weatherData.map((weather, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-medium text-gray-800">{locations[index]}: {weather.temperature}°C</p>
                    <button
                      onClick={() => fetchDetailedWeather(coords[index].lat, coords[index].lon, locations[index])}
                      className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors text-sm shadow-sm"
                    >
                      Detailed Report
                    </button>
                  </div>
                ))}
              </div>

              {detailedWeather && (
                <motion.div
                  className="mt-6 p-5 bg-indigo-50 rounded-lg border border-indigo-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-bold mb-3 text-indigo-800">{detailedWeather.location} - Detailed Forecast</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Current</p>
                      <p className="text-2xl font-bold text-indigo-700">{detailedWeather.data.current_weather.temperature}°C</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Temperature Range</p>
                      <p className="text-2xl font-bold text-indigo-700">{Math.round(detailedWeather.data.daily.temperature_2m_min[0])}°C - {Math.round(detailedWeather.data.daily.temperature_2m_max[0])}°C</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Precipitation</p>
                      <p className="text-2xl font-bold text-indigo-700">{detailedWeather.data.daily.precipitation_sum[0]} mm</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDetailedWeather(null)}
                    className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Hide Details
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Map */}
          {coords.length > 1 && (
            <div className="w-full rounded-xl overflow-hidden shadow-xl border border-gray-200">
              <div className="bg-white p-3 border-b flex justify-between items-center">
                <h3 className="font-bold text-indigo-800">Interactive Route Map</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                    className="p-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setMapZoom(prev => Math.max(prev - 1, 5))}
                    className="p-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setShowPOI(!showPOI)}
                    className={`px-2 py-1 rounded text-sm ${showPOI ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Points of Interest
                  </button>
                </div>
              </div>
              <div className="h-96">
                <MapContainer
                  center={[coords[0].lat, coords[0].lon]}
                  zoom={mapZoom || 7}
                  className="w-full h-full"
                  whenCreated={setMap}
                >
                  <LayersControl position="topright">
                    <BaseLayer checked name="Street View">
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </BaseLayer>
                    <BaseLayer name="Satellite View">
                      <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
                    </BaseLayer>
                  </LayersControl>

                  {coords.map((c, i) => (
                    <Marker
                      key={i}
                      position={[c.lat, c.lon]}
                      icon={i === 0 ? startIcon : i === coords.length - 1 ? endIcon : stopIcon}
                    >
                      <Popup>
                        <div className="font-medium">{locations[i]}</div>
                        {weatherData[i] && (
                          <div className="text-sm mt-1">
                            {weatherData[i].temperature}°C, {weatherData[i].description}
                          </div>
                        )}
                      </Popup>
                    </Marker>
                  ))}

                  {route && <Polyline positions={route} color="#4f46e5" weight={5} />}

                  {showPOI && pointsOfInterest.map((poi, i) => (
                    <Marker
                      key={`poi-${i}`}
                      position={[poi.geometry.coordinates[1], poi.geometry.coordinates[0]]}
                      icon={poiIcon}
                    >
                      <Popup>
                        <div className="font-medium">{poi.properties.name}</div>
                        <div className="text-sm">{poi.properties.kinds.replace(',', ', ')}</div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {warning && !error && (
            <div className="p-4 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
              {warning}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;
