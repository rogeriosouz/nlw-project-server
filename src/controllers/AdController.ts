import { Request, Response } from 'express';
import prisma from '../primaClient/prismaClient';
import { converteMinutesToHourString } from '../utils/converte-minutes-to-hour-string';
import { converterHoursStringToMinutes } from '../utils/converter-hour-string-to-minutes';

class AdController {
  async showGameId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const data = await prisma.ad.findMany({
        select: {
          id: true,
          name: true,
          weekDays: true,
          useVoiceChannel: true,
          yearsPlaying: true,
          hoursStart: true,
          hourEnd: true,
        },
        where: {
          gameId: id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return res.status(200).json({
        data: data.map((ad) => {
          return {
            ...ad,
            weekDays: ad.weekDays.split('.'),
            hoursStart: converteMinutesToHourString(ad.hoursStart),
            hourEnd: converteMinutesToHourString(ad.hourEnd),
          };
        }),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ erorr: 'Error internal server' });
    }
  }

  async create(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const {
        weekDays,
        name,
        discord,
        useVoiceChannel,
        yearsPlaying,
        hoursStart,
        hourEnd,
      } = req.body;

      const data = await prisma.ad.create({
        data: {
          gameId: id,
          name,
          weekDays: weekDays.join(','),
          discord,
          useVoiceChannel,
          yearsPlaying,
          hoursStart: converterHoursStringToMinutes(hoursStart),
          hourEnd: converterHoursStringToMinutes(hourEnd),
        },
      });

      return res.status(201).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ erorr: 'Error internal server' });
    }
  }

  async showDiscordId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const data = await prisma.ad.findUniqueOrThrow({ where: { id } });

      return res.status(200).json({
        discord: data.discord,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ erorr: 'Error internal server' });
    }
  }
}

export default new AdController();
