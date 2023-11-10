import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      user: { id },
    };
    if (!newTransaction) throw new BadRequestException('Smth went wrong');
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number) {
    return await this.transactionRepository.find({
      where: {
        user: {
          id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    return await this.transactionRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return await this.transactionRepository.delete(id);
  }
}
