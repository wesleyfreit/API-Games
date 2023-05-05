import { Request, Response } from "express";
import Game from "../models/Game";

type IGame = {
  title: string;
  year: number;
  price: number;
};

export class GameController {
  public async create(req: Request, res: Response) {
    const { title, year, price } = <IGame>req.body;
    if (title != "" && year < 1950 && price < 0) {
      return res
        .status(400)
        .json({ status: "invalid arguments", has_error: true });
    } else {
      try {
        await Game.create({ title, year, price });
        return res.status(200).json({ status: "created", has_error: false });
      } catch (error) {
        return res.status(400).json({ status: "error", has_error: true });
      }
    }
  }

  public async find(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const game = await Game.findByPk(id);
      if (game) {
        return res.status(200).json({ game, has_error: false });
      } else {
        return res.status(404).json({ status: "not found", has_error: true });
      }
    } catch (error) {
      return res.status(400).json({ status: "error", has_error: true });
    }
  }

  public async list(req: Request, res: Response) {
    const games = await Game.findAll({ order: [["id", "DESC"]] });
    return res.status(200).json({ games, has_error: false });
  }

  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const game = await Game.findByPk(id);

      if (game) {
        const body = <IGame>req.body;
        if (body.title != "" || body.year < 1950 || body.price < 0) {
          await Game.update({ ...body }, { where: { id } });
          return res.status(200).json({ status: "updated", has_error: false });
        } else {
          return res
            .status(400)
            .json({ status: "invalid arguments", has_error: true });
        }
      } else {
        return res.status(404).json({ status: "not found", has_error: true });
      }
    } catch (error) {
      return res.status(400).json({ status: "error", has_error: true });
    }
  }

  public async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const game = await Game.destroy({ where: { id } });
      if (game != 0) {
        return res.status(200).json({ status: "deleted", has_error: false });
      } else {
        return res.status(404).json({ status: "not found", has_error: true });
      }
    } catch (error) {
      return res.status(400).json({ status: "error", has_error: true });
    }
  }
}