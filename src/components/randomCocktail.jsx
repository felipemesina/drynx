import React, { Component } from "react";
import { Link } from "react-router-dom";

class RandomCocktail extends Component {
  state = {
    data: []
  };

  render() {
    const { drinkName, drinkImg, drinkId } = this.props;
    return (
      <div className="container newDrinkWrapper">
        <div className="row">
          <h2>Discover a New Drink</h2>
          <div className="col-sm-6 getRecipeWrapper">
            <h1>{drinkName}</h1>
            <Link to={`/recipe/${drinkId}`}>
              <button className="btn btn-light" onClick={this.handleGetRecipe}>
                Get Recipe
              </button>
            </Link>
          </div>
          <div className="col-sm-6">
            <img src={drinkImg} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default RandomCocktail;
