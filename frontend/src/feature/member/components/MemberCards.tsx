import {
  CalendarDays,
  ClipboardCheck,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

import type { MemberCardDto } from "../../../types/booking.type";

const MemberCards = ({ statistics }: MemberCardDto) => {
  const cards = [
    {
      label: "Upcoming Classes",
      value: statistics.upcoming.toString(),
      description: "Classes scheduled",
      icon: CalendarDays,
    },
    {
      label: "Total Bookings",
      value: statistics.total.toString(),
      description: "All-time bookings",
      icon: ClipboardCheck,
    },
    {
      label: "Completed",
      value: statistics.completed.toString(),
      description: "Classes completed",
      icon: CheckCircle2,
    },
    {
      label: "Membership",
      value: statistics.membership.status,
      description: "Membership status",
      icon: BadgeCheck,
    },
  ];

  return (
    <div
      className="
        grid
        w-full
        grid-cols-2
        gap-3
        pb-4
        font-poppins
        xl:grid-cols-4
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="
              group
              flex
              w-full
              min-w-0
              flex-col
              gap-2
              rounded-xl
              bg-black/70
              p-3
              text-white
              transition-all
              duration-200
              hover:bg-black
              sm:p-4
            "
          >
            {/* Card Header */}
            <div className="flex min-w-0 items-center justify-between gap-2">
              <h2
                className="
                  min-w-0
                  truncate
                  text-xs
                  font-medium
                  text-gray-200
                  sm:text-sm
                "
              >
                {card.label}
              </h2>

              <Icon
                className="
                  h-[18px]
                  w-[18px]
                  shrink-0
                  text-gray-400
                  transition-colors
                  duration-200
                  group-hover:text-red-500
                  sm:h-5
                  sm:w-5
                "
                strokeWidth={1.7}
              />
            </div>

            {/* Main Value */}
            <h1
              className="
                truncate
                text-xl
                font-semibold
                tracking-tight
                text-white
                sm:text-2xl
              "
            >
              {card.value}
            </h1>

            {/* Bottom Text */}
            <p
              className="
                truncate
                text-[9px]
                text-gray-400
                sm:text-[11px]
              "
            >
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MemberCards;
