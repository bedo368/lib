import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('book')
export class BookController {
  @Post()
  async createBook() {
    return {
      message: 'book created successfully',
      error: false,
    };
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    return {
      message: 'book created successfully',
      error: false,
    };
  }

  @Get()
  async getAllBook() {
    return {
      message: 'book created successfully',
      error: false,
    };
  }
}
