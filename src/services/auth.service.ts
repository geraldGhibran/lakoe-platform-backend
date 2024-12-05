import { validateData } from '../utils/validateData';
import { LoginDto, RegisterDto } from '../dto/auth-dto';
import prisma from '../libs/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema } from '../libs/validator/registerSchema';

export const register = async (registerInfo: RegisterDto) => {
  const validUser = validateData(registerSchema, registerInfo);

  if (!validUser.success) {
    throw new Error(validUser.error);
  }

  const existedUser = await prisma.user.findUnique({
    where: {
      email: registerInfo.email,
    },
  });

  if (existedUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(registerInfo.password, 10);

  const createdUSer = await prisma.user.create({
    data: {
      ...registerInfo,
      password: hashedPassword,
      role: 'SELLER',
      location: undefined,
      store: {
        create: {
          name: registerInfo.name,
        },
      },
    },
  });
  return createdUSer;
};

export const login = async (loginInfo: LoginDto) => {
  const user = await prisma.user.findUnique({
    where: {
      email: loginInfo.email,
    },
  });
  if (!user) {
    throw new Error('Email or Password is Incorrect');
  }
  const isValidPassword = await bcrypt.compare(
    loginInfo.password,
    user.password,
  );

  if (!isValidPassword) {
    throw new Error('Email or Password is Incorrect');
  }
  const token = jwt.sign(
    {
      id: user.id,
      username: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: '1d',
    },
  );
  const { password, ...userWithoutPassword } = user;
  return {
    userWithoutPassword,
    token,
  };
};
