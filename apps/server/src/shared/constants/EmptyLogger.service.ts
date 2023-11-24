import { LoggerService } from '@nestjs/common';

export class EmptyLogger implements LoggerService {
  log() {}
  error() {}
  warn() {}
  debug() {}
  verbose() {}
}
