import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import AdminPage from "./pages/AdminPage"; // Sayfayı içe aktar

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Admin Paneli */}
        <Route path="/story/:id" element={<StoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
