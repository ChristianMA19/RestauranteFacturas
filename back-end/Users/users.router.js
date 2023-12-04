import {createUser,deleteUser,login,patchUser,} from "./users.controller.js";
import { Router } from "express";
const router = Router();

// Endpoint GET
router.get("/:email/:pass", login);

// Endpoint POST
router.post("/", createUser);

// Endpoint PATCH
router.patch("/", patchUser);

// Endpoint DELETE
router.delete("/", deleteUser);

export default router;
