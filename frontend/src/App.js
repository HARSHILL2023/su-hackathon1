import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SchedulerDashboard from "./pages/SchedulerDashboard";
import DataEntry from "./pages/DataEntry";
import OwnerPortal from "./pages/OwnerPortal";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        } />
        <Route path="/scheduler" element={
          <ErrorBoundary>
            <Dashboard defaultTab="scheduler" />
          </ErrorBoundary>
        } />
        <Route path="/scheduler-v2" element={<SchedulerDashboard />} />
        <Route path="/fyp-optimizer" element={
          <ErrorBoundary>
            <Dashboard defaultTab="fyp" />
          </ErrorBoundary>
        } />
        <Route path="/entry" element={<DataEntry />} />
        <Route path="/owner" element={<OwnerPortal />} />
        <Route path="/govassist" element={
          <ErrorBoundary>
            <Dashboard defaultTab="govassist" />
          </ErrorBoundary>
        } />
      </Routes>
    </Router>
  );
}

export default App;