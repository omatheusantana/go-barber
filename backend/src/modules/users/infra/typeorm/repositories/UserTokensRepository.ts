import { getRepository, Repository } from 'typeorm';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<User>;
  /**
   *
   */
  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }
  public async findByEmail(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    return user;
  }
}

export default UserTokensRepository;
