import { FC, useEffect, useState } from "react"
import { ProjectStatus } from "../tasksColumn/TasksColumn"
import { HiOutlineChat } from 'react-icons/hi'
import "./task.scss"
import TaskModal from "./taskModal/TaskModal"
import { TaskType } from "../../redux/task/taskTypes"
import { useAppDispatch } from "../../redux/store"
import { setTask } from "../../redux/task/taskSlice"
import { useAsync } from "../../hooks/useAsync"
import { getUser } from "../../services/user"

type TaskProps = {
    task: TaskType
    handleDragging: (dragging: boolean) => void
}

const Task: FC<TaskProps> = ({ task, handleDragging }: TaskProps) => {
    const dispatch = useAppDispatch()

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', `${task.id}`)
        handleDragging(true)
    }

    const handleDragEnd = () => handleDragging(false)

    const [openedModal, setOpenedModal] = useState(false)
    const openCloseTask = () => {
        dispatch(setTask({ task }))
        setOpenedModal(prev => !prev)
    }

    return (
        <>
            <div className="task_container" draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <span className="task_number">{task.id.slice(0, 3)}</span>
                <div className="task_comments" onClick={openCloseTask}><HiOutlineChat /></div>
                <h2 className="task_title">{task.title}</h2>
                {/* <p className="task_description">Description</p> */}
                {/* <span className="date_creation">01.01.2021</span> */}
                {/* <span className="development_time">60 days</span> */}
                <span className="date_done">{(new Date(task.finishAt)).toDateString()}</span>
                <div className="priority_status">
                    <span className="task_priority">{task.priority}</span>
                    <span className={`task_status ${task.status.toLowerCase()}`}>{task.status}</span>
                </div>
                {/* <div className="task_files">some files</div> */}
            </div >
            {openedModal && <TaskModal close={openCloseTask} />}
        </>

    )
}

export default Task