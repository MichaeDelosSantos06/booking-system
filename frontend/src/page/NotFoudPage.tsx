import { ArrowLeft, SearchX } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    if (!user) {
      navigate("/");
      return;
    }

    if (user.role === "Admin") {
      navigate("/dashboard");
    } else {
      navigate("/member-dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="text-center">
        <SearchX className="mx-auto mb-6 h-16 w-16 text-red-500" />

        <p className="text-7xl font-bold text-white">404</p>

        <h1 className="mt-4 text-2xl font-semibold text-white">
          Page Not Found
        </h1>

        <p className="mt-2 text-slate-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <button
          type="button"
          onClick={handleGoBack}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
