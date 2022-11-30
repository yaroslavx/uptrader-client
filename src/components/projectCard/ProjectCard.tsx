import { Link } from 'react-router-dom'
import './projectCard.scss'

type ProjectCard = {
    id: string
    title: string
}

const ProjectCard = ({ id, title }: ProjectCard) => {
    return (
        <div className='card_container'>
            <Link to={`projects/${id}`}>
                <div className='card'>
                    <h2>{title}</h2>
                </div>
            </Link>
        </div>
    )
}

export default ProjectCard