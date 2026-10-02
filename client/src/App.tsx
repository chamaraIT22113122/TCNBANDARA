
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AiProject from './pages/projects/AiProject';
import BloodProject from './pages/projects/BloodProject';
import ExampleProject from './pages/projects/ExampleProject';
import FlayersProject from './pages/projects/FlayersProject';
import LogoProject from './pages/projects/LogoProject';
import MlProject from './pages/projects/MlProject';
import ObsProject from './pages/projects/ObsProject';
import SiProject from './pages/projects/SiProject';
import SlcProject from './pages/projects/SlcProject';
import SmProject from './pages/projects/SmProject';
import SocialmProject from './pages/projects/SocialmProject';
import SpuiProject from './pages/projects/SpuiProject';
import TodoProject from './pages/projects/TodoProject';
import TshirtProject from './pages/projects/TshirtProject';
import UidashProject from './pages/projects/UidashProject';
import VdgProject from './pages/projects/VdgProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projects/ai.html" element={<AiProject />} />
        <Route path="/projects/blood.html" element={<BloodProject />} />
        <Route path="/projects/example.html" element={<ExampleProject />} />
        <Route path="/projects/flayers.html" element={<FlayersProject />} />
        <Route path="/projects/logo.html" element={<LogoProject />} />
        <Route path="/projects/ml.html" element={<MlProject />} />
        <Route path="/projects/obs.html" element={<ObsProject />} />
        <Route path="/projects/si.html" element={<SiProject />} />
        <Route path="/projects/slc.html" element={<SlcProject />} />
        <Route path="/projects/sm.html" element={<SmProject />} />
        <Route path="/projects/socialm.html" element={<SocialmProject />} />
        <Route path="/projects/spui.html" element={<SpuiProject />} />
        <Route path="/projects/todo.html" element={<TodoProject />} />
        <Route path="/projects/tshirt.html" element={<TshirtProject />} />
        <Route path="/projects/uidash.html" element={<UidashProject />} />
        <Route path="/projects/vdg.html" element={<VdgProject />} />
      </Routes>
    </Router>
  );
}

export default App;
