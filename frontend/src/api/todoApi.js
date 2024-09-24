import axios from 'axios';
const url = process.env.API_URL;

// Todos API
export const addTodo = async (todoData) => {
  const response = await axios.post(`${url}/addTodo`, todoData);
  return { id: response.data._id, ...response.data };
};

export const getTodos = async () => {
  const response = await axios.get(`${url}/getTodos`);
  return response.data.map(todo => ({ id: todo._id, ...todo }));
};

export const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${url}/updateTodo/${id}`, todoData);
  return { id: response.data._id, ...response.data };
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${url}/deleteTodo/${id}`);
  return response.data;
};

// SubTodos API
export const addSubTodo = async (todoId, subTodoData) => {
  const response = await axios.post(`${url}/${todoId}/addSubTodo`, subTodoData);
  return { id: response.data._id, ...response.data };
};

export const getSubTodos = async (todoId) => {
  const response = await axios.get(`${url}/${todoId}/getSubTodos`);
  return response.data.map(subTodo => ({ id: subTodo._id, ...subTodo }));
};

export const updateSubTodo = async (subTodoId, subTodoData) => {
  const response = await axios.put(`${url}/updateSubTodo/${subTodoId}`, subTodoData);
  return { id: response.data._id, ...response.data };
};

export const deleteSubTodo = async (subTodoId) => {
  const response = await axios.delete(`${url}/deleteSubTodo/${subTodoId}`);
  return response.data;
};
