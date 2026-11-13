import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<{
        genre: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        genreId: number;
        publishedAt: Date | null;
    }>;
    findAll(genreId?: string, search?: string, page?: string, limit?: string): Promise<{
        data: ({
            genre: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            isbn: string;
            totalCopies: number;
            genreId: number;
            publishedAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        genre: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        genreId: number;
        publishedAt: Date | null;
    }>;
    update(id: number, updateBookDto: UpdateBookDto): Promise<{
        genre: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        genreId: number;
        publishedAt: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        genreId: number;
        publishedAt: Date | null;
    }>;
}
