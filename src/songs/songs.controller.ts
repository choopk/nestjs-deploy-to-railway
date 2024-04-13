import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from '../common/constants/connection';
import { Song } from './song.entity';
import { UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from '../auth/artists-jwt-guard';

// @Controller({ path: 'songs', scope: Scope.REQUEST })
@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService, // @Inject('CONNECTION') private connection: Connection,
  ) {
    // console.log(
    //   'This is connection string ',
    //   this.connection.CONNECTION_STRING,
    // );
  }

  @Post()
  @UseGuards(ArtistJwtGuard)
  create(
    @Body() createSongDTO: CreateSongDto,
    @Request()
    request,
  ): Promise<Song> {
    console.log('request.user: ', request.user);
    return this.songsService.create(createSongDTO);
  }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.songsService.remove(id);
  }
}
