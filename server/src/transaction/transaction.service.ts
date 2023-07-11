import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
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
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number) {
    return await this.transactionRepository.find({
      where: {
        user: {
          id,
        },
      },
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

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return await this.transactionRepository.update(id, updateTransactionDto);
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
