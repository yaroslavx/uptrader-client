import { FC, useCallback, useState } from "react"
import { FileNode, root } from "../../../assets/comments"
import './taskModal.scss'

export type TaskModal = {
    close: () => void
}

const File: React.FC<FileNode> = ({ id, children }: FileNode) => {
    const [showChildren, setShowChildren] = useState<boolean>(false);
    const handleClick = useCallback(() => {
        setShowChildren(!showChildren);
    }, [showChildren, setShowChildren])

    return (
        <div>
            <span onClick={handleClick}>
                <h4 style={{ fontWeight: showChildren ? 'bold' : 'normal' }}>{id}</h4>
            </span>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', left: 25, borderLeft: '1px solid', paddingLeft: 15 }}>
                {showChildren && (children ?? []).map((node: FileNode) => <File {...node} />)}
            </div>
        </div>
    )
}

const TaskModal: FC<TaskModal> = ({ close }: TaskModal) => {

    return (
        <div onClick={close} className='task_modal_container'>
            <div onClick={e => e.stopPropagation()} className="task_modal">
                <div style={{ marginLeft: 15 }}>
                    <File {...root} />
                </div>
            </div>
        </div>
    )
}

export default TaskModal