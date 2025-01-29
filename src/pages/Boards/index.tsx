import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [columns, setColumns] = useState<Columns>(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [taskToEdit, setTaskToEdit] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (columnId: any, taskToEdit: any = null) => {
    setSelectedColumn(columnId);
    setTaskToEdit(taskToEdit);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData: any) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
    setColumns(newBoard);
  };

  const handleUpdateTask = (taskData: any) => {
    const newBoard = { ...columns };
    const column = newBoard[selectedColumn];
    const taskIndex = column.items.findIndex((task: any) => task.id === taskData.id);
    if (taskIndex !== -1) {
      column.items[taskIndex] = taskData;
      setColumns(newBoard);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const newBoard = { ...columns };
    Object.entries(newBoard).forEach(([columnId, column]: any) => {
      const taskIndex = column.items.findIndex((task: any) => task.id === taskId);
      if (taskIndex !== -1) {
        column.items.splice(taskIndex, 1);
        setColumns(newBoard);
      }
    });
  };

  const filterTasks = (tasks: any[]) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
      <Navbar onSearch={setSearchQuery} />

      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
          {Object.entries(columns).map(([columnId, column]: any) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {filterTasks(column.items).map((task: any, index: any) => (
                      <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                        {(provided: any) => (
                          <Task
                            provided={provided}
                            task={task}
                            onEdit={() => openModal(columnId, task)}
                            onDelete={() => handleDeleteTask(task.id)}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {columnId === "in-progress" && (
                <div
                  onClick={() => openModal(columnId)}
                  className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                >
                  <AddOutline color={"#555"} />
                  Add Task
                </div>
              )}
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
        taskToEdit={taskToEdit}
      />
    </>
  );
};

export default Home;
