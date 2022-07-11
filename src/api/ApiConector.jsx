const url = "https://my-json-server.typicode.com/bladwing/DB/db";
export const questionData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

