import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  addSubTodo,
  getSubTodos,
  updateSubTodo,
  deleteSubTodo
} from '../../api/todoApi.js';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (thunkAPI) => {
  try {
    const todos = await getTodos();
    return todos;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createTodo = createAsyncThunk('todos/createTodo', async (todoData, thunkAPI) => {
  try {
    const todo = await addTodo(todoData);
    return todo;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, todoData }, thunkAPI) => {
  try {
    const updatedTodo = await updateTodo(id, todoData);
    return updatedTodo;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id, thunkAPI) => {
  try {
    await deleteTodo(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createSubTodo = createAsyncThunk('todos/createSubTodo', async ({ todoId, subTodoData }, thunkAPI) => {
  try {
    const subTodo = await addSubTodo(todoId, subTodoData);
    return subTodo;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchSubTodos = createAsyncThunk('todos/fetchSubTodos', async (todoId, thunkAPI) => {
  try {
    const subTodos = await getSubTodos(todoId);
    return subTodos;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editSubTodo = createAsyncThunk('todos/editSubTodo', async ({ subTodoId, subTodoData }, thunkAPI) => {
  try {
    const updatedSubTodo = await updateSubTodo(subTodoId, subTodoData);
    return updatedSubTodo;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeSubTodo = createAsyncThunk('todos/removeSubTodo', async (subTodoId, thunkAPI) => {
  try {
    await deleteSubTodo(subTodoId);
    return subTodoId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null, // To store any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload; 
      })
      // Add todo
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update todo
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.error = action.payload; 
      })
      // Delete todo
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Fetch subtodos
      .addCase(fetchSubTodos.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.meta.arg);
        if (index !== -1) {
          state.items[index].subtodos = action.payload;
        }
      })
      .addCase(fetchSubTodos.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Add subtodo
      .addCase(createSubTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.meta.arg.todoId);
        if (index !== -1) {
          state.items[index].subtodos.push(action.payload);
        }
      })
      .addCase(createSubTodo.rejected, (state, action) => {
        state.error = action.payload; 
      })
      // Update subtodo
      .addCase(editSubTodo.fulfilled, (state, action) => {
        const todoIndex = state.items.findIndex((todo) => todo.subtodos.some(sub => sub.id === action.payload.id));
        if (todoIndex !== -1) {
          const subTodoIndex = state.items[todoIndex].subtodos.findIndex(sub => sub.id === action.payload.id);
          if (subTodoIndex !== -1) {
            state.items[todoIndex].subtodos[subTodoIndex] = action.payload;
          }
        }
      })
      .addCase(editSubTodo.rejected, (state, action) => {
        state.error = action.payload; 
      })
      // Delete subtodo
      .addCase(removeSubTodo.fulfilled, (state, action) => {
        const todoIndex = state.items.findIndex((todo) => todo.subtodos.some(sub => sub.id === action.payload));
        if (todoIndex !== -1) {
          state.items[todoIndex].subtodos = state.items[todoIndex].subtodos.filter(sub => sub.id !== action.payload);
        }
      })
      .addCase(removeSubTodo.rejected, (state, action) => {
        state.error = action.payload; 
      });
  },
});

export default todosSlice.reducer;
