const CurrentDate = () => {
  const DateNow = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return DateNow;
};

export default CurrentDate;
