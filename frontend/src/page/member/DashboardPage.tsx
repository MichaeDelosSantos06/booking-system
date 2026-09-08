import { Hand } from "lucide-react";
import MemberCards from "../../feature/member/components/MemberCards";
import { useAuth } from "../../hooks/useAuth";

const MemberDashboardPage = () => {
  const { user } = useAuth();

  return (
    <main className="m-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-950">
            Welcome back, {user?.name}
          </h1>

          <Hand size={23} strokeWidth={2} className="text-red-600" />
        </div>

        <p className="mt-1 text-sm font-medium text-gray-500">
          Here's what's coming up for you.
        </p>
      </div>

      {/* Statistics */}
      <MemberCards />

      {/* Dashboard content */}
      <section className="mt-8">
        <h1>Upcoming Classes</h1>
        <div>{/* make a 3 rectangular card list */}</div>

        <div></div>
      </section>
    </main>
  );
};

export default MemberDashboardPage;
