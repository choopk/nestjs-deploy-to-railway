import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG') private config: { port: string },
  ) {}

  getHello(): string {
    console.log('seeeaaae');
    return `Hello as am learning nestjs ${this.devConfigService.getDBHOST()} PORT = ${
      this.config.port
    }`;
  }
}
