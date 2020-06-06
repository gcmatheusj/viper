import { Injectable } from '@nestjs/common';
import RepositoryService from './repository/repository.service';

@Injectable()
export class AppService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async getHello(): Promise<string> {
    return `Total books are ${await this.repositoryService.bookRepository.count()}`;
  }
}
