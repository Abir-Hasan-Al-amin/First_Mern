import { Router } from "express";
import { addTodo } from "../controllers/todo.controller";
const router=Router();
router.route("/addTodo").post(addTodo);
export default router;