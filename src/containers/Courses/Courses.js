import React, { Component } from 'react';

import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    selectCourse = (id) => {
        // this.props.history.push({pathname: '/' + id})
        console.log('id: '+id)
        this.props.history.push('/courses/' + id)
    }

    render () {
        return (
            <div>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return <article
                                className="Course"
                                key={course.id}
                                clicked={() => this.selectCourse(course.id)}>{course.title}</article>;
                        } )
                    }
                </section>
            </div>
        );
    }
}

export default Courses;