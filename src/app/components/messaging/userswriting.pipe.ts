import {Pipe, PipeTransform} from 'angular2/core';
import * as _ from 'lodash';
import {Writer} from '../../models/writer';

@Pipe({name: 'usersWriting'})
export class UsersWritingPipe implements PipeTransform {
    
  transform(value: Writer[], args: string[]): any {
    return value.length > 0 ? _.map(value, (v) => { return v.username; }) + ' writing...' : '';
  }
}
