import { supabase } from "../utils/supabaseClient";
import { Task } from "../interfaces/todoItem";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

// Hämta alla uppgifter för en användare
export async function fetchTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data as Task[];
}

/**  lägg till en uppgift */
export async function addTaskDB(
  userId: string,
  task: string
): Promise<PostgrestSingleResponse<Task>> {
  return supabase
    .from("todos")
    .insert([{ user_id: userId, task, completed: false }])
    .select()
    .single();
}

/** Uppdatera en uppgift */
export async function updateTask(
  id: string,
  updates: Partial<Pick<Task, "completed" | "task">>
): Promise<PostgrestSingleResponse<Task>> {
  return supabase.from("todos").update(updates).eq("id", id).select().single();
}

/** Ta bort en uppgift */
export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
}

/** Radera alla uppgifter för en användare */
export async function clearTasks(userId: string): Promise<void> {
  const { error } = await supabase.from("todos").delete().eq("user_id", userId);
  if (error) throw error;
}
