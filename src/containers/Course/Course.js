import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Course.css';

class Course extends Component {
    state = {
        courseTitle: ''
    }

    updateParams() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            this.setState({
                courseTitle: param[1]
            });
        }
    }

    componentDidMount () {
        this.updateParams();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateParams();
        }
    }

    render () {
        return (
            <article className="Course">
                <h1>{this.state.courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </article>
        );
    }
}

export default withRouter(Course);