import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    user: (_: any, { id }: { id: string }) => {
      return prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          events: true,
        },
      });
    },
    users: () => {
      return prisma.user.findMany({
        include: {
          events: true,
        },
      });
    },
    event: async (_: any, { id }: { id: string }) => {
      return prisma.event.findUnique({
        where: { id: id },
        include: {
          user: true,
        },
      });
    },
    events: (_: any, { id }: { id: string }) => {
      return prisma.event.findMany({
        where: { userId: id },
      });
    },
    eventByType: (_: any, { id, type }: { id: string; type: string }) => {
      return prisma.event.findMany({
        where: {
          userId: id,
          type: type,
        },
      });
    },
  },

  Mutation: {
    createUser: async (_: any, { input }: any) => {
      return await prisma.user.create({
        data: input,
      });
    },
    updateUser: async (_: any, { input, id }: any) => {
      return await prisma.user.update({
        where: {
          id: id,
        },
        data: input,
      });
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await prisma.event.deleteMany({
        where: {
          userId: id,
        },
      });
      return await prisma.user.delete({
        where: {
          id: id,
        },
      });
    },
    createEvent: async (_: any, { input, id }: { input: any; id: string }) => {
      const event = await prisma.event.create({
        data: {
          attendees: input.attendees,
          color: input.color,
          date: input.date,
          description: input.description,
          duration: input.duration,
          hr: input.hr,
          mn: input.mn,
          remainder: input.remainder,
          title: input.title,
          type: input.type,
          createdAt: input.createdAt,
          coordinates: input.coordinates,
          user: {
            connect: { id: id },
          },
        },
      });
      return event;
    },
    updateEvent: async (_: any, { id, input }: any) => {
      const updatedEvent = await prisma.event.update({
        where: { id: id },
        data: {
          attendees: input.attendees,
          color: input.color,
          date: input.date,
          description: input.description,
          duration: input.duration,
          hr: input.hr,
          mn: input.mn,
          remainder: input.remainder,
          title: input.title,
          type: input.type,
          coordinates: input.coordinates,
        },
        include: {
          user: true,
        },
      });
      return updatedEvent;
    },
    deleteEvent: async (_: any, { id }: any) => {
      const updatedEvent = await prisma.event.delete({
        where: { id: id },
      });
      return updatedEvent;
    },
  },
};

export default resolvers;
