import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string
    }),
    index: PropTypes.string,
    updatedFish: PropTypes.func
  };

  hadleChange = e => {
    const updatedFish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <form className="fish-edit">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.props.fish.name}
          onChange={this.hadleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={parseFloat(this.props.fish.price)}
          onChange={this.hadleChange}
        />
        <select
          name="status"
          value={this.props.fish.status}
          onChange={this.hadleChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          placeholder="Desc"
          value={this.props.fish.desc}
          onChange={this.hadleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image"
          value={this.props.fish.image}
          onChange={this.hadleChange}
        />
        {/* <button type="submit">+ Add Fish</button> */}
        <button
          type="button"
          onClick={() => this.props.deleteFish(this.props.index)}
        >
          - Remove Fish
        </button>
      </form>
    );
  }
}

export default EditFishForm;
