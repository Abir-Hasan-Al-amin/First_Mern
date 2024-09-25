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
} from '../../api/todoApi';


const handleAsyncThunk = (builder, actionType, onSuccess) => {
  builder
    .addCase(actionType.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(actionType.fulfilled, (state, action) => {
      state.status = 'succeeded';
      onSuccess(state, action);
    })
    .addCase(actionType.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};

// Async Thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todos = await getTodos();
  return todos;
});

export const createTodo = createAsyncThunk('todos/createTodo', async (todoData) => {
  const todo = await addTodo(todoData);
  return todo;
});

export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, todoData }) => {
  const updatedTodo = await updateTodo(id, todoData);
  return updatedTodo;
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
  await deleteTodo(id);
  return id;  
});

// Async thunks for subtodos
export const createSubTodo = createAsyncThunk('todos/createSubTodo', async ({ todoId, subTodoData }) => {
  const subTodo = await addSubTodo(todoId, subTodoData);
  return subTodo;
});

export const fetchSubTodos = createAsyncThunk('todos/fetchSubTodos', async (todoId) => {
  const subTodos = await getSubTodos(todoId);
  return subTodos;
});

export const editSubTodo = createAsyncThunk('todos/editSubTodo', async ({ id, subTodoData }) => {
  const updatedSubTodo = await updateSubTodo(id, subTodoData);
  return updatedSubTodo;
});

export const removeSubTodo = createAsyncThunk('todos/removeSubTodo', async (id) => {
  await deleteSubTodo(id); 
  return id; 
});

// Redux Slice
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncThunk(builder, fetchTodos, (state, action) => {
      state.items = action.payload;
    });

    handleAsyncThunk(builder, createTodo, (state, action) => {
      state.items.push(action.payload);
    });

    handleAsyncThunk(builder, editTodo, (state, action) => {
      const index = state.items.findIndex((todo) => todo._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });

    handleAsyncThunk(builder, removeTodo, (state, action) => {
      state.items = state.items.filter((todo) => todo._id !== action.payload);
    });

    handleAsyncThunk(builder, fetchSubTodos, (state, action) => {
      const index = state.items.findIndex((todo) => todo._id === action.meta.arg);
      if (index !== -1) {
        state.items[index].subtodos = action.payload;
      }
    });

    handleAsyncThunk(builder, createSubTodo, (state, action) => {
      const index = state.items.findIndex((todo) => todo._id === action.meta.arg.todoId);
      if (index !== -1) {
        state.items[index].subtodos.push(action.payload);
      }
    });

    handleAsyncThunk(builder, editSubTodo, (state, action) => {
      const todoIndex = state.items.findIndex((todo) => 
        todo.subtodos && todo.subtodos.find((sub) => sub._id === action.payload._id)
      );
      if (todoIndex !== -1) {
        const subTodoIndex = state.items[todoIndex].subtodos.findIndex(
          (subTodo) => subTodo._id === action.payload._id
        );
        if (subTodoIndex !== -1) {
          state.items[todoIndex].subtodos[subTodoIndex] = action.payload;
        }
      }
    });

    handleAsyncThunk(builder, removeSubTodo, (state, action) => {
      const todoIndex = state.items.findIndex((todo) => 
        todo.subtodos && todo.subtodos.find((sub) => sub._id === action.payload)
      );
      if (todoIndex !== -1) {
        state.items[todoIndex].subtodos = state.items[todoIndex].subtodos.filter(
          (subTodo) => subTodo._id !== action.payload
        );
      }
    });
  },
});

export default todosSlice.reducer;
