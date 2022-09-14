import { Request, Response } from 'express';
import prisma from '../primaClient/prismaClient';

class GameController {
  async index(req: Request, res: Response) {
    const data = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            Ad: true,
          },
        },
      },
    });

    return res.status(200).json({ data });
  }
}

export default new GameController();
