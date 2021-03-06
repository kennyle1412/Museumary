import React from "react";
import SelectFilter from './SelectFilter'

const defaultProps = {
    params: {
        // page: 1,
        order_by: "name",
        order: "ascending",
        startswith: "",
        medium: ""
    },

    attributes: {
        name: "Name"
    }
}

class TypesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.params;

        this.applyFilter = this.applyFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    applyFilter(event) {
        if(event.target.name === "Reset") {
            this.mediumRef.value = "";

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
                    <strong> Medium </strong>
                    <input
                        type="text"
                        name="medium"
                        ref={el => this.mediumRef = el}
                        onChange={this.handleChange}
                    />
                    &nbsp;&nbsp;
                    <strong> Starts With: </strong>
                    <SelectFilter
                        name="startswith"
                        value={this.state.startswith}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Order By </strong>
                    <SelectFilter
                        name="order_by"
                        value={this.state.order_by}
                        attributes={this.props.attributes}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Order </strong>
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

TypesFilter.defaultProps = defaultProps;

export default TypesFilter;