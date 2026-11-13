//import { Injectable } from '@nestjs/common';
//@Injectable()
//export class GenresService {}
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    const existing = await this.prisma.genre.findUnique({
      where: { name: createGenreDto.name },
    });

    if (existing) {
      throw new ConflictException(`Genre "${createGenreDto.name}" already exists`);
    }

    return this.prisma.genre.create({
      data: createGenreDto,
    });
  }

  async findAll() {
    return this.prisma.genre.findMany({
      include: {
        _count: {
          select: { books: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    await this.findOne(id); // Ensures 404 is thrown if ID does not exist

    return this.prisma.genre.update({
      where: { id },
      data: updateGenreDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensures 404 is thrown if ID does not exist

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}