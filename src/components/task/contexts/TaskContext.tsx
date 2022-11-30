import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../../hooks/useAsync';
import { selectProject } from '../../../redux/project/projectSeleсtor';
import { CommentType, TaskType } from '../../../redux/project/projectTypes';
import { getTask } from '../../../services/tasks';

type ContextType = {
  task?: TaskType,
  getReplies: (parentId: string) => CommentType,
  createLocalComment: (comment: CommentType) => void,
  updateLocalComment: (id: string, message: string) => void,
  deleteLocalComment: (id: string) => void,
  rootComments: CommentType[],
}

const Context = React.createContext<ContextType | null>(null);

export const useTask = () => {
  return useContext(Context);
};

type TaskProviderProps = {
  id: string
  children: ReactNode;
};

export const TaskProvider = ({ id, children }: TaskProviderProps) => {
  const { project } = useSelector(selectProject)
  const columns = project && project.columns;
  const tasks: TaskType[] = [];
  columns?.forEach((column) => tasks.push(...column.tasks));
  const [listTasks, setListTasks] = useState<TaskType[]>([]);
  useEffect(() => {
    setListTasks(tasks);
  }, [project]);

  const task = listTasks.find(task => task.id === id)
  // const { loading, error, value: taskFromServer } = useAsync(() => getTask(id), [id]);
  // const [task, setTask] = useState<TaskType>()
  // useEffect(() => {
  //   if (taskFromServer) setTask(taskFromServer)
  // }, [taskFromServer])

  const [comments, setComments] = useState<CommentType[]>([]);
  const commentsByParentId: {} = useMemo(() => {
    if (comments == null) return {};
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  useEffect(() => {
    if (task?.comments == null) return;
    setComments(task.comments);
  }, [task?.comments]);

  const getReplies = (parentId: string) => {
    return commentsByParentId[parentId];
  };

  function createLocalComment(comment: CommentType) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function updateLocalComment(id: string, message: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  function deleteLocalComment(id: string) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== id);
    });
  }

  return (
    <Context.Provider
      value={{
        task,
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        rootComments: commentsByParentId[null],
      }}
    >
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1 className='error-msg'>{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
};
