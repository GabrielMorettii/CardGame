import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const user = request?.user;

      return roles.includes(user.role);
    }

    return false;
  }
}
