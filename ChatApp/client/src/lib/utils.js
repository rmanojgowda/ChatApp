// Format timestamp into readable time
export const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

// Format message: trim, remove extra spaces
export const formatMessage = (message) => {
  if (!message) return '';
  return message.trim();
};

// Generate a simple unique ID (if needed)
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};
