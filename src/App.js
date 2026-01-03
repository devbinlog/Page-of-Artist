import React from 'react';
import AppContent from './AppContent';
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
