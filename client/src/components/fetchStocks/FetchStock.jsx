 import { useState, useEffect } from "react";
 
 const SearchStock =  () => {
    const [stock, setStock] = useState();

    useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`
        );

        const json = await response.json();
        console.log("API response:", json);

        const quote = json["Global Quote"];

        if (!quote || !quote["05. price"]) {
          throw new Error("Invalid API response");
        }

        setStock(quote["05. price"]);
      } catch (err) {
        console.error(err);
        setError("Failed to load stock data");
      }
    };
        fetchData();
    }, []);


  return (
    <div>
      <h2>Apple (AAPL)</h2>

        <p>Current Price: ${stock}</p>
    </div>
  );
};

 export default SearchStock