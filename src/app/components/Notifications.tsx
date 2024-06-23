import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  _id: string;
  message: string;
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await axios.put(`/api/notifications`, { id: notificationId, read: true });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const closeNotifications = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleNotifications} className="hover:text-purple-300 focus:outline-none relative" aria-label="Notification">
        <i className="fas fa-bell text-xl"></i>
        {notifications.some((notification) => !notification.read) && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {notifications.filter((notification) => !notification.read).length}
          </span>
        )}
      </button>
      {notificationOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-20">
          <div className="flex justify-between items-center border-b border-gray-200 p-2">
            <span className="font-bold text-gray-700">Notifications</span>
            <button onClick={closeNotifications} className="text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Close notifications">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`py-2 px-4 text-sm text-black cursor-pointer hover:bg-gray-100 ${notification.read ? 'text-gray-500' : 'font-bold'}`}
                  onClick={() => markAsRead(notification._id)}
                >
                  {notification.message}
                </li>
              ))
            ) : (
              <li className="py-2 px-4 text-sm text-black">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
