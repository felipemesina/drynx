import React, { Component } from "react";
import axios from "axios";

const apiEndpoint = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=";

class SearchBar extends Component {
  state = {
    drinks: []
  };

  searchStr = React.createRef();

  handleSubmit = async e => {
    e.preventDefault();
    const searchStr = this.searchStr.current.value;
    const { data: drinks } = await axios.get(apiEndpoint + searchStr, {
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "d114573550msheb130e22907eac6p17c427jsnc9caa5a826a4"
      }
    });
    this.setState({ drinks });
    console.log({ drinks });
  };

  render() {
    return (
      <div className="container py-5">
        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="input-group input-group-lg">
            <input
              type="text"
              ref={this.searchStr}
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="searchButton"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="searchButton"
              >
                <span>
                  <i className="fas fa-search" />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
