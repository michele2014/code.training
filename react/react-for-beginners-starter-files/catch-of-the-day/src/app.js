import React, { Component } from "react";
// import StorePicker from "./components/store-picker";
import Header from "./components/header";
import Order from "./components/order";
import Inventory from "./components/inventory";
import Fish from "./components/fish";
import sampleFishes from "./sample-fishes";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
    console.log("addFish");
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
    console.log("loadSampleFishes");
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;

    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Wes is cool" age={500} cool={true} />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                detail={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
