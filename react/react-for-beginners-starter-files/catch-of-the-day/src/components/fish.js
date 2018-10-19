import React, { Component } from "react";
import { formatPrice } from "../helpers";
class Fish extends Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    const { image, name, price, desc, status } = this.props.detail;
    const isAvalable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvalable} onClick={this.handleClick}>
          {isAvalable ? "Add to Order" : "Sold out"}
        </button>
      </li>
    );
  }
}

export default Fish;
