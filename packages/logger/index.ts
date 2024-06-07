const { log: _log } = console;
import { LogFun, LoggerType } from '@log-reporting/types';
import pck from './package.json';

export class Logger {
  constructor() {}
  log(title: string, content: string) {
    _log(
      `%c${title}%c ${content}`,
      'color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #73767a;border-radius: 3px;',
      'color: #909399;font-weight: blod;letter-spacing:2px;padding: 3px 5px;',
    );
  }

  info(title: string, content: string) {
    _log(
      `%c${title}%c ${content}`,
      'color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #337ecc;border-radius: 3px;',
      'color: #409EFF;font-weight: blod;letter-spacing:2px;padding: 3px 5px;',
    );
  }

  warn(title: string, content: string) {
    _log(
      `%c${title}%c ${content}`,
      'color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #b88230;border-radius: 3px;',
      'color: #E6A23C;font-weight: blod;letter-spacing:2px;padding: 3px 5px;',
    );
  }

  error(title: string, content: string) {
    _log(
      `%c${title}%c ${content}`,
      'color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #c45656;border-radius: 3px;',
      'color: #F56C6C;font-weight: blod;letter-spacing:2px;padding: 3px 5px;',
    );
  }

  success(title: string, content: string) {
    _log(
      `%c${title}%c ${content}`,
      'color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #529b2e;border-radius: 3px;',
      'color: #67C23A;font-weight: blod;letter-spacing:2px;padding: 3px 5px;',
    );
  }
}

const logger: LoggerType = new Logger();

const log: LogFun = logger.log;
const info: LogFun = logger.info;
const warn: LogFun = logger.warn;
const error: LogFun = logger.error;
const success: LogFun = logger.success;
const _name = pck.name;
const _version = pck.version;
const _author = pck.author;
const _description = pck.description;

export { logger, log, info, warn, error, success, _name, _version, _author, _description };
