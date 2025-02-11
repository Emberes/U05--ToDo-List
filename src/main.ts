import { signUp, signIn, signOut } from "./services/auth";
import { showTasksUI } from "./components/toDoList";
import {
  addTaskDB,
  updateTask,
  deleteTask,
  fetchTasks,
} from "./services/todoService";
import { supabase } from "./utils/supabaseClient";
import { Task } from "./interfaces/todoItem";
import { User } from "@supabase/supabase-js";

const authForm = document.querySelector<HTMLFormElement>("#auth-form");
const emailInput = document.querySelector<HTMLInputElement>("#email-input");
const passwordInput =
  document.querySelector<HTMLInputElement>("#password-input");
const signUpButton =
  document.querySelector<HTMLButtonElement>("#sign-up-button");
const signInButton =
  document.querySelector<HTMLButtonElement>("#sign-in-button");
const signOutButton =
  document.querySelector<HTMLButtonElement>("#sign-out-button");
const authStatus = document.querySelector<HTMLDivElement>("#auth-status");
const todoForm = document.querySelector<HTMLFormElement>("#todo-form");
const todoInput = document.querySelector<HTMLInputElement>("#task-input");
const todoListElement = document.querySelector<HTMLUListElement>("#todo-list");
const deleteAllButton =
  document.querySelector<HTMLButtonElement>("#delete-all");

if (
  authForm &&
  emailInput &&
  passwordInput &&
  signUpButton &&
  signInButton &&
  signOutButton &&
  authStatus &&
  todoForm &&
  todoInput &&
  todoListElement &&
  deleteAllButton
) {
  async function showTasks(user: User) {
    const onToggleComplete = (task: Task, checkbox: HTMLInputElement) => {
      updateTask(task.id, { completed: !task.completed });
      checkbox.checked = !task.completed;
    };
    const onDelete = async (task: Task) => {
      await deleteTask(task.id);
      showTasksUI(
        todoListElement!,
        await fetchTasks(user.id),
        onToggleComplete,
        onDelete,
        onEdit
      );
    };

    const onEdit = async (task: Task, newText: string) => {
      await updateTask(task.id, { task: newText });
    };

    const tasks = await fetchTasks(user.id);
    showTasksUI(todoListElement!, tasks, onToggleComplete, onDelete, onEdit);
  }

  signUpButton.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (email && password) {
      try {
        const user = await signUp(email, password);
        if (!user) return;

        authStatus.textContent = `Logged in as: ${user.email}`;
        authForm.classList.add("hidden");
        todoForm.classList.remove("hidden");
        deleteAllButton.classList.remove("hidden");
        signOutButton.classList.remove("hidden");
        showTasks(user);
      } catch (error: unknown) {
        if (error instanceof Error) {
          authStatus.textContent = `Sign up failed: ${error.message}`;
          console.error("Sign up failed:", error);
        }
      }
    }
  });

  signInButton.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (email && password) {
      try {
        const user = await signIn(email, password);
        if (!user) return;

        authStatus.innerHTML = `Logged in as: ${user?.email}`;
        authForm.classList.add("hidden");
        todoForm.classList.remove("hidden");
        deleteAllButton.classList.remove("hidden");
        signOutButton.classList.remove("hidden");
        showTasks(user);
      } catch (error: unknown) {
        if (error instanceof Error) {
          authStatus.innerHTML = `Sign in failed: ${error.message}`;
          console.error("Sign in failed:", error);
        }
      }
    }
  });

  signOutButton.addEventListener("click", async () => {
    try {
      await signOut();
      authStatus.textContent = "Signed out";
      todoListElement.textContent = "";
      authForm.classList.remove("hidden");
      todoForm.classList.add("hidden");
      deleteAllButton.classList.add("hidden");
      signOutButton.classList.add("hidden");
    } catch (error: unknown) {
      if (error instanceof Error) {
        authStatus.textContent = `Sign out failed: ${error.message}`;
        console.error("Sign out failed:", error);
      }
    }
  });

  todoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const task = todoInput.value.trim();
    if (!task) return;

    const user = await supabase.auth
      .getUser()
      .then((response) => response.data.user);
    if (!user) return;

    const { error } = await addTaskDB(user.id, task);
    if (error) {
      console.error("Error adding task:", error.message);
      return;
    }
    todoInput.value = "";
    showTasks(user);
  });

  deleteAllButton.addEventListener("click", async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("todos").delete().eq("user_id", user.id);

    todoListElement.textContent = "";
    showTasks(user);
  });

  document.addEventListener("DOMContentLoaded", async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      authStatus.textContent = `Logged in as: ${user.email}`;
      authForm.classList.add("hidden");
      todoForm.classList.remove("hidden");
      deleteAllButton.classList.remove("hidden");
      signOutButton.classList.remove("hidden");
      showTasks(user);
    } else {
      authStatus.textContent = "Not logged in";
      authForm.classList.remove("hidden");
      todoForm.classList.add("hidden");
      deleteAllButton.classList.add("hidden");
      signOutButton.classList.add("hidden");
    }
  });
} else {
  console.error("Failed to initialize the to-do list.");
}
