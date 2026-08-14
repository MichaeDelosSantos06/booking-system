import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout, isInitializing } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async () => {
    await logout();
    navigate("/");
  };

  if (isInitializing) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {`Welcome ${user?.name}`}
      <Button onClick={onSubmit}>Logout</Button>
    </div>
  );
};

export default Dashboard;
