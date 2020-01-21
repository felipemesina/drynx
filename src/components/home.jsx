import React, { Component } from "react";
import SearchBar from "./searchBar";
import CocktailCategory from "./category";
import RandomCocktail from "./randomCocktail";
import axios from "axios";

const apiEndpoint = "https://the-cocktail-db.p.rapidapi.com/random.php";

class Home extends Component {
  state = {
    data: [],
    drinkName: [],
    drinkImg: [],
    drinkId: []
  };

  async componentDidMount() {
    const { data } = await axios.get(apiEndpoint, {
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "d114573550msheb130e22907eac6p17c427jsnc9caa5a826a4"
      }
    });
    let drinkName = data.drinks[0].strDrink;
    let drinkImg = data.drinks[0].strDrinkThumb;
    let drinkId = data.drinks[0].idDrink;
    this.setState({ data, drinkName, drinkImg, drinkId });
  }

  render() {
    const { drinkName, drinkImg, drinkId } = this.state;
    return (
      <div className="container-fluid my-0 mx-0 py-0 px-0">
        <RandomCocktail
          drinkName={drinkName}
          drinkImg={drinkImg}
          drinkId={drinkId}
        />
        <SearchBar />
        <CocktailCategory />
      </div>
    );
  }
}

export default Home;
