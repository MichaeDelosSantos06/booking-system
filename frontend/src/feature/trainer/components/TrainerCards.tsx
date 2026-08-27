import {
  BriefcaseBusiness,
  Mail,
  Phone,
  Pencil,
  ShieldCheck,
} from "lucide-react";

import Button from "../../../components/ui/Button";
import type { TrainerCardProps } from "../../../types/trainer.type";

const TrainerCard = ({
  trainer,
  onEdit,
  deactivate,
  activate,
}: TrainerCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {trainer.map((item) => {
        const isActive = item.status === "Active";

        return (
          <div
            key={item.id}
            className={`
              group flex min-w-0 flex-col overflow-hidden rounded-xl border
              transition-all duration-300
              ${
                isActive
                  ? "border-gray-200 bg-white shadow-sm hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                  : "border-gray-300 bg-gray-200 shadow-none"
              }
            `}
          >
            {/* Header */}
            <div
              className={`
                border-b px-4 py-4
                ${isActive ? "border-gray-100" : "border-gray-300 bg-gray-200"}
              `}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`
                        flex h-11 w-11 items-center justify-center rounded-xl
                        text-base font-semibold transition-colors
                        ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : "bg-gray-300 text-gray-500"
                        }
                      `}
                    >
                      {item.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                    )}
                  </div>

                  {/* Name + Specialization */}
                  <div className="min-w-0">
                    <h3
                      className={`
                        truncate text-sm font-semibold
                        ${isActive ? "text-gray-900" : "text-gray-600"}
                      `}
                    >
                      {item.name}
                    </h3>

                    <span
                      className={`
                        mt-1 inline-flex max-w-full rounded-md px-1.5 py-0.5
                        text-[10px] font-medium uppercase tracking-wide
                        ${
                          isActive
                            ? "bg-gray-100 text-gray-500"
                            : "bg-gray-300 text-gray-500"
                        }
                      `}
                    >
                      <span className="truncate">{item.specialization}</span>
                    </span>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`
                    inline-flex shrink-0 items-center gap-1 rounded-full
                    px-2 py-1 text-[10px] font-semibold
                    ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-300 text-gray-600"
                    }
                  `}
                >
                  <span
                    className={`
                      h-1.5 w-1.5 rounded-full
                      ${isActive ? "bg-green-500" : "bg-gray-500"}
                    `}
                  />

                  {item.status}
                </span>
              </div>
            </div>

            {/* Details */}
            <div
              className={`
                flex flex-1 flex-col px-4 py-4
                ${isActive ? "bg-white" : "bg-gray-200"}
              `}
            >
              <div className="space-y-3">
                {/* Email */}
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-lg
                      ${
                        isActive
                          ? "bg-gray-50 text-gray-500"
                          : "bg-gray-300 text-gray-500"
                      }
                    `}
                  >
                    <Mail size={14} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                      Email
                    </p>

                    <p
                      className={`
                        truncate text-xs font-medium
                        ${isActive ? "text-gray-700" : "text-gray-600"}
                      `}
                    >
                      {item.email}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-lg
                      ${
                        isActive
                          ? "bg-gray-50 text-gray-500"
                          : "bg-gray-300 text-gray-500"
                      }
                    `}
                  >
                    <Phone size={14} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                      Contact
                    </p>

                    <p
                      className={`
                        text-xs font-medium
                        ${isActive ? "text-gray-700" : "text-gray-600"}
                      `}
                    >
                      {item.contact}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-lg
                      ${
                        isActive
                          ? "bg-gray-50 text-gray-500"
                          : "bg-gray-300 text-gray-500"
                      }
                    `}
                  >
                    <BriefcaseBusiness size={14} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                      Experience
                    </p>

                    <p
                      className={`
                        text-xs font-medium
                        ${isActive ? "text-gray-700" : "text-gray-600"}
                      `}
                    >
                      {item.experience}{" "}
                      {item.experience === 1 ? "year" : "years"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className={`
                border-t px-4 py-3
                ${
                  isActive
                    ? "border-gray-100 bg-gray-50/50"
                    : "border-gray-300 bg-gray-300/60"
                }
              `}
            >
              <div className="flex gap-2">
                {/* Edit */}
                <Button
                  onClick={() => onEdit(item)}
                  className={`
                    flex h-8 flex-1 items-center justify-center gap-1.5
                    rounded-lg border text-[11px] font-semibold shadow-none
                    transition-colors
                    ${
                      isActive
                        ? "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        : "border-gray-300 bg-gray-200 text-gray-500 hover:bg-gray-100"
                    }
                  `}
                >
                  <Pencil size={13} strokeWidth={2} />
                  Edit
                </Button>

                {/* Activate / Deactivate */}
                <Button
                  onClick={() => {
                    if (isActive) {
                      deactivate(item.id);
                    } else {
                      activate(item.id);
                    }
                  }}
                  aria-pressed={isActive}
                  className={`
                    flex h-8 flex-1 items-center justify-center gap-1.5
                    rounded-lg border text-[11px] font-semibold shadow-none
                    transition-colors
                    ${
                      isActive
                        ? "border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
                        : "border-green-200 bg-green-50 text-green-600 hover:border-green-300 hover:bg-green-100"
                    }
                  `}
                >
                  <ShieldCheck size={13} strokeWidth={2} />

                  {isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainerCard;
