import { useState } from 'react'
import { Data, data } from '../../assets/data'
import Task from '../../components/task/Task'
import TasksColumn, { ProjectStatus } from '../../components/tasksColumn/TasksColumn'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import "./projectPage.scss"

const projectStatuses: ProjectStatus[] = ['queue', 'development', 'done']

const ProjectPage = () => {
    const { isDragging, listItems, handleDragging, handleUpdateList } = useDragAndDrop(data)

    return (
        <div className='columns'>
            {projectStatuses.map(status => <TasksColumn
                key={status}
                status={status}
                items={listItems}
                isDragging={isDragging}
                handleDragging={handleDragging}
                handleUpdateList={handleUpdateList} />)}
        </div>
    )
}

export default ProjectPage