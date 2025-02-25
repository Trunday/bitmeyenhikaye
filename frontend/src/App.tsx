import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import AdminPage from "./pages/AdminPage";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin2" element={<AdminPanel />} />
        <Route path="/story/:id" element={<StoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
