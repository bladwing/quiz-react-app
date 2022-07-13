export const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export function SaveAttempt(value, total) {
  
  let attempts = JSON.parse(localStorage.getItem("Attempts")) || [];
  let curDate = new Date();
  let dateToString = curDate.toLocaleString([], {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    second: "2-digit",
  });

  attempts.push({
    score: value,
    total: total,
    time: dateToString,
    expiry: curDate.getTime(20000),
  });

  attempts.sort((a, b) => {
    return a.score > b.score
      ? -1
      : a.score === b.score
      ? a.time > b.time
        ? -1
        : 1
      : 1;
  });

  localStorage.setItem("Attempts", JSON.stringify(attempts));
};