import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, [url]);
  return data;
}

export const ApiQuizDB = () => {
    const url = "https://my-json-server.typicode.com/bladwing/DB/db" ;
  
    const data = useFetch(url);
  
    return { data };
  };


