import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLectures } from '../actions'

class MoocList extends React.Component {
    constructor (props) {
        super(props);
        
        this.handleFetchMoreClick = this.handleFetchMoreClick.bind(this);
    }

    componentDidMount () {
        this.props.fetchLectures(1)
    }

    handleFetchMoreClick () {
        this.props.fetchLectures(this.state.page+1)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...preState,
            ...nextProps,
            results: [...nextProps.results]
        }
    }

    render () {
        return (
            <div>
                <ul>
                    {this.state.results.map((lecture) => {
                        return <li>{lecture.title}</li>
                    })}
                </ul>
                <button onClick={this.handleFetchMoreClick}> more.. </button>
            </div>
        )
    }
}

MoocList.propTypes = {
    count: PropTypes.number,
    page: PropTypes.number,
    results: PropTypes.array,
}

MoocList.defaultProps = {
    count: 0,
    page: 0,
    results: [],
};

export default connect(
    (reduxState) => ({...reduxState.moocList}),
    (dispatch) => ({
        fetchLectures: (...args) => dispatch(fetchLectures(...args))
    })
)(MoocList);
