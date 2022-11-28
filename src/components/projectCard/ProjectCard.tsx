import { Link } from 'react-router-dom'
import './projectCard.scss'

const ProjectCard = () => {
    return (
        <div className='card_container'>
            <Link to={`3`}>
                <div className='card'>
                    <h2>Project Card</h2>
                </div>
            </Link>
        </div>
    )
}

export default ProjectCard