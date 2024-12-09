import prisma from '../libs/prisma';
import { TemplateMessageDto } from '../dto/template-message-dto';

export const getAllTemplateMessage = async (storeId: number) => {
  return await prisma.template_Message.findMany({
    where: {
      storeId,
    },
  });
};

export const createTemplateMessage = async (
  templateMessage: TemplateMessageDto,
) => {
  return await prisma.template_Message.create({
    data: {
      storeId: Number(templateMessage.storeId),
      message: templateMessage.message,
      title: templateMessage.title,
    },
  });
};

export const deleteTemplateMessage = async (id: number) => {
  return await prisma.template_Message.delete({
    where: {
      id,
    },
  });
};

export const updateTemplateMessage = async (
  id: number,
  templateMessage: TemplateMessageDto,
) => {
  return await prisma.template_Message.update({
    where: {
      id,
    },
    data: {
      message: templateMessage.message,
      title: templateMessage.title,
    },
  });
};
