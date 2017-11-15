import React from 'react';
import './Pagination.css'

const defaultProps = {
    page: 1,
    numPages: 1,
    range: 4,
    half: 2
};

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = { buttonText: [] }
    }

    componentDidMount() {
        this.buildButtonText(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const { page, numPages } = this.props;
        const { nextPage, nextNumPages } = nextProps;

        if(page !== nextPage || numPages !== nextNumPages ) {
            this.buildButtonText(nextProps);
        }
    }

    buildButtonText(props) {
        const { page, numPages, range, half } = props

        let minPage = page-half, maxPage = page+half;

        if(page < 3) {
            minPage = 1
            maxPage = Math.min(minPage+range, numPages)
        }
        else if(page > numPages - 2) {
            maxPage = numPages;
            minPage = Math.max(maxPage-range, 1)
        }

        this.setState({ buttonText: Array.from(new Array(maxPage-minPage + 1), (_, i) => i + minPage) });
    }

    render() {
        const { page, numPages, changePage } = this.props

        const buttonText = this.state.buttonText.map(number => {
            return (
                <button
                    type='button'
                    className={number === page ? 'active': ''}
                    onClick={() => changePage(number)}
                    key={number}>
                    {number}
                </button>
            );
        })

        return (
            <ul>
                <button type="button" onClick={() => changePage(1)} key={"<<"}>{"<<"}</button>
                <button type="button" onClick={() => changePage(page - 1)} key={"<"}>{"<"}</button>
                {buttonText}
                <button type="button" onClick={() => changePage(page + 1)} key=">" >></button>
                <button type="button" onClick={() => changePage(numPages)} key=">>" >>></button>
            </ul>
        );
    };
}

Pagination.defaultProps = defaultProps

export default Pagination
