import { useState } from "react";
import "./QuoteGen.css";

export default function QuoteGen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const getQuote = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">✨ Quote Generator</h1>

      <div className="card">
        {quote ? (
          <>
            <p className="quote">“{quote}”</p>
            <p className="author">— {author}</p>
          </>
        ) : (
          <p className="placeholder">Click below to generate a quote</p>
        )}

        <button onClick={getQuote}>New Quote</button>
      </div>
    </div>
  );
}