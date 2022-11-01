import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser, Roles } from 'auth/decorators';
import { JwtGuard, RolesGuard } from 'auth/guards';
import { UpdateUserDto, UserEntityDto } from 'prisma/dtos';
import { STATIC_SUCCESSES } from 'static';
import {
  BadRequestDto,
  ForbiddenResponse,
  SuccessDto,
  UnauthorizedDto,
} from 'static/dtos';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'List the current user logged' })
  @ApiResponse({
    status: 200,
    description: 'User was listed successfully',
    type: UserEntityDto,
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizedDto,
  })
  private async getMe(@GetUser() user: User) {
    return user;
  }

  @Get('listOne/:id')
  @ApiOperation({ summary: 'List a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User was listed successfully',
    type: UserEntityDto,
  })
  @ApiResponse({
    status: 400,
    type: BadRequestDto,
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizedDto,
  })
  @ApiResponse({
    status: 403,
    type: ForbiddenResponse,
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  private async listOne(@Param('id') id: string) {
    return await this.userService.listOne(id);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'List all users on the system' })
  @ApiResponse({
    status: 200,
    description: 'The users were listed successfully',
    type: UserEntityDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizedDto,
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  private async listAll() {
    return await this.userService.listAll();
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({
    status: 200,
    type: UserEntityDto,
  })
  @ApiResponse({
    status: 400,
    type: BadRequestDto,
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizedDto,
  })
  private async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @GetUser() user: UserEntityDto,
  ) {
    return await this.userService.update(id, data, user);
  }

  @Patch('inactivate/:id')
  @ApiOperation({ summary: 'Inactivate a user by id' })
  @ApiResponse({
    status: 200,
    type: SuccessDto,
  })
  @ApiResponse({
    status: 400,
    type: BadRequestDto,
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizedDto,
  })
  @ApiResponse({
    status: 403,
    type: ForbiddenResponse,
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  private async inactiveUser(@Param('id') id: string) {
    await this.userService.inactivate(id);

    return new SuccessDto(STATIC_SUCCESSES.USER_INACIVATE);
  }

  @Patch('activate/:id')
  @ApiOperation({ summary: 'Activate a user by id' })
  @ApiResponse({
    status: 200,
    type: SuccessDto,
  })
  @ApiResponse({
    status: 400,
    type: BadRequestDto,
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizedDto,
  })
  @ApiResponse({
    status: 403,
    type: ForbiddenResponse,
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  private async activateUser(@Param('id') id: string) {
    await this.userService.activate(id);

    return new SuccessDto(STATIC_SUCCESSES.USER_ACTIVATE);
  }
}
