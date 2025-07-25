export const formatReadableDate = (dateString, withTime = false) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Date";

  const options = withTime
    ? {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    : {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };

  return date.toLocaleString("en-IN", options);
};
