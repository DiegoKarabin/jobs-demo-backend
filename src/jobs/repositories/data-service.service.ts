import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class DataService {
  constructor(private httpService: HttpService) {}

  fetchData() {
    return this.httpService
      .get(
        'https://my-json-server.typicode.com/DiegoKarabin/jobs-mock-data/jobs',
      )
      .pipe(map((response) => response.data));
  }
}
