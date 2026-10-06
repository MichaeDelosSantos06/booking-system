import { ShieldX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Forbidden = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate("/");
    return;
  }

  const handleGoBack = () => {
    if (user?.role === "Admin") {
      navigate("/dashboard");
    } else {
      navigate("/member-dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="text-center">
        <ShieldX className="mx-auto mb-6 h-16 w-16 text-red-500" />

        <p className="text-7xl font-bold text-white">403</p>

        <h1 className="mt-4 text-2xl font-semibold text-white">
          Access Denied
        </h1>

        <p className="mt-2 text-slate-400">
          You don't have permission to access this page.
        </p>

        <button
          type="button"
          onClick={handleGoBack}
          className="mt-6 rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
