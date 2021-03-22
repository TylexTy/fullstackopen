import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
const Total = ({ parts }) => {

const sum = parts.reduce((s,p) => s + p.exercises,0)

return(
    <p>Number of exercises {sum}</p>
) 
}

const Part = (props) => {
return (
    <p>
    {props.part.name} {props.part.exercises}
    </p>    
)
}

const Content = ({ parts }) => {
return (
    <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)
}

const Course = ({courses}) => {

return (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map(course =>{
        return (
            <div key= {course.id}>
            <Header course = {course} />
            <Content parts = {course.parts} />
            <Total parts= {course.parts} />
            </div>
        )
        })}
    </div>
)

}

export default Course