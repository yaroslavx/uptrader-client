import { FC } from "react"
import { Data } from "../../assets/data"
import { ProjectStatus } from "../tasksColumn/TasksColumn"
import "./task.scss"

type Task = {
    data: Data
    handleDragging: (dragging: boolean) => void
}

const Task: FC<Task> = ({ data, handleDragging }: Task) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', `${data.id}`)
        handleDragging(true)
    }

    const handleDragEnd = () => handleDragging(false)

    return (
        <div className="task_container" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <span className="task_number">{data.id}</span>
            <h2 className="task_title">{data.title}</h2>
            {/* <p className="task_description">Description</p> */}
            {/* <span className="date_creation">01.01.2021</span> */}
            {/* <span className="development_time">60 days</span> */}
            <span className="date_done">{data.doneDate}</span>
            <div className="priority_status">
                <span className="task_priority">{data.priority}</span>
                <span className={`task_status ${data.status.toLowerCase()}`}>{data.status}</span>
            </div>
            {/* <div className="task_files">some files</div> */}

        </div >
    )
}

export default Task