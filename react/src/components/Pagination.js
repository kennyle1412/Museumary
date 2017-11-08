import React from 'react';
import { Link } from 'react-router-dom';
import style from './Pagination.css'

const defaultProps = {
    defaultButtonText: [1, 2, 3, 4, 5],
    buttonIndexs: [-2, -1, 0, 1, 2]
};

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonText: props.defaultButtonText
        }
    }

    getPage(pageNumber) {
        let {
            page,
            numPages
        } = this.props

        if(pageNumber !== page && 1 <= pageNumber && pageNumber <= numPages) {
            this.props.changePage(pageNumber)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.page !== nextProps.page) {
            this.buildButtonText(nextProps);
        }
    }

    buildButtonText(props) {
        let {
            page,
            numPages,
            defaultButtonText,
            buttonIndexs
        } = props

        if(page <= 3) {
            page = 3;
        }
        else if(page > numPages - 2) {
            page = numPages - 2;
        }

        this.setState({ buttonText: buttonIndexs.map(index => page+index) });
    }

    render() {
        const {
            page,
            numPages
        } = this.props

        const buttonText = this.state.buttonText.map(number => {
            const my_class = number === page ? 'active': ''

            return (
                <button type='button'
                        className={my_class}
                        onClick={() => this.getPage(number)}
                        key={number}>
                    {number}
                </button>
            );
        })

        return (
            <ul>
                <button type="button" onClick={() => this.getPage(1)} key={"<<"}>{"<<"}</button>
                <button type="button" onClick={() => this.getPage(page - 1)} key={"<"}>{"<"}</button>
                {buttonText}
                <button type="button" onClick={() => this.getPage(page + 1)} key=">" >></button>
                <button type="button" onClick={() => this.getPage(numPages)} key=">>" >>></button>
            </ul>
        );

    };
}

Pagination.defaultProps = defaultProps
export default Pagination
