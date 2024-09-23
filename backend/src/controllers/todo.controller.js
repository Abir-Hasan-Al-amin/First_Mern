import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../models/todo.model.js";
import { SubTodo } from "../models/sub_todo.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
const addTodo = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (content.trim() === "") {
    return res.status(400).json(new ApiResponse(400, {}, "Content is empty"));
  }

  const todo = await Todo.create({
    content,
    complete: false,
    subTodo: [],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, todo, "Todo created successfully"));
});

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  if (!todos) {
    throw ApiError(500, "Cannot find todo");
  }
  return res.status(200).json(new ApiResponse(200, todos, "All todos"));
});
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, complete } = req.body;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Todo data not Found"));
  }
  if (complete !== undefined) {
    todo.complete = complete;
  }
  if (content !== undefined && content.trim() !== "") {
    todo.content = content;
  }
  const updateTodo = await todo.save();
  if (!updateTodo) {
    throw new ApiError(500, "Cannot Update data");
  }
  return res.status(200).json(new ApiResponse(200, updateTodo, "Todo Updated"));
});
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    return res.status(404).json(new ApiResponse(404, {}, "Todo not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Todo deleted successfully"));
});
const addSubTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (content.trim() == "") {
    return res.status(404).json(new ApiResponse(404, {}, "Content is empty"));
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json(new ApiResponse(404, {}, "Todo not found"));
  }

  const subTodo = await SubTodo.create({
    content,
    complete: false,
  });

  todo.subTodo.push(subTodo._id);
  const updatedTodo = await todo.save();
  return res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "SubTodo added successfully"));
});

const getSubTodos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id).populate("subTodo");

  if (!todo) {
    return res.status(404).json(new ApiResponse(404, {}, "Todo not found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, todo.subTodo, "SubTodos retrieved successfully")
    );
});

const updateSubTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content, complete } = req.body;

    const subTodo = await SubTodo.findById(id);

    if (!subTodo) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "SubTodo not found"));
    }

    if (complete !== undefined) {
      subTodo.complete = complete;
    }
    if (content !== undefined && content.trim() !== "") {
      subTodo.content = content;
    }

    const updatedSubTodo = await subTodo.save();

    if (!updatedSubTodo) {
      throw new ApiError(500, "Failed to update SubTodo");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedSubTodo, "SubTodo updated successfully"));
});

const deleteSubTodo=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    
  const subTodo = await SubTodo.findByIdAndDelete(id);

  if (!subTodo) {
    return res.status(404).json(new ApiResponse(404, {}, "Todo not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Sub Todo deleted successfully"));
});

export { addTodo, getTodos, updateTodo, deleteTodo, addSubTodo, getSubTodos,updateSubTodo,deleteSubTodo };
