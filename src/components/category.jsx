import React, { Component } from "react";
import axios from "axios";

class CocktailCategory extends Component {
  state = {
    drinks: [
      "Gin",
      "Tequila",
      "Rum",
      "Whiskey",
      "Jack Daniels",
      "Vodka",
      "Bourbon",
      "Vermouth",
      "Jagermeister"
    ],
    results: []
  };
  apiEndpoint = "https://the-cocktail-db.p.rapidapi.com/list.php?i=list";

  async componentDidMount() {
    const { data: results } = await axios.get(this.apiEndpoint, {
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "d114573550msheb130e22907eac6p17c427jsnc9caa5a826a4"
      }
    });
    this.setState({ results });
  }

  createKey() {
    return Math.floor(Math.random() * 10000);
  }

  render() {
    return (
      <main className="container-fluid categoryWrapper">
        <div className="container">
          <div className="divider text-center">
            <span>Classic Cocktails</span>
            <div className="row">
              {this.state.drinks.map(drink => (
                <div key={this.createKey()} className="col-xs-6 col-sm-4">
                  {drink}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default CocktailCategory;
