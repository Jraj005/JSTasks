import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import "./App.css";
import InputForm from "./InputForm";
import Counter from "./Counter";
import Stopwatch from "./Stopwatch";
import MiniCalculator from "./MiniCalculator";
import TodoClass from "./TodoClass";
import TodoClassLocalStorage from "./TodoClassLocalStorage";
import TodoFunction from "./TodoFunction";
import TodoFunctionLocalStorage from "./TodoFunctionLocalStorage";
import CRUDApp from "./Crud";
import CrudAPI from "./Crud_with_API";
import NewsAPI from "./NewsAPI";
import CurrencyConverterAPI from "./CurrencyAPI";
import WeatherAPI from "./weatherAPI";
import RecipeAPI from "./RecipeAPI";

function Home() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const pages = [
    { path: "/counter", name: "Counter" },
    { path: "/input-form", name: "Input Form" },
    { path: "/stopwatch", name: "Stopwatch" },
    { path: "/minicalc", name: "MiniCalculator" },
    { path: "/todo-class", name: "Todo (Class)" },
    { path: "/todo-class-ls", name: "Todo (Class + LocalStorage)" },
    { path: "/todo-function", name: "Todo (Function)" },
    { path: "/todo-function-ls", name: "Todo (Function + LocalStorage)" },
    { path: "/crud", name: "CRUD App" },
    { path: "/crudwithapi", name: "CRUD App with API" },
    { path: "/newsapi", name: "News API" },
    { path: "/currencyapi", name: "Currency API" },
    { path: "/weatherapi", name: "Weather API" },
    { path: "/recipeapi", name: "Recipe API" },
  ];

  return (
    <div
      className={`home-container ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1>React JS Tasks</h1>
      <div className="card-container">
        {pages.map((page, index) => (
          <Link key={index} to={page.path} className="card">
            <h2>{page.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/minicalc" element={<MiniCalculator />} />
          <Route path="/input-form" element={<InputForm />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/todo-class" element={<TodoClass />} />
          <Route path="/todo-class-ls" element={<TodoClassLocalStorage />} />
          <Route path="/todo-function" element={<TodoFunction />} />
          <Route
            path="/todo-function-ls"
            element={<TodoFunctionLocalStorage />}
          />
          <Route path="/crud" element={<CRUDApp />} />
          <Route path="/crudwithapi" element={<CrudAPI />} />
          <Route path="/newsapi" element={<NewsAPI />} />
          <Route path="/currencyapi" element={<CurrencyConverterAPI />} />
          <Route path="/weatherAPI" element={<WeatherAPI />} />
          <Route path="/RecipeAPI" element={<RecipeAPI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
