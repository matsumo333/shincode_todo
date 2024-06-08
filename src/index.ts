import express from "express";
import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";


const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();
app.get("/allTodos", async (req: Request, res: Response) => {
    try {
        const allTodos = await prisma.todo.findMany();
        return res.json(allTodos);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/createTodo", async (req: Request, res: Response) => {
    try {
        const {title,isCompleted}=req.body;
        const createTodo = await prisma.todo.create({
            data:{
                title,
                isCompleted,
            }
        });
        return res.json(createTodo);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
    try {
        const id =Number(req.params.id);
        const {title,isCompleted}=req.body;
        const editTodo = await prisma.todo.update({
            where:{id},
            data:{
                title,
                isCompleted,
            }
        });
        return res.json(editTodo);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
    try {
        const id =Number(req.params.id);
        const editTodo = await prisma.todo.delete({
            where:{id},
        });
        return res.json(editTodo);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(PORT, () => console.log("server is running on port " + PORT));

