import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const raw = localStorage.getItem("user");
  if (!raw) return <Navigate to="/" replace />; // login

  try {
    const user = JSON.parse(raw);
    if (allowedRoles.length === 0) return children; // open if no roles specified
    if (allowedRoles.includes(user.role)) return children;
  } catch (e) { /* parse error fallthrough */ }

  return <Navigate to="/" replace />;
}
