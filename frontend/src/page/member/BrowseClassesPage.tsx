import AvailableClasses from "../../feature/member/components/AvailableClasses";
import useFetchActiveClasses from "../../hooks/useFetchStatusClasses";
import SearchInput from "../../components/ui/SearchInput";
import { useNavigate } from "react-router-dom";

const BrowseClassesPage = () => {
  const { loading, classes } = useFetchActiveClasses("Active");
  console.log(classes);

  const navigate = useNavigate();

  const handleClick = (classId: number) => {
    const selectedClass = classes.find((item) => item.id === classId);

    if (!selectedClass) return;

    navigate("/view-schedule", {
      state: {
        schedules: selectedClass.schedules,
        classId: selectedClass.id,
        imageUrl: selectedClass.imageUrl,
        className: selectedClass.className,
        category: selectedClass.category,
        difficulty: selectedClass.difficulty,
        description: selectedClass.description,
        trainer: selectedClass.trainer.name,
        trainerId: selectedClass.trainerId,
        duration: selectedClass.duration,
      },
    });
  };

  return (
    <div className="m-12">
      {/* Page Header */}
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-red-600" />

          <h1 className="text-2xl font-bold tracking-tight text-gray-950">
            Browse Classes
          </h1>
        </div>

        <p className="mt-1.5 text-sm text-gray-500">
          Discover classes that match your fitness goals and book your next
          session.
        </p>
      </header>

      {/* Search & Filters */}
      <section
        className="
          mb-6 rounded-xl
          border border-gray-200
          bg-white
          p-3
          shadow-[0_1px_6px_rgba(0,0,0,0.04)]
        "
      >
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="min-w-0 flex-1">
            <SearchInput placeholder="Search classes, trainers..." />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              name="category"
              id="category"
              defaultValue=""
              className="
                h-9 w-full rounded-lg
                border border-gray-200
                bg-gray-50
                px-3
                text-xs font-medium text-gray-700
                outline-none
                transition-all
                hover:border-gray-300
                focus:border-red-500
                focus:bg-white
                focus:ring-2 focus:ring-red-100
                sm:w-40
              "
            >
              <option value="">All Categories</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Combat">Combat</option>
              <option value="GroupFitness">Group Fitness</option>
            </select>

            <select
              name="difficulty"
              id="difficulty"
              defaultValue=""
              className="
                h-9 w-full rounded-lg
                border border-gray-200
                bg-gray-50
                px-3
                text-xs font-medium text-gray-700
                outline-none
                transition-all
                hover:border-gray-300
                focus:border-red-500
                focus:bg-white
                focus:ring-2 focus:ring-red-100
                sm:w-32
              "
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advanced</option>
            </select>
          </div>
        </div>
      </section>

      {/* Classes */}
      <AvailableClasses
        classes={classes}
        isLoading={loading}
        viewSched={handleClick}
      />
    </div>
  );
};

export default BrowseClassesPage;
