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
    measurements: []
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
    console.log(drinkIngredients, drinks);
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
    console.log(measurements);
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
    this.setState({ drinks, drinkName, drinkImg });
    this.getIngredients();
    this.getMeasurements();
  }

  createKeyNumbers() {
    let key = Math.floor(Math.random(1) * 10000);
    return key;
  }

  render() {
    const { drinkName, drinkImg, drinkIngredients, measurements } = this.state;
    return (
      <main className="container-fluid recipeWrapper">
        <div className="container recipeContainer">
          <div className="row">
            <div className="col-sm-6">
              <img src={drinkImg} className="img-fluid" alt="" />
            </div>
            <div className="col-sm-6">
              <h3>{drinkName}</h3>
              <ul className="list-group">
                {measurements.map(item => (
                  <li className="list-group-item" key={this.createKeyNumbers()}>
                    {item}
                  </li>
                ))}
                {drinkIngredients.map(item => (
                  <li className="list-group-item" key={this.createKeyNumbers()}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default RecipeInfo;
