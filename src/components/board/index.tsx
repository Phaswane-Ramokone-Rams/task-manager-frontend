import { useState } from "react";
import Navbar from "../Navbar"; // Import Navbar
import Task from "../Task"; // Import Task component
import { Board } from "../../data/board"; // Import Board data
import { TaskT } from "../../types";

const TaskBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter tasks
  const filterTasks = (tasks: TaskT[]) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      <Navbar onSearch={setSearchQuery} /> {/* Pass search function */}

      <div className="p-4">
        {Object.entries(Board).map(([columnId, column]) => (
          <div key={columnId}>
            <h2 className="text-lg font-semibold">{column.name}</h2>
            <div className="grid gap-4">
              {filterTasks(column.items).map((task) => (
                <Task key={task.id} task={task} onEdit={() => {}} onDelete={() => {}} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
