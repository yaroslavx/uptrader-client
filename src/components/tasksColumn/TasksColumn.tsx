import { FC, ReactNode } from "react"
import { Data } from "../../assets/data"
import Task from "../task/Task"
import "./tasksColumn.scss"

export type ProjectStatus = 'queue' | 'development' | 'done'

type TasksColumn = {
    status: ProjectStatus
    children?: ReactNode
    items: Data[]
    isDragging: boolean
    handleDragging: (dragging: boolean) => void
    handleUpdateList: (id: number, status: ProjectStatus) => void
}

const TasksColumn: FC<TasksColumn> = ({ items = [], status, isDragging, handleDragging, handleUpdateList, children }: TasksColumn) => {
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const id = +e.dataTransfer.getData('text')
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
                    {items.map(item => (status === item.status && < Task key={item.id} data={item} handleDragging={handleDragging} />))}
                </div>
            </div>
        </div>
    )
}

export default TasksColumn