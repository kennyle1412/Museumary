import React from 'react';
import Pagination from 'components/Pagination';

import { TypesPage } from 'components/Pages';
import { TypesFilter } from 'components/Filters';

const defaultProps = {
    defaultParams: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        medium: ""
    },

    attributes: {
        name: "Name"
    }
}

class FullTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: props.defaultParams,
            numPages: 0
        };

        this.changePage = this.changePage.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.changeNumPages = this.changeNumPages.bind(this);
    }

    changePage(pageNumber) {
        let params = Object.assign({}, this.state.params);
        params.page = pageNumber;

        this.setState({ params: params });
    }

    applyFilter(newParams) {
        this.setState({ params: newParams })
    }

    changeNumPages(numPages) {
        this.setState({ numPages: numPages })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const params = this.state.params;
        const newParams = nextState.params;

        for(var param in params) {
            if(params[param] !== newParams[param]) {
                return true;
            }
        }

        return this.state.numPages !== nextState.numPages;
    }

    render() {
        return (
            <div className="FullTypes">
                <TypesFilter
                    {...this.props}
                    applyFilter={this.applyFilter}
                />
                <TypesPage
                    params={this.state.params}
                    changePage={this.changePage}
                    changeNumPages={this.changeNumPages}
                />
                <br/>
                 <Pagination
                    page={this.state.params.page}
                    numPages={this.state.numPages}
                    changePage={this.changePage}
                />
            </div>
        );
    }
}

FullTypes.defaultProps = defaultProps

export default FullTypes;
