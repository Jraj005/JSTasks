import React, { Component } from "react";
import { Link } from "react-router-dom";
class MiniCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: "",
      num2: "",
      result: "",
    };
  }

  calculate = (operator) => {
    const { num1, num2 } = this.state;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      this.setState({ result: "Invalid Input" });
      return;
    }

    let res = 0;
    switch (operator) {
      case "+":
        res = n1 + n2;
        break;
      case "-":
        res = n1 - n2;
        break;
      case "*":
        res = n1 * n2;
        break;
      case "/":
        res = n2 !== 0 ? n1 / n2 : "Error";
        break;
      default:
        res = "Invalid";
    }

    this.setState({ result: res });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Mini Calculator</h2>
        <input
          type="number"
          name="num1"
          value={this.state.num1}
          onChange={this.handleChange}
          placeholder="Enter number"
          style={styles.input}
        />
        <input
          type="number"
          name="num2"
          value={this.state.num2}
          onChange={this.handleChange}
          placeholder="Enter number"
          style={styles.input}
        />
        <div>
          <button onClick={() => this.calculate("+")} style={styles.button}>
            +
          </button>
          <button onClick={() => this.calculate("-")} style={styles.button}>
            -
          </button>
          <button onClick={() => this.calculate("*")} style={styles.button}>
            ×
          </button>
          <button onClick={() => this.calculate("/")} style={styles.button}>
            ÷
          </button>
        </div>
        <h3 style={styles.result}>Result: {this.state.result}</h3>
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

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#282c34",
    color: "#61dafb",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: "2rem",
  },
  input: {
    margin: "10px",
    padding: "10px",
    fontSize: "1.2rem",
    width: "200px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "1.5rem",
    cursor: "pointer",
    backgroundColor: "#61dafb",
    border: "none",
    color: "#282c34",
  },
  result: {
    marginTop: "20px",
    fontSize: "1.5rem",
  },
};

export default MiniCalculator;
