import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";

// Lazy Load Components for Performance Optimization
const Main = lazy(() => import("./components/Dashboard/Main"));
const Login = lazy(() => import("./components/Login/Login"));
const Results = lazy(() => import("./components/Dashboard/Results"));
const FirstPage = lazy(() => import("./components/FirstPage/FirstPage"));
const SubjectWiseAttendance = lazy(() => import("./components/Dashboard/SubjectWiseAttendance"));
const OverallAttendance = lazy(() => import("./components/Dashboard/OverallAttendance"));

// Loading Spinner Component
const Loading = () => (
  <Center h="100vh">
    <Spinner size="xl" color="blue.500" />
  </Center>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<FirstPage />} />
          <Route path="/dashboard" element={<Main />} />
          <Route path="/subjectwise" element={<SubjectWiseAttendance />} />
          <Route path="/overall" element={<OverallAttendance />} />
          <Route path="/results" element={<Results />} />
          
          {/* Redirect unknown routes to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
