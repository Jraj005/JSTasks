import React, { Component } from "react";
import { Link } from "react-router-dom";
class Counter extends Component {
  constructor(props) {
    super(props);
    const storedCount = localStorage.getItem("count");
    this.state = {
      count: storedCount ? parseInt(storedCount) : 0,
    };
  }

  increment = () => {
    this.setState((prevState) => {
      const newCount = prevState.count + 1;
      localStorage.setItem("count", newCount);
      return { count: newCount };
    });
  };

  decrement = () => {
    this.setState((prevState) => {
      const newCount = prevState.count - 1;
      localStorage.setItem("count", newCount);
      return { count: newCount };
    });
  };

  reset = () => {
    localStorage.setItem("count", 0);
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#282c34",
          color: "#61dafb",
          fontFamily: "monospace",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>
          Counter: {this.state.count}
        </h1>
        <div>
          <button
            onClick={this.increment}
            style={{
              backgroundColor: "#61dafb",
              color: "#282c34",
              border: "none",
              padding: "10px 20px",
              fontSize: "1.5rem",
              margin: "5px",
              cursor: "pointer",
            }}
          >
            +
          </button>
          <button
            onClick={this.decrement}
            style={{
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1.5rem",
              margin: "5px",
              cursor: "pointer",
            }}
          >
            -
          </button>
          <button
            onClick={this.reset}
            style={{
              backgroundColor: "#f7b731",
              color: "black",
              border: "none",
              padding: "10px 20px",
              fontSize: "1.5rem",
              margin: "5px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
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
    );
  }
}

export default Counter;
