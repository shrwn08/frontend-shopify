import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  //Ensure message is always a string
  const safeMessage = React.useMemo(() => {
    if (typeof message === "string") {
      return message;
    }
    if (typeof message === "object" && message !== null) {
      // If it's an object with a message property
      if (message.message) return String(message.message);
      // If it's an error object
      if (message.error) return String(message.error);
      // Try to stringify it
      return JSON.stringify(message);
    }
    return "An error occurred";
  }, [message]);

  const types = {
    success: {
      bg: "bg-green-500",
      icon: <FaCheckCircle className="text-white text-xl" />,
    },
    error: {
      bg: "bg-red-500",
      icon: <FaTimesCircle className="text-white text-xl" />,
    },
    info: {
      bg: "bg-blue-500",
      icon: <FaInfoCircle className="text-white text-xl" />,
    },
  };

  const style = types[type] || types.info;

  return (
    <div
      className={`fixed top-24 right-6 ${style.bg} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slideInRight z-50 min-w-[300px]`}
    >
      {style.icon}
      <p className="font-medium">{safeMessage}</p>
      <button
        onClick={onClose}
        className="ml-auto text-white hover:text-gray-200 font-bold text-lg"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
