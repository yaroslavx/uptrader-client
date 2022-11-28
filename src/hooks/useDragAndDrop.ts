import { useState } from 'react';
import { Data } from '../assets/data';
import { ProjectStatus } from '../components/tasksColumn/TasksColumn';

export const useDragAndDrop = (initialState: Data[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<Data[]>(initialState);

  const handleUpdateList = (id: number, status: ProjectStatus) => {
    let card = listItems.find((item) => item.id === id);

    if (card && card.status !== status) {
      card.status = status;

      setListItems((prev) => [card!, ...prev.filter((item) => item.id !== id)]);
    }
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
