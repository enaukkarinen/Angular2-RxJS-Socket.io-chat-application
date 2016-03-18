import {Pipe, PipeTransform} from 'angular2/core';
import * as _ from 'lodash';

@Pipe({name: 'usersWriting'})
export class UsersWritingPipe implements PipeTransform {
    
  transform(value: any[], args:string[]) : any {
    if(value.length > 0)
        return _.map(value, (v) => { return v.username }) + ' writing...';
    else
        return '';
  }
}
