import React, { Component } from 'react'
import './Search.scss'; 

class Search extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: this.formatData(props.data),
            action: props.action,
            result: [],
            open: false
        }
        this.handleSearch = this.handleSearch.bind(this)
    }

    formatData(data) {
        const group = Object.keys(data)

        const dataSearch = []
        for(let key of group) {
            if(data[key].length > 0) {
                dataSearch.push({name: key.toUpperCase(), type_autocomplete: "group_name"})
                for(let element of data[key]) {
                    element.type_autocomplete = key
                    dataSearch.push(element)
                }
            }
        }

        return dataSearch
    }

    handleOpen(state) {
        this.setState({open: state})
    }

    handleSearch(event) {
        const { data } = this.state
        const value = event.target.value
        this.setState({result : data.filter((elem) => elem.name.includes(value) || elem.type_autocomplete === "group_name")})
    }

    render() {
        const { data, action, result, open } = this.state
        const hasResult = Array.isArray(result) && result.length > 0;
        return (
            <div className="search">
                <input type="text" name="search" onChange={this.handleSearch}  className="form-control" autoComplete="off" onFocus={() => this.handleOpen(true)} onBlur={() => this.handleOpen(false)}/>
                <div className="result-search-container">
                    <div className={"result-search dropdown"+(hasResult && open ? " open" : "")}>
                        <ul className="dropdown-menu">
                        {
                            hasResult &&
                            result.map((el) => {
                                return (
                                    el.type_autocomplete == "group_name" 
                                    ? <li className="group-list" key={el.name}><a>{el.name}</a></li>
                                    : <li onClick={() => action()} key={el.name}><a>{el.name}</a></li>
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search