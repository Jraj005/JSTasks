import React, { Component } from "react";
import { Link } from "react-router-dom";

class CounterLocalStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const storedCount = localStorage.getItem("count");
    if (storedCount) {
      this.setState({ count: parseInt(storedCount) });
    }
  }

  updateCount = (newCount) => {
    this.setState({ count: newCount });
    localStorage.setItem("count", newCount);
  };

  increment = () => this.updateCount(this.state.count + 1);
  decrement = () => this.updateCount(this.state.count - 1);
  reset = () => this.updateCount(0);

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.counter}>Counter: {this.state.count}</h1>
        <div>
          <button onClick={this.increment} style={styles.button}>
            +
          </button>
          <button
            onClick={this.decrement}
            style={{ ...styles.button, backgroundColor: "#ff6b6b" }}
          >
            -
          </button>
          <button
            onClick={this.reset}
            style={{ ...styles.button, backgroundColor: "#f7b731" }}
          >
            Reset
          </button>
        </div>
        <Link to="/" style={styles.link}>
          Back to Home
        </Link>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#282c34",
    color: "#61dafb",
    fontFamily: "monospace",
  },
  counter: {
    fontSize: "4rem",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    padding: "10px 20px",
    fontSize: "1.5rem",
    margin: "5px",
    cursor: "pointer",
  },
  link: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#4caf50",
    color: "white",
    textDecoration: "none",
    borderRadius: "25px",
    display: "inline-block",
  },
};

export default CounterLocalStorage;
