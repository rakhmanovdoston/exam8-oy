import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SelectedCryptos from "./components/SelectedCryptos";
import Header from "./components/Header";

function App() {
  return (
    <main className="w-full min-h-screen bg-[#14161A]">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selectedCrypto/:id" element={<SelectedCryptos />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
