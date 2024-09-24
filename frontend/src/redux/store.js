import {configureStore} from "@reduxjs/toolkit";
import todosReducer from "./slices/todosSlice.js"

const store=configureStore({
    reducer: {
        todos: todosReducer,
    },
});
export default store;