import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import Ticket from "./pages/Ticket";
import Category from "./pages/Category";
import Description from "./pages/Description";
import Lokasi from "./pages/Lokasi";
// import { WebSocketProvider } from "./components/WebSocketProvider";
import ProtectAuth from "./components/ProtectAuth";
import Activity from "./pages/Activity";
import LotAvailability from "./pages/LotAvailability";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import ModalAddTicketManual from "./components/modal/ModalAddTicketManual";
import DetailLocation from "./pages/DetailLocation";
import { CategoryProvider } from "./contexts/Category";
import { ObjectProvider } from "./contexts/Object";

function App() {
  return (
    <div className="App">
      <WebSocketProvider>
        <CategoryProvider>
          <ObjectProvider>
            <Router>
              <ModalAddTicketManual />

              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/lot-availability" element={<LotAvailability />} />

                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectAuth>
                      <DashboardLayout />
                    </ProtectAuth>
                  }
                >
                  <Route path="" element={<Dashboard />} />
                  <Route path="ticket" element={<Ticket />} />
                  <Route
                    path="master/category"
                    element={
                      <CategoryProvider>
                        <Category />
                      </CategoryProvider>
                    }
                  />
                  <Route path="master/object" element={<Description />} />
                  <Route path="lokasi" element={<Lokasi />} />
                  <Route
                    path="lokasi/detail/:id"
                    element={<DetailLocation />}
                  />
                  <Route path="activity" element={<Activity />} />
                </Route>
              </Routes>
            </Router>
          </ObjectProvider>
        </CategoryProvider>
      </WebSocketProvider>
    </div>
  );
}

export default App;
