import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, UploadedFile, UseInterceptors, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import * as sharp from 'sharp';

@ApiTags('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() data: CreateProductDto) {
        return this.productService.create(data);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateProductDto) {
        return this.productService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }

    @Post(':id/upload-image')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' }
            }
        }
    })
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/products/', // Specify your desired directory
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|svg|webp|avif|heic)$/)) {
                return callback(new InternalServerErrorException('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    }))
    async uploadImage(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) throw new InternalServerErrorException("File not uploaded.");
        try {
            const compressedPath = `uploads/products/compressed-${file.filename.split('.').slice(0, -1).join('.')}.webp`;
            // Compress the image using sharp
            await sharp(file.path)
                .resize(800) // Resize width to 800px (height auto-adjusts to maintain aspect ratio)
                .webp({ quality: 80 }) // Compress to 80% quality for JPEG
                .toFile(compressedPath);
            // Update the image path in the database
            return this.productService.updateImage(id, compressedPath);
        } catch (error) {
            console.error(error.message);
            throw new InternalServerErrorException("Image compression failed.", error.message);
        }
    }
}

