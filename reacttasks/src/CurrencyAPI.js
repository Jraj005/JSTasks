import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CurrencyConverterAPI = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://api.frankfurter.app/currencies"
        );
        setCurrencies(Object.keys(response.data));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      setConvertedAmount(response.data.rates[toCurrency]);
    } catch (error) {
      console.error("Error converting currency:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .converter-container {
            max-width: 400px;
            margin: auto;
            padding: 40px;
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #d4d4d4;
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.5);
            border-radius: 10px;
          }

          h2 {
            margin-bottom: 20px;
          }

          .input-group {
            margin-bottom: 15px;
          }

          select, input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          .convert-btn {
            background-color:rgb(255 146 36);
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }

          .convert-btn:hover {
            background-color: #ca6512;
          }

          .result {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
          }

          .loading {
            color: #555;
            font-weight: bold;
          }
        `}
      </style>

      <div className="converter-container">
        <h2>Currency Converter Using API</h2>

        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button className="convert-btn" onClick={convertCurrency}>
          Convert
        </button>

        {loading ? (
          <p className="loading">Converting...</p>
        ) : convertedAmount !== null ? (
          <p className="result">
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        ) : null}
        <div>
          <Link
            to="/"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1.2rem",
              backgroundColor: "#4caf50",
              color: "white",
              textDecoration: "none",
              borderRadius: "25px",
              display: "inline-block",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverterAPI;
