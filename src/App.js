// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import TeamList from "./Features/TeamList";
import Placements from "./Features/Placements";
import SampleForm from "./Features/SampleForm";
import SupportForm from "./Features/SupportForm";
import DynamicFormGenerator from "./components/FormContainer/DynamicFormGenerator";
import HotList from "./Features/HotList/HotList";
import HotListForm from "./Features/HotList/CreateHotListUser";
import HotListContainer from "./Features/HotList/HotListContainer";
import ConsultantProfile from "./Features/HotList/ConsultantProfile";
import { UIExamples } from "./components/ui/Examples/UIExamples";
import { UIProvider } from "./components/ui/Providers/UIProvider";
import { CustomThemeProvider } from "./contexts/ThemeContext";
import CustomToastContainer from "./components/ui/CustomToastContainer";
import Login from "./components/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UIProvider>
           
              <Routes>
                {/* Public route */}
                <Route path="/" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/layout" element={<Layout />}>
                    <Route index element={<Navigate to="home" />} />
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="teamlist" element={<TeamList />} />
                    <Route path="placements" element={<Placements />} />
                    <Route
                      path="sample-form"
                      element={<DynamicFormGenerator />}
                    />
                    <Route path="support" element={<SupportForm />} />
                    <Route path="ui-examples" element={<UIExamples />} />
                    <Route path="hotlist" element={<HotListContainer />}>
                      <Route index element={<HotList />} />
                      <Route
                        path="hostlistuser-form"
                        element={<HotListForm />}
                      />
                      <Route
                        path=":consultantId"
                        element={<ConsultantProfile />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Routes>
        
          </UIProvider>
        </LocalizationProvider>
        <CustomToastContainer />
      </CustomThemeProvider>
    </Provider>
  );
}

export default App;
