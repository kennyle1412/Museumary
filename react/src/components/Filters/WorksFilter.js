import React from 'react';
import SelectFilter from './SelectFilter'

const defaultProps = {
    params: {
        order_by: "name",
        order: "ascending",
        startswith: "",
        art_type: "",
        medium: "",
        venue: "None"
    },

    attributes: {
        name: "Name",
        date: "Date"
    },

    venues: {
        "None": "All",
        "Harvard Art Museum": "Harvard",
        "The Walters Art Museum": "Walters",
        "Auckland Museum": "Auckland",
        "Cooper Hewitt, Smithsonian Design Museum": "Cooper",
        "Finnish National Gallery": "Finnish"
    }
}

class ArtistsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.params;

        this.applyFilter = this.applyFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    applyFilter(event) {
        if(event.target.name === "Reset") {
            this.mediumRef.value = "";
            this.artTypeRef.value = "";

            this.setState(this.props.params)
            let newParams = this.props.params;
            newParams.page = 1;

            this.props.applyFilter(newParams);
        }
        else {
            this.props.applyFilter(this.state)
        }
    }

    handleChange(event) {
        let state = Object.assign({}, this.state);
        state[event.target.name] = event.target.value;

        this.setState(state)
    }

    render() {
        return (
            <div className="container">
                <div align="middle">
                    <strong> Art Type: </strong>
                    <input
                        type="text"
                        name="art_type"
                        ref={el => this.artTypeRef = el}
                        onChange={this.handleChange}
                    />
                    &nbsp;&nbsp;
                    <strong> Medium: </strong>
                    <input
                        type="text"
                        name="medium"
                        ref={el => this.mediumRef = el}
                        onChange={this.handleChange}
                    />
                    &nbsp;&nbsp;
                    <strong> Venue: </strong>
                    <SelectFilter
                        name="venue"
                        value={this.state.venue}
                        attributes={this.props.venues}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Starts With: </strong>
                    <SelectFilter
                        name="startswith"
                        value={this.state.startswith}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Order By: </strong>
                    <SelectFilter
                        name="order_by"
                        value={this.state.order_by}
                        attributes={this.props.attributes}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Order: </strong>
                    <select
                        name="order"
                        value={this.state.order}
                        onChange={this.handleChange}>
                        <option value="ascending"> Ascending </option>
                        <option value="descending"> Descending </option>
                    </select>
                </div>
                <br/>
                <div>
                <button
                    type="button"
                    name="Apply"
                    onClick={this.applyFilter} >
                    Apply Filter
                </button>
                <button
                    type="button"
                    name="Reset"
                    onClick={this.applyFilter} >
                    Reset
                </button>
                </div>
                <br/>
            </div>
        );
    }
}

ArtistsFilter.defaultProps = defaultProps;

export default ArtistsFilter;