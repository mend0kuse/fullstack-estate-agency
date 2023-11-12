import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AuthGuard } from '../auth/auth.guard';
import { TApartmentDtoCreate } from './models/apartment';
import { RequestWithUser } from '../user/schemas/user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { makeImagePath } from '../shared/lib/makeImagePath';

@Controller('apartment')
export class ApartmentController {
    constructor(readonly apartmentService: ApartmentService) {}
    @Get()
    // @UsePipes(new ZodValidationPipe(articleQuery))
    getAll() {
        return this.apartmentService.getAll();
    }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('images', 100, { dest: 'uploads/' }))
    create(
        @Body() dto: TApartmentDtoCreate,
        @Request() req: RequestWithUser,
        @UploadedFiles() images: Array<Express.Multer.File>
    ) {
        return this.apartmentService.createOne({ ...dto, images: images.map((el) => makeImagePath(el)) }, req.user?.id);
    }

    @Get(':id')
    async getOneById(@Param('id', ParseIntPipe) id: number) {
        const founded = await this.apartmentService.getOne(id);

        if (!founded) {
            throw new NotFoundException();
        }

        // await this.apartmentService.update({ id, dto: { views: founded.views + 1 } });

        return founded;
    }
}
