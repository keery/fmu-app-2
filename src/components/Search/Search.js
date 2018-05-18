import React, { Component } from 'react'
import './Search.scss'; 

class Search extends Component {
    constructor(props){
        super(props)

        this.state = {
            result: []
        }
    }

    handleSearch(event) {
        const value = event.target.value
    }

    render() {
        return (
            <div className="search">
                <input type="text" name="search" onChange={this.handleSearch}  className="form-control" />
                <div className="result-search-container">
                    <div className="result-search"></div>
                </div>
            </div>
        )
    }
}

export default Search