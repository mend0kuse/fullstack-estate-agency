import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AuthGuard } from '../auth/auth.guard';
import { apartmentQuery, TApartmentDtoCreate, TApartmentQuery, TApartmentWithUser } from './models/apartment';
import { RequestWithUser } from '../user/schemas/user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { makeImagePath } from '../shared/lib/makeImagePath';
import { isAuthor } from '../shared/lib/isAuthor';
import { ZodValidationPipe } from '../validation/zod-validation.pipe';

@Controller('apartment')
export class ApartmentController {
    constructor(readonly apartmentService: ApartmentService) {}
    @Get()
    @UsePipes(new ZodValidationPipe(apartmentQuery))
    getAll(@Query() query: TApartmentQuery) {
        return this.apartmentService.getAll(query);
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

        await this.apartmentService.update({ id, views: founded.views + 1 });

        return founded;
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id', ParseIntPipe) id: number, @Request() req: RequestWithUser) {
        const deletedApartment = await this.apartmentService.getOne(id);

        if (!deletedApartment) {
            throw new NotFoundException();
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isAuthor(req.user, deletedApartment as TApartmentWithUser);

        return this.apartmentService.deleteOne(id);
    }
}
