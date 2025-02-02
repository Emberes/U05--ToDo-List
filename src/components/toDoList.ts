// import { fetchTasks, updateTask, deleteTask } from "../services/todoService";
import { Task } from "../interfaces/todoItem";
// import { supabase } from "../utils/supabaseClient";

export async function showTasksUI(
  taskList: HTMLUListElement,
  tasks: Task[],
  onToggleComplete: (task: Task, checkbox: HTMLInputElement) => void,
  onDelete: (task: Task) => void,
  onEdit: any
): Promise<void> {
  // clear taskList before adding tasks
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("change", () => {
      onToggleComplete(task, checkbox);
      taskText.classList.toggle("completed", checkbox.checked);
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.task;
    console.log(task.task);
    taskText.classList.add("task-text");
    if (task.completed) {
      taskText.classList.add("completed");
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttons");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    editButton.addEventListener("click", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = task.task;
      editInput.classList.add("edit-input");

      const saveButton = document.createElement("button");
      saveButton.innerHTML = '<i class="fa-solid fa-check"></i>';
      saveButton.classList.add("save-btn");

      saveButton.addEventListener("click", async () => {
        const updatedTask = editInput.value.trim();
        if (updatedTask) {
          await onEdit(task, updatedTask);
          taskText.textContent = updatedTask;
          listItem.replaceChild(taskText, editInput);
          buttonContainer.replaceChild(editButton, saveButton);
        }
      });

      listItem.replaceChild(editInput, taskText);
      buttonContainer.replaceChild(saveButton, editButton);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => onDelete(task));

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(buttonContainer);

    taskList.appendChild(listItem);
  });
}
