import ProjectCard from '../../components/projectCard/ProjectCard'
import "./projectsPage.scss"

const ProjectsPage = () => {
    return (
        <div className='projects_container'>
            <div className='project_cards'>
                {[...Array(21)].map((card, index) =>
                    <ProjectCard />
                )}
            </div>
        </div >
    )
}

export default ProjectsPage