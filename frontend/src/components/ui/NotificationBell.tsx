import { useEffect, useRef, useState } from "react";
import { Bell, BellRing, CheckCheck, Loader2 } from "lucide-react";

import { useNotifications } from "../../hooks/useNotifications";
import { timeAgo } from "../../utils/timeAgoFormatter";
import type { NotificationType } from "../../types/notification.type";

const MAX_BADGE_COUNT = 99;

const typeStyles: Record<NotificationType, string> = {
  Class: "bg-emerald-50 text-emerald-600",
  Schedule: "bg-blue-50 text-blue-600",
  Booking: "bg-amber-50 text-amber-600",
  System: "bg-gray-100 text-gray-500",
};

const NotificationBell = () => {
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const badgeLabel = unreadCount > MAX_BADGE_COUNT ? "99+" : String(unreadCount);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-expanded={isOpen}
        className="
          relative
          flex
          h-9
          w-9
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border
          border-gray-200/70
          bg-white
          text-gray-700
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          transition-colors
          hover:bg-gray-50

          sm:h-10
          sm:w-10
        "
      >
        {unreadCount > 0 ? (
          <BellRing size={19} strokeWidth={1.8} />
        ) : (
          <Bell size={19} strokeWidth={1.8} />
        )}

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-[18px]
              min-w-[18px]
              items-center
              justify-center
              rounded-full
              bg-red-600
              px-1
              text-[10px]
              font-semibold
              leading-none
              text-white
              ring-2
              ring-white
            "
          >
            {badgeLabel}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="
            fixed
            left-3
            right-3
            top-20
            z-50
            overflow-hidden
            rounded-2xl
            border
            border-gray-200/70
            bg-white
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            lg:absolute
            lg:left-auto
            lg:right-0
            lg:top-full
            lg:mt-3
            lg:w-[360px]
          "
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-950">
                Notifications
              </h2>

              {unreadCount > 0 && (
                <span className="shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="
                  flex
                  shrink-0
                  cursor-pointer
                  items-center
                  gap-1
                  text-[11px]
                  font-medium
                  text-gray-500
                  transition-colors
                  hover:text-gray-900
                "
              >
                <CheckCheck size={14} strokeWidth={2} />
                Mark all read
              </button>
            )}
          </div>

          {/* Panel Body */}
          <div className="max-h-[min(60vh,380px)] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 px-4 py-10 text-xs text-gray-400">
                <Loader2 size={16} className="animate-spin" />
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <Bell size={22} strokeWidth={1.6} className="text-gray-300" />

                <p className="text-xs text-gray-400">You're all caught up.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <li key={notification.id}>
                    <button
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                      className={`
                        flex
                        w-full
                        cursor-pointer
                        flex-col
                        gap-1
                        px-4
                        py-3
                        text-left
                        transition-colors
                        hover:bg-gray-50

                        ${notification.isRead ? "" : "bg-red-50/40"}
                      `}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className={`
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              text-[10px]
                              font-semibold

                              ${typeStyles[notification.type]}
                            `}
                          >
                            {notification.title.charAt(0)}
                          </span>

                          <span
                            className={`
                              truncate
                              text-xs

                              ${
                                notification.isRead
                                  ? "font-medium text-gray-700"
                                  : "font-semibold text-gray-950"
                              }
                            `}
                          >
                            {notification.title}
                          </span>
                        </div>

                        {!notification.isRead && (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                        )}
                      </div>

                      <p className="pl-8 text-[11px] leading-relaxed text-gray-500">
                        {notification.message}
                      </p>

                      <span className="pl-8 text-[10px] text-gray-400">
                        {timeAgo(notification.createdAt)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;