import { useState } from "react";

import {
  Bell,
} from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";

import {
  useNotifications,
} from "../../hooks/useNotification";

const NotificationBell = () => {
  const [open, setOpen] =
    useState(false);

  const { data } =
    useNotifications();

  const unreadCount =
    data?.filter(
      (notification) =>
        !notification.is_read
    ).length ?? 0;

  return (
    <div className="relative">

      <button
        type="button"
        aria-label="Notifications"
        onClick={() =>
          setOpen(!open)
        }
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-700
          shadow-sm
          transition

          hover:bg-slate-100
          active:bg-slate-200

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-200
          dark:shadow-none
          dark:hover:bg-slate-700
          dark:active:bg-slate-600

          sm:h-10
          sm:w-10
        "
      >

        <Bell
          size={20}
        />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-600
              px-1
              text-[10px]
              font-bold
              leading-none
              text-white
              ring-2
              ring-white

              dark:ring-slate-900
            "
          >
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}

      </button>

      {open && (
        <NotificationDropdown
          onClose={() =>
            setOpen(false)
          }
        />
      )}

    </div>
  );
};

export default NotificationBell;