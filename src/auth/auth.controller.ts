import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UserEntityDto } from 'prisma/dtos';
import {
  AuthResponseDto,
  AuthUserDto,
  BadRequestDto,
  UnauthorizedDto,
} from 'static/dtos';
import { AuthService } from './auth.service';
import { GithubGuard } from './guards';
import { GoogleGuard } from './guards/google.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User was created successfully',
    type: UserEntityDto,
  })
  @ApiResponse({
    status: 400,
    type: BadRequestDto,
  })
  private async signup(@Body() data: CreateUserDto) {
    return await this.authService.signup(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: 'Authenticate with credentials' })
  @ApiResponse({
    status: 200,
    description: 'Sucessfully logged',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    type: BadRequestDto,
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizedDto,
  })
  private async signin(@Body() data: AuthUserDto) {
    return await this.authService.signin(data);
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  @ApiResponse({
    status: 200,
    description: 'Sucessfully logged',
    type: AuthResponseDto,
  })
  @ApiOperation({ summary: 'Authenticate with google through oAuth2' })
  private async googleAuth() {
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  @ApiExcludeEndpoint()
  private async googleCallback(@Req() req) {
    return await this.authService.oAuthLogin(req);
  }

  @Get('github')
  @UseGuards(GithubGuard)
  @ApiResponse({
    status: 200,
    description: 'Sucessfully logged',
    type: AuthResponseDto,
  })
  @ApiOperation({ summary: 'Authenticate with github through oAuth2' })
  private async githubAuth() {
    return;
  }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  @ApiExcludeEndpoint()
  private async githubCallback(@Req() req) {
    return await this.authService.oAuthLogin(req);
  }
}
