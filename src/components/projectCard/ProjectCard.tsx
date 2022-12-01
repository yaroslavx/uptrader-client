import { Link } from 'react-router-dom'
import './projectCard.scss'

type ProjectCardProps = {
    id: string
    title: string
}

const ProjectCard = ({ id, title }: ProjectCardProps) => {
    console.log("Rerender from ProjectCard")

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