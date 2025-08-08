import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useMaterialTailwindController } from "@/context";

import Scores from "./pages/dashboard/view-scores";
import { SignIn, SignUp } from "./pages/auth";
import { LockModule } from "./pages/dashboard/lock-module";
import ModuleProgress from "./pages/dashboard/view-progress";
import AddSection from "./pages/dashboard/add-section";
import EditSection from "./pages/dashboard/edit-section";
import AddStudent from "./pages/dashboard/add-student";
import EditStudent from "./pages/dashboard/edit-student";
import { Section } from "./pages/dashboard/section";
// Importing components from the pages directory.

// This "./" means current directory.

function App() {
  const [controller] = useMaterialTailwindController();
  const { darkMode } = controller;

  useEffect(() => {
    // Apply dark mode class to document on mount and when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/:quizSlug-score" element={<Scores />} />
        <Route path="/lock-module/:sectionSlug" element={<LockModule />} />
        <Route path="/module-progress/:progressSlug" element={<ModuleProgress />} />
        <Route path="/section" element={<Section />} />
        <Route path="/add-section" element={<AddSection />} />
        <Route path="/edit-section/:sectionSlug" element={<EditSection />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:studentSlug" element={<EditStudent />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </div>
  );
}

export default App;
