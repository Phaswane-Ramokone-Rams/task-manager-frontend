/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";
import { v4 as uuidv4 } from "uuid";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (taskData: any) => void;
  handleUpdateTask: (taskData: any) => void;
  taskToEdit: any;
}

const AddModal = ({
  isOpen,
  onClose,
  setOpen,
  handleAddTask,
  handleUpdateTask,
  taskToEdit,
}: AddModalProps) => {
  const initialTaskData = {
    id: taskToEdit?.id || uuidv4(),
    title: taskToEdit?.title || "",
    description: taskToEdit?.description || "",
    priority: taskToEdit?.priority || "",
    deadline: taskToEdit?.deadline || 0,
    image: taskToEdit?.image || "",
    alt: taskToEdit?.alt || "",
    tags: taskToEdit?.tags || [],
  };

  const [taskData, setTaskData] = useState(initialTaskData);
  const [tagTitle, setTagTitle] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTaskData({ ...taskToEdit });
    }
  }, [taskToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Ensure that priority can only be 'low', 'medium', or 'high'
    if (name === "priority" && !["low", "medium", "high"].includes(value)) {
      return; // Ignore invalid value for priority
    }

    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag: Tag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskToEdit) {
      handleUpdateTask(taskData); // Update the existing task
    } else {
      handleAddTask(taskData); // Add a new task
    }
    closeModal();
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <div className="md:w-[40vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-800 focus:outline-none text-2xl"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium focus:bg-gray-200 hover:bg-gray-200 transition-all"
          />
          <input
            type="text"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium focus:bg-gray-200 hover:bg-gray-200 transition-all"
          />
          
          {/* Priority Label and Select */}
          <label htmlFor="priority" className="w-full text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            onChange={handleChange}
            value={taskData.priority}
            className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm focus:bg-gray-200 hover:bg-gray-200 transition-all"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="number"
            name="deadline"
            value={taskData.deadline}
            onChange={handleChange}
            placeholder="Deadline"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm focus:bg-gray-200 hover:bg-gray-200 transition-all"
          />
          <input
            type="text"
            value={tagTitle}
            onChange={(e) => setTagTitle(e.target.value)}
            placeholder="Tag Title"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm focus:bg-gray-200 hover:bg-gray-200 transition-all"
          />
          <button
            className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium hover:bg-slate-600 transition-all"
            onClick={handleAddTag}
            type="button"
          >
            Add Tag
          </button>
          <div className="w-full">
            {taskData.tags.length > 0 && <span>Tags:</span>}
            {taskData.tags.map((tag, index) => (
              <div
                key={index}
                className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
                style={{ backgroundColor: tag.bg, color: tag.text }}
              >
                {tag.title}
              </div>
            ))}
          </div>
          <div className="w-full flex items-center gap-4 justify-between">
            <input
              type="text"
              name="alt"
              value={taskData.alt}
              onChange={handleChange}
              placeholder="Image Alt"
              className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm focus:bg-gray-200 hover:bg-gray-200 transition-all"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-3 rounded-md h-9 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all"
          >
            {taskToEdit ? "Update Task" : "Submit Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
