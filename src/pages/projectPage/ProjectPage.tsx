import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Task from '../../components/task/Task'
import TasksColumn, { ProjectStatus } from '../../components/tasksColumn/TasksColumn'
import { useAsync } from '../../hooks/useAsync'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { selectProject } from '../../redux/project/projectSeleсtor'
import { setProject } from '../../redux/project/projectSlice'
import { Project } from '../../redux/project/projectTypes'
import { useAppDispatch } from '../../redux/store'
import { getProject } from '../../services/project'
import "./projectPage.scss"

const projectStatuses: ProjectStatus[] = ['Queue', 'Development', 'Done']


const ProjectPage = () => {
    const dispath = useAppDispatch()
    const { id } = useParams<string>()
    const { loading, error, value: project } = useAsync(() => getProject(id));
    useEffect(() => {
        if (project) dispath(setProject({ project }))
    }, [project])
    const { project: projectFromStore } = useSelector(selectProject)
    const { isDragging, listTasks, handleDragging, handleUpdateList } = useDragAndDrop(projectFromStore)

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Something went wrong...</h1>;

    // console.log(listTasks)
    return (
        <div className='columns'>
            {projectStatuses.map(status => <TasksColumn
                key={status}
                status={status}
                tasks={listTasks}
                isDragging={isDragging}
                handleDragging={handleDragging}
                handleUpdateList={handleUpdateList} />)}
        </div>
    )
}

export default ProjectPage