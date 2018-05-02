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
            ...prevState,
            ...nextProps,
            lectures: [...nextProps.lectures],
        }
    }

    render () {
        return (
            <div>
                <ul>
                    {this.state.results.map((lecture, i) => {
                        return <li key={i}>{lecture.title}</li>
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
    lectures: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    }))
}

MoocList.defaultProps = {
    count: 0,
    page: 0,
    lectures: [],
};

export default connect(
    (reduxState) => ({...reduxState.moocList}),
    (dispatch) => ({
        fetchLectures: (...args) => dispatch(fetchLectures(...args))
    })
)(MoocList);
