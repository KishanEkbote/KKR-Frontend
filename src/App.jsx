import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Itinerary from './pages/Itinerary';
import BlogPage from './pages/BlogPage';
import Hotels from './pages/Hotels';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Navbar from './components/Navbar';
import UserDashboard from './pages/UserDashboard';
import KalaburagiPage from './pages/KalaburagiPage';
import KoppalPage from './pages/KoppalPage';
import YadgirPage from './pages/YadgirPage';
import BidarPage from './pages/BidarPage';
import RaichurPage from './pages/RaichurPage';
import BellariPage from './pages/BellariPage';
import ChatBot from './components/ChatBot.jsx';
import KalyanKarnatakaRegion from './pages/KKR_Region.jsx';
import Events from './pages/Events';
import AdminDashboard from "./pages/AdminDash.jsx";
import Places from './pages/Places';
import LandingPage from './pages/LandingPage.jsx';
import EventDetails from './pages/EventDetails';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/klb" element={<KalaburagiPage />} />
        <Route path="/koppal" element={<KoppalPage />} />
        <Route path="/yadgir" element={<YadgirPage />} />
        <Route path="/bidar" element={<BidarPage />} />
        <Route path="/ballari" element={<BellariPage />} />
        <Route path="/raichur" element={<RaichurPage />} />
        <Route path="/kkr-region" element={<KalyanKarnatakaRegion />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/places" element={<Places />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;











