"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BooksService = class BooksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBookDto) {
        const genre = await this.prisma.genre.findUnique({
            where: { id: createBookDto.genreId },
        });
        if (!genre) {
            throw new common_1.BadRequestException(`Genre with ID ${createBookDto.genreId} does not exist`);
        }
        const existingIsbn = await this.prisma.book.findUnique({
            where: { isbn: createBookDto.isbn },
        });
        if (existingIsbn) {
            throw new common_1.ConflictException(`A book with ISBN "${createBookDto.isbn}" already exists`);
        }
        return this.prisma.book.create({
            data: createBookDto,
            include: { genre: true },
        });
    }
    async findAll(query) {
        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.max(1, Number(query.limit) || 10);
        const skip = (page - 1) * limit;
        const where = {};
        if (query.genreId) {
            where.genreId = Number(query.genreId);
        }
        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { author: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.book.findMany({
                where,
                skip,
                take: limit,
                include: { genre: true },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.book.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const book = await this.prisma.book.findUnique({
            where: { id },
            include: { genre: true },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async update(id, updateBookDto) {
        await this.findOne(id);
        if (updateBookDto.genreId) {
            const genre = await this.prisma.genre.findUnique({
                where: { id: updateBookDto.genreId },
            });
            if (!genre) {
                throw new common_1.BadRequestException(`Genre with ID ${updateBookDto.genreId} does not exist`);
            }
        }
        return this.prisma.book.update({
            where: { id },
            data: updateBookDto,
            include: { genre: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.book.delete({
            where: { id },
        });
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map