import { useEffect, useState } from 'react';
import Task from '../components/task/Task';
import { ProjectStatus } from '../components/tasksColumn/TasksColumn';
import { Project, TaskType } from '../redux/project/projectTypes';
import { useAppDispatch } from '../redux/store';
import { updateTaskStatus } from '../services/tasks';
import { useAsyncFn } from './useAsync';

export const useDragAndDrop = (project: Project | undefined) => {
  const dispatch = useAppDispatch();
  const columns = project && project.columns;
  const tasks: TaskType[] = [];
  columns?.forEach((column) => tasks.push(...column.tasks));
  const [isDragging, setIsDragging] = useState(false);
  const [listTasks, setListTasks] = useState<TaskType[]>(tasks);

  const updateTaskStatusFn = useAsyncFn(updateTaskStatus as any);

  useEffect(() => {
    setListTasks(tasks);
  }, [project]);

  const handleUpdateList = (id: string, status: ProjectStatus) => {
    let task = listTasks.find((task) => task.id === id);

    if (task && task.status !== status) {
      const newTask = JSON.parse(JSON.stringify(task));

      updateTaskStatusFn
        .execute({
          taskId: task.id,
          status: status,
        })
        .then((_) => {
          newTask.status = status;
          setListTasks((prev) => [
            newTask,
            ...prev.filter((task) => task.id !== id),
          ]);
        });
    }
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return {
    isDragging,
    listTasks,
    handleUpdateList,
    handleDragging,
  };
};
