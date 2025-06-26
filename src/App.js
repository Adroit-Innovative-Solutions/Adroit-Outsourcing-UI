// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { CustomThemeProvider } from "./contexts/ThemeContext";
import { UIProvider } from "./components/ui/Providers/UIProvider";
import { UIExamples } from "./components/ui/Examples/UIExamples";
import Placements from "./Features/Placements";
import FormComponentsDemo from "./components/ui/Form/FormComponentsDemo";
import SampleForm from "./Features/SampleForm";



function App() {
  return (
    <CustomThemeProvider>
      <UIProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="placements" element={<Placements />} />
            <Route path="settings" element={<Settings />} />
            <Route path="ui-examples" element={<UIExamples />} />
            <Route path="form-components" element={<FormComponentsDemo />} />
            <Route path="sample-form" element={<SampleForm />} />
          </Route>
        </Routes>
      </UIProvider>
    </CustomThemeProvider>
  );
}

export default App;
