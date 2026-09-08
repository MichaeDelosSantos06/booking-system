import {
  CalendarDays,
  ClipboardCheck,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

const MemberCards = () => {
  const cards = [
    {
      label: "Upcoming Classes",
      value: "02",
      description: "Classes scheduled",
      icon: CalendarDays,
    },
    {
      label: "Total Bookings",
      value: "12",
      description: "All-time bookings",
      icon: ClipboardCheck,
    },
    {
      label: "Completed",
      value: "08",
      description: "Classes completed",
      icon: CheckCircle2,
    },
    {
      label: "Membership",
      value: "Active",
      description: "Membership status",
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="
              group relative overflow-hidden
              rounded-2xl border border-gray-200
              bg-white p-5
              shadow-[0_4px_20px_rgba(0,0,0,0.04)]
              transition-all duration-300
              hover:-translate-y-1
              hover:border-red-200
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            "
          >
            {/* Decorative accent */}
            <div
              className="
                absolute -right-10 -top-10
                h-28 w-28 rounded-full
                bg-red-50
                transition-transform duration-500
                group-hover:scale-125
              "
            />

            <div className="relative flex items-start justify-between">
              {/* Icon */}
              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl bg-black text-white
                  transition-all duration-300
                  group-hover:bg-red-600
                "
              >
                <Icon size={21} strokeWidth={2} />
              </div>

              {/* Value */}
              <span
                className="
                  text-2xl font-bold tracking-tight
                  text-gray-900
                "
              >
                {card.value}
              </span>
            </div>

            {/* Card information */}
            <div className="relative mt-5">
              <h3 className="text-sm font-semibold text-gray-900">
                {card.label}
              </h3>

              <p className="mt-1 text-xs font-medium text-gray-400">
                {card.description}
              </p>
            </div>

            {/* Bottom red indicator */}
            <div
              className="
                absolute bottom-0 left-5 right-5
                h-0.5 scale-x-0
                bg-red-600
                transition-transform duration-300
                group-hover:scale-x-100
              "
            />
          </div>
        );
      })}
    </div>
  );
};

export default MemberCards;
