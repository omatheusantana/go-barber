import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const svc = container.resolve(CreateUserService);
    const user = await svc.execute({ name, email, password });
    delete user.password;
    return response.json(user);
  }
}
