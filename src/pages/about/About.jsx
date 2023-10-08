import { NavLink } from 'react-router-dom'


const About = () => {
  return (
    <div className='container'>
        <div className='nav nav-item'>
            <NavLink to='/about' className='nav-link'>About</NavLink>
            <NavLink to='/about/det' className='nav-link'>About 1</NavLink>
        </div>
    </div>
  )
}

export default About