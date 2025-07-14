import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { CustomThemeProvider } from "./contexts/ThemeContext";
import { UIProvider } from "./components/ui/Providers/UIProvider";
import { UIExamples } from "./components/ui/Examples/UIExamples";
import Placements from "./Features/Placements";
import SampleForm from "./Features/SampleForm";
import SupportForm from "./Features/SupportForm";
import DynamicFormGenerator from "./components/FormContainer/DynamicFormGenerator";
import HotList from "./Features/HotList/HotList";
import HotListForm from "./Features/HotList/CreateHotListUser";
import HotListContainer from "./Features/HotList/HotListContainer";
import Home from "./pages/Home";
import TeamList from "./Features/TeamList";
import CustomToastContainer from "./components/ui/CustomToastContainer";
import ConsultantProfile from "./Features/HotList/ConsultantProfile";
import Login from "./components/auth/Login";

function App() {
  return (
    <CustomThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UIProvider>
          <Routes>
            <Route path="/layout" element={<Layout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="home" element={<Home />} />
              <Route path="placements" element={<Placements />} />
              <Route path="settings" element={<Settings />} />
              <Route path="teamlist" element={<TeamList />} />
              <Route path="ui-examples" element={<UIExamples />} />
              <Route path="sample-form" element={<DynamicFormGenerator />} />
              <Route path="support" element={<SupportForm />} />
              <Route path="hotlist" element={<HotListContainer />}>
                <Route index element={<HotList />} />
                <Route path="hostlistuser-form" element={<HotListForm />} />
                <Route path=":consultantId" element={<ConsultantProfile />} />
              </Route>
            </Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </UIProvider>
      </LocalizationProvider>
      <CustomToastContainer />
    </CustomThemeProvider>
  );
}

export default App;
