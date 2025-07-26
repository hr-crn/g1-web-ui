import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

<<<<<<< Updated upstream
import Scores from "./pages/dashboard/scores";
import { SignIn, SignUp } from "./pages/auth";
import LockModule from "./pages/dashboard/lock-module";
import ModuleProgress from "./pages/dashboard/module-progress";
=======
import Scores from "./pages/dashboard/view-scores";
import { SignIn, SignUp } from "./pages/auth";
import { LockModule } from "./pages/dashboard/lock-module";
import ModuleProgress from "./pages/dashboard/view-progress";
>>>>>>> Stashed changes
import AddSection from "./pages/dashboard/add-section";
import { Section } from "./pages/dashboard/section";
// Importing components from the pages directory.

// This "./" means current directory.

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/:quizSlug-score" element={<Scores />} />
      <Route path="/lock-module/:sectionSlug" element={<LockModule />} />
<<<<<<< Updated upstream
      <Route path="/module-progress/:moduleSlug" element={<ModuleProgress />} />
=======
      <Route path="/module-progress/:progressSlug" element={<ModuleProgress />} />
>>>>>>> Stashed changes
      <Route path="/section" element={<Section />} />
      <Route path="/add-section" element={<AddSection />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
