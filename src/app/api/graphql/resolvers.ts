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
      return prisma.user.findMany();
    },
    event: async (_: any, { id }: { id: string }) => {
      return prisma.event.findUnique({
        where: { id: id },
        include: {
          user: true,
        },
      });
    },
    events: () => {
      return prisma.event.findMany();
    },
  },

  Mutation: {
    createUser: async (_: any, { input }: any) => {
      return await prisma.user.create({
        data: input,
      });
    },
    createEvent: async (_: any, { input, userId }: any) => {
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
          user: {
            connect: { id: userId },
          },
        },
      });
      return event;
    },
    updateEvent: async (_: any, { id, input }: any) => {
      const updatedEvent = await prisma.event.update({
        where: { id: id },
        data: input,
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
