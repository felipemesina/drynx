import React from "react";
import RandomCocktail from "./randomCocktail";
import axios from "axios";

const apiEndpoint = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=";

class RecipeInfo extends RandomCocktail {
  state = {
    drinks: [],
    drinkName: [],
    drinkImg: [],
    drinkIngredients: [],
    measurements: [],
    instructions: []
  };

  getIngredients() {
    const { drinks, drinkIngredients } = this.state;
    let keys = Object.keys(drinks.drinks[0]);
    let i = 1;
    keys.forEach(key => {
      let strKey = "strIngredient" + i;
      let value = drinks.drinks[0][strKey];
      if (key === strKey && value !== "") {
        drinkIngredients.push(value);
        i++;
      }
    });
    this.setState({ drinkIngredients });
  }

  getMeasurements() {
    const { drinks, measurements } = this.state;
    let keys = Object.keys(drinks.drinks[0]);
    let i = 1;
    keys.forEach(key => {
      let strKey = "strMeasure" + i;
      let value = drinks.drinks[0][strKey];
      if (key === strKey && value !== " ") {
        measurements.push(value);
        i++;
      }
    });
    this.setState({ measurements });
  }

  async componentDidMount() {
    const { data: drinks } = await axios.get(
      apiEndpoint + this.props.match.params.id,
      {
        headers: {
          "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          "X-RapidAPI-Key": "d114573550msheb130e22907eac6p17c427jsnc9caa5a826a4"
        }
      }
    );
    let drinkName = drinks.drinks[0].strDrink;
    let drinkImg = drinks.drinks[0].strDrinkThumb;
    let instructions = drinks.drinks[0].strInstructions;
    this.setState({ drinks, drinkName, drinkImg, instructions });
    this.getIngredients();
    this.getMeasurements();
    console.log(drinks.drinks[0].strInstructions);
  }

  createKeyNumbers() {
    let key = Math.floor(Math.random(1) * 10000);
    return key;
  }

  render() {
    const {
      drinkName,
      drinkImg,
      drinkIngredients,
      measurements,
      instructions
    } = this.state;
    return (
      <main className="container-fluid recipeWrapper">
        <div className="container recipeContainer">
          <div className="row imgWrapper">
            <img src={drinkImg} className="drinkImg" alt="" />
          </div>
          <div className="row">
            <div className="col-sm-6">{instructions}</div>
            <div className="col-sm-6">
              <span className="drinkName">{drinkName}</span>
              <div className="container">
                <h3 className="ingrHeadline divider">Ingredients</h3>

                <div className="row">
                  <div className="col-sm-6 ingredientsWrapper measurementText">
                    {measurements.map(measurement => (
                      <p key={this.createKeyNumbers()}>{measurement}</p>
                    ))}
                  </div>
                  <div className="col-sm-6 ingredientsWrapper ingreText">
                    {drinkIngredients.map(ingredient => (
                      <p key={this.createKeyNumbers()}>{ingredient}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default RecipeInfo;
