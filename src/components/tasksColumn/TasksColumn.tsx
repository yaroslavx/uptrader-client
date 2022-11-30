import { FC, ReactNode } from "react"
import { TaskType } from "../../redux/task/taskTypes"
import Task from "../task/Task"
import "./tasksColumn.scss"

export type ProjectStatus = 'Queue' | 'Development' | 'Done'

type TasksColumn = {
    status: ProjectStatus
    children?: ReactNode
    tasks: TaskType[]
    isDragging: boolean
    handleDragging: (dragging: boolean) => void
    handleUpdateList: (id: string, status: ProjectStatus) => void
}

const TasksColumn: FC<TasksColumn> = ({ tasks = [], status, isDragging, handleDragging, handleUpdateList, children }: TasksColumn) => {
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text')
        handleUpdateList(id, status)
        handleDragging(false)
    }

    return (
        <div className={`column_container ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            <div className="column">
                <h2>{status}</h2>
                <div className="column_tasks">
                    {tasks.map(task => (status === task.status && <Task key={task.id} task={task} handleDragging={handleDragging} />))}
                </div>
            </div>
        </div>
    )
}

export default TasksColumn