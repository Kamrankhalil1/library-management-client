import { Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/public/NotFound";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Books from "./pages/books/Books";
import CreateBook from "./pages/books/CreateBook";
import EditBook from "./pages/books/EditBook";
import BorrowedBooks from "./pages/borrow/BorrowedBooks";
import AllBorrows from "./pages/borrow/AllBorrows";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/books"
          element={<Books />}
        />

        <Route
          path="/books/create"
          element={<CreateBook />}
        />

        <Route
          path="/books/edit/:id"
          element={<EditBook />}
        />

        <Route
          path="/borrowed"
          element={<BorrowedBooks />}
        />

        {/* Added route for All Borrows */}
        <Route
          path="/borrow-records"
          element={<AllBorrows />}
        />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;