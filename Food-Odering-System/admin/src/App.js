import './App.css';
import Home from './Home/homePage';
import LoginPage from './Login Page/Login-Page';
import { BrowserRouter, Router, Route, Routes, Navigate } from "react-router-dom";
import Staff from './Staff/staffPage';
import Food from './Food/foodPage';
import Resources from './Resources/resourcesPage';
import Kitchen from './Kitchen/kitchenPage';
import Billing from './Billing/billingPage';

function App() {
  return (
    <div className="App">
      {/* <LoginPage /> */}
      {/* <Home/> */}
      {/* <Modal/> */}
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/food" element={<Food />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




