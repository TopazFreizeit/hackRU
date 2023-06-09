import React, { TextareaHTMLAttributes, useRef, useState } from "react";
import { Task } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";

const InputCheckbox: React.FC<{
  label: string;
  isChecked: boolean;
  setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) => {
  return (
    <label className="mb-0 flex items-center cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
        )}
      </div>
      <span className="order-1 flex-1">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev: boolean) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask: React.FC<{
  onClose: () => void;
  task?: Task;
  nameForm: string;
  onConfirm: (task: Task) => void;
}> = ({ onClose, task, nameForm, onConfirm }) => {
  const directories = useAppSelector((state) => state.tasks.directories);

  const today: Date = new Date();
  let day: number = today.getDate();
  let month: number = today.getMonth() + 1;
  const year: number = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate: string = year + "-" + month + "-" + day;
  const maxDate: string = year + 1 + "-" + month + "-" + day;

  const [description, setDescription] = useState<string>(() => {
    if (task) {
      return task.description;
    }
    return "";
  });
  const [title, setTitle] = useState<string>(() => {
    if (task) {
      return task.title;
    }
    return "";
  });
  const [date, setDate] = useState<string>(() => {
    if (task) {
      return task.date;
    }
    return todayDate;
  });
  const isTitleValid = useRef<Boolean>(false);
  const isDateValid = useRef<Boolean>(false);

  const [isImportant, setIsImportant] = useState<boolean>(() => {
    if (task) {
      return task.important;
    }
    return false;
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    if (task) {
      return task.completed;
    }
    return false;
  });

  const [selectedDirectory, setSelectedDirectory] = useState<string>(() => {
    if (task) {
      return task.dir;
    }
    return directories[0];
  });

  const addNewTaskHandler = (event: React.FormEvent): void => {
    debugger;
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current) {
      const newTask: Task = {
        title: title,
        dir: selectedDirectory,
        description: description,
        date: date,
        completed: isCompleted,
        important: isImportant,
        id: task?.id ? task.id : Date.now().toString(),
      };
      onConfirm(newTask);
      onClose();
    }
  };

  const [name, setName] = useState("");

  const handleInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };
  const [comments, setComments] = useState("");

  const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComments(event.target.value);
  };
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setDescription(textarea.value);
  };

  const handleSubmit = async () => {
    console.log(`IM HERE`);
    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:8000/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          manager_input: comments,
          isSus: isImportant,
          category: category,
        }),
      });

      const data = await response.json();
      console.log(data);
      setDescription(data);
    } catch (error) {
      console.error(error);
    }
    setIsProcessing(false);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <Modal onClose={onClose} title={nameForm}>
      <form
        className="flex flex-col stylesInputsField"
        style={{ maxHeight: "400px", overflowY: "auto", flex: "true" }}
        onSubmit={addNewTaskHandler}
      >
        <input
          type="text"
          value={name}
          placeholder="Type Here The Employee Name"
          onChange={handleInputNameChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Type Here Any Comments To Generate More Personalized Goal"
          onChange={handleCommentsChange}
          style={{ marginBottom: "10px" }}
        />
      <label>
          Category
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full"
          >
            <option value="">-- Select a category --</option>
            <option value="WorkProductivity">Work Productivity</option>
            <option value="Fitness">Fitness</option>
            <option value="CommunityContribute">Community Contribute</option>
            <option value="Sustainability">Sustainability</option>
            {/* add more options as needed */}
          </select>
        </label>
        {name && (
          <button type="button" className="btn mt-5" onClick={handleSubmit}>
            {isProcessing ? "Processing..." : "Generate Achievement"}
          </button>
        )}
        <label>
          Description
          <textarea
            placeholder="e.g, study for the test"
            className="w-full"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            onInput={handleInput}
            style={{ height: "auto", minHeight: "100px", resize: "none" }}
            rows={Math.max(3, description.split("\n").length)}
          ></textarea>
        </label>
        <label>
          Title
          <input
            type="text"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Date
          <input
            type="date"
            className="w-full"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </label>
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <label>
          Select a directory
          <select
            className="block w-full"
            value={selectedDirectory}
            onChange={({ target }) => setSelectedDirectory(target.value)}
          >
            {directories.map((dir: string) => (
              <option
                key={dir}
                value={dir}
                className="bg-slate-100 dark:bg-slate-800"
              >
                {dir}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn mt-5">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
