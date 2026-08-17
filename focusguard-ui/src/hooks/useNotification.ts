import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getNotifications,
  getUnreadNotificationCount,
  getLatestNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../api/notification.api";

export const useNotifications = () =>
  useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 30000,
  });

export const useUnreadNotificationCount =
  () =>
    useQuery({
      queryKey: ["notifications-unread-count"],
      queryFn: getUnreadNotificationCount,
      refetchInterval: 30000,
    });

export const useLatestNotification =
  () =>
    useQuery({
      queryKey: [
        "latest-notification",
      ],
      queryFn:
        getLatestNotification,
      refetchInterval: 30000,
    });

export const useMarkNotificationAsRead =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        markNotificationAsRead,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "notifications",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "latest-notification",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "notifications-unread-count",
          ],
        });
      },
    });
  };

export const useMarkAllNotificationsAsRead =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        markAllNotificationsAsRead,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "notifications",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "latest-notification",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "notifications-unread-count",
          ],
        });
      },
    });
  };