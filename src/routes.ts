import { Router } from "express";
import { GameController } from "./controllers/gameController";

const router = Router();

const gameController = new GameController();

router.get("/games", gameController.list);

router.get("/game/:id", gameController.find);

router.post("/game", gameController.create);

router.put("/game/:id", gameController.update);

router.delete("/game/:id", gameController.remove);

export default router;