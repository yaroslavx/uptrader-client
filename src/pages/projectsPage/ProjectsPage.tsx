import ProjectCard from '../../components/projectCard/ProjectCard'
import { useAsync } from '../../hooks/useAsync';
import { Project } from '../../redux/project/projectTypes';
import { getProjects } from '../../services/project';
import "./projectsPage.scss"

const ProjectsPage = () => {
    console.log('Rerender from ProjectsPage')

    const { loading, error, value: projects } = useAsync(getProjects);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Something went wrong...</h1>;

    return (
        <div className='projects_container'>
            <div className='project_cards'>
                {projects !== undefined && (projects as Project[]).map(project =>
                    <ProjectCard key={project.id} title={project.title} id={project.id} />
                )}
            </div>
        </div >
    )
}

export default ProjectsPage