// src/routes/AppRouteConfig.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import Placements from "../Features/Placements";
import TeamList from "../Features/TeamList";
import { UIExamples } from "../components/ui/Examples/UIExamples";
import SupportForm from "../Features/SupportForm";
import SampleForm from "../Features/SampleForm";
import DynamicFormGenerator from "../components/FormContainer/DynamicFormGenerator";

import HotList from "../Features/HotList/HotList";
import HotListForm from "../Features/HotList/CreateHotListUser";
import HotListContainer from "../Features/HotList/HotListContainer";
import ConsultantProfile from "../Features/HotList/ConsultantProfile";

import Login from "../components/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

const AppRouteConfig = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/layout" element={<Layout />}>
          <Route path="profile" element={<Profile />} />
          <Route index element={<Navigate to="home" />} />
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
      </Route>
    </Routes>
  );
};

export default AppRouteConfig;
