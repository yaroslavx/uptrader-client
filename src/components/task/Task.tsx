import { FC, useState } from "react"
import { Data } from "../../assets/tasks"
import { ProjectStatus } from "../tasksColumn/TasksColumn"
import { HiOutlineChat } from 'react-icons/hi'
import "./task.scss"
import TaskModal from "./taskModal/TaskModal"
import { TaskType } from "../../redux/project/projectTypes"

type Task = {
    data: TaskType
    handleDragging: (dragging: boolean) => void
}

const Task: FC<Task> = ({ data, handleDragging }: Task) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', `${data.id}`)
        handleDragging(true)
    }

    const handleDragEnd = () => handleDragging(false)

    const [openedModal, setOpenedModal] = useState(false)
    const openCloseTask = () => {
        setOpenedModal(prev => !prev)
    }

    return (
        <>
            <div className="task_container" draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <span className="task_number">{data.id.slice(0, 3)}</span>
                <div className="task_comments" onClick={openCloseTask}><HiOutlineChat /></div>
                <h2 className="task_title">{data.title}</h2>
                {/* <p className="task_description">Description</p> */}
                {/* <span className="date_creation">01.01.2021</span> */}
                {/* <span className="development_time">60 days</span> */}
                <span className="date_done">{(new Date(data.finishAt)).toDateString()}</span>
                <div className="priority_status">
                    <span className="task_priority">{data.priority}</span>
                    <span className={`task_status ${data.status.toLowerCase()}`}>{data.status}</span>
                </div>
                {/* <div className="task_files">some files</div> */}
            </div >
            {openedModal && <TaskModal close={openCloseTask} />}
        </>

    )
}

export default Task