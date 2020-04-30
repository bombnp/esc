import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { JwtDecode, JwtUser } from '../libs/jwt';
import { CreateReservationDto } from './dto/create_reservation.dto';
import { RoomService } from './room.service';
import { ReservationService } from './reservation.service';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { reservations } from '../db/index';


@ApiTags('Room')
@ApiBearerAuth()
@Controller('api/reservations')
export class ReservationsController {

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService
  ) { }


  @Get('/')
  index() {
    return this.reservationService.index();
  }

  @ApiBody({ type: CreateReservationDto })
  @Post('/')
  async create(
    @JwtDecode() user: JwtUser,
    @Body()      body: CreateReservationDto,
  ) {
    return this.reservationService.create({
      user_id:      user.id,
      room_id:      body.room_id,
      time_start:   body.time_start,
      time_end:     body.time_end,
      organization: body.organization,
    }).then(id =>
      this.reservationService.show(id)
    );
  }

  @Get('/organization')
  get_organization_list() {
    return reservations.getField('organization').distinct().run();
  }

  @Get('/:reservation_id')
  show(@Param('reservation_id') id: string) {
    return this.reservationService.show(id);
  }

  @Put('/:reservation_id/status/:status')
  update_status(
    @JwtDecode()             user:           JwtUser,
    @Param('reservation_id') reservation_id: string,
    @Param('status')         status:         string,
  ) {
    return this.reservationService.change_status({
      status,
      authorizer_id: user.id,
      reservation_id,
    });
  }

  @Delete('/:reservation_id')
  remove(
    @JwtDecode()             user:           JwtUser,
    @Param('reservation_id') reservation_id: string
  ) {
    return this.reservationService.remove({ user_id: user.id, reservation_id });
  }

}