import { Clock3, UserRound, ArrowRight, ImageOff } from "lucide-react";

import type { BrowseClassDto } from "../../../types/class.types";

export interface AvailableClassesProps {
  classes: BrowseClassDto["classes"];
  isLoading: boolean;
  viewSched: (classId: number) => void;
}

const ClassCardSkeleton = () => {
  return (
    <article
      className="
        overflow-hidden
        rounded-xl
        border border-gray-200
        bg-white
        shadow-[0_1px_5px_rgba(0,0,0,0.03)]
      "
    >
      {/* Image Skeleton */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 animate-pulse bg-gray-200" />

        {/* Category */}
        <div
          className="
            absolute left-3 top-3
            h-5 w-16
            animate-pulse
            rounded-full
            bg-gray-300
          "
        />

        {/* Difficulty */}
        <div
          className="
            absolute right-3 top-3
            h-5 w-20
            animate-pulse
            rounded-full
            bg-gray-300
          "
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-3.5">
        {/* Title */}
        <div className="h-3.5 w-32 animate-pulse rounded bg-gray-200" />

        {/* Description */}
        <div className="mt-2 space-y-1">
          <div className="h-2.5 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-2.5 w-3/4 animate-pulse rounded bg-gray-100" />
        </div>

        {/* Trainer + Duration */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />

            <div className="h-2.5 w-20 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="flex items-center gap-1">
            <Clock3 size={11} className="text-gray-200" />

            <div className="h-2.5 w-8 animate-pulse rounded bg-gray-100" />
          </div>
        </div>

        {/* Bottom Action */}
        <div
          className="
            mt-3
            flex items-center justify-between
            border-t border-gray-100
            pt-3
          "
        >
          <div className="h-4 w-14 animate-pulse rounded-full bg-gray-100" />

          <div className="h-5 w-12 animate-pulse rounded-md bg-gray-100" />
        </div>
      </div>
    </article>
  );
};

const AvailableClasses = ({
  isLoading,
  classes,
  viewSched,
}: AvailableClassesProps) => {
  /*
   * Loading State
   */
  if (isLoading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <ClassCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  /*
   * Empty State
   */
  if (classes.length === 0) {
    return (
      <div
        className="
          flex min-h-48
          items-center justify-center
          rounded-xl
          border border-gray-200
          bg-white
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              bg-gray-100
              text-gray-400
            "
          >
            <ImageOff size={16} strokeWidth={1.8} />
          </div>

          <h2 className="mt-3 text-sm font-semibold text-gray-900">
            No classes found
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Try adjusting your search or filters.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Classes
   */
  return (
    <div
      className="
        cursor-pointer
        grid
        grid-cols-1
        gap-3
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {classes.map((item) => (
        <article
          onClick={() => viewSched(item.id)}

          key={item.id}
          className="
            group
            overflow-hidden
            rounded-xl
            border border-gray-200
            bg-white
            shadow-[0_1px_5px_rgba(0,0,0,0.03)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-gray-300
            hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
          "
        >
          {/* ========================================
              CLASS IMAGE
          ======================================== */}
          <div
            className="
              relative
              h-52
              overflow-hidden
              bg-gray-100
            "
          >
            {item.imageUrl ? (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.className}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

                {/* Image Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/25
                    via-transparent
                    to-transparent
                  "
                />
              </>
            ) : (
              <div
                className="
                  flex h-full w-full
                  flex-col
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-gray-100
                  via-gray-50
                  to-gray-100
                  text-gray-400
                "
              >
                <div
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-lg
                    bg-white
                    shadow-sm
                  "
                >
                  <ImageOff size={16} strokeWidth={1.8} />
                </div>

                <span className="mt-1.5 text-[9px] font-medium">
                  No image available
                </span>
              </div>
            )}

            {/* Category */}
            <span
              className="
                absolute left-3 top-3
                rounded-full
                bg-black/80
                px-2.5 py-1
                text-[9px]
                font-semibold
                text-white
                backdrop-blur-sm
              "
            >
              {item.category}
            </span>

            {/* Difficulty */}
            <span
              className="
                absolute right-3 top-3
                rounded-full
                bg-white/95
                px-2.5 py-1
                text-[9px]
                font-semibold
                text-gray-700
                shadow-sm
              "
            >
              {item.difficulty}
            </span>
          </div>

          {/* ========================================
              CARD CONTENT
          ======================================== */}
          <div className="p-3.5">
            {/* Class Name */}
            <h2
              className="
                truncate
                text-[13px]
                font-bold
                tracking-tight
                text-gray-950
              "
            >
              {item.className}
            </h2>

            {/* Description */}
            <p
              className="
                mt-1
                line-clamp-2
                text-[10px]
                leading-4
                text-gray-500
              "
            >
              {item.description}
            </p>

            {/* ========================================
                TRAINER + DURATION
            ======================================== */}
            <div className="mt-3 flex items-center justify-between">
              {/* Trainer */}
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-1.5
                "
              >
                <div
                  className="
                    flex
                    h-6 w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-500
                  "
                >
                  <UserRound size={11} strokeWidth={2} />
                </div>

                <span
                  className="
                    truncate
                    text-[10px]
                    font-medium
                    text-gray-700
                  "
                >
                  {item.trainer.name}
                </span>
              </div>

              {/* Duration */}
              <div
                className="
                  ml-2
                  flex
                  shrink-0
                  items-center
                  gap-1
                  text-gray-400
                "
              >
                <Clock3 size={11} strokeWidth={2} />

                <span className="text-[10px] font-medium">
                  {item.duration}m
                </span>
              </div>
            </div>

            {/* ========================================
                FOOTER / ACTION
            ======================================== */}
            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                border-t
                border-gray-100
                pt-3
              "
            >
              {/* Difficulty */}
              <span
                className="
                  rounded-full
                  bg-gray-100
                  px-2 py-0.5
                  text-[9px]
                  font-semibold
                  text-gray-600
                "
              >
                {item.difficulty}
              </span>

              {/* Book Button */}
              <button
                onClick={() => viewSched(item.id)}
                type="button"
                className="
                    cursor-pointer
                  flex
                  items-center
                  gap-1
                  rounded-md
                  px-2 py-1
                  text-[10px]
                  font-bold
                  text-red-600
                  transition-all
                  duration-200
                  hover:bg-red-50
                  hover:text-red-700
                "
              >
                Book
                <ArrowRight
                  size={11}
                  strokeWidth={2.5}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AvailableClasses;
