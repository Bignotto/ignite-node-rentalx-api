import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("Missing token.");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "389065117dba07a3fee26dbe2db07b40"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) throw new AppError("User invalid credentials.");

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Wierd authorization");
  }
}