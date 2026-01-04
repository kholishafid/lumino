export const getEventColor = (priority?: "low" | "medium" | "high") => {
  if (priority === "high") {
    return "oklch(64.6% 0.222 41.116)";
  }
  if (priority === "medium") {
    return "oklch(82.8% 0.189 84.429)";
  }
  if (priority === "low") {
    return "oklch(79.2% 0.209 151.711)";
  }
  return "transparent";
};

export const getEventBackgroundColor = (
  priority?: "low" | "medium" | "high",
) => {
  if (priority === "high") {
    return "oklch(94.6% 0.222 41.116 / 0.2)";
  }
  if (priority === "medium") {
    return "oklch(97.8% 0.189 84.429 / 0.2)";
  }
  if (priority === "low") {
    return "oklch(97.2% 0.209 151.711 / 0.2)";
  }
  return "transparent";
};
