import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import {
  Village,
  VillageSearchResult,
  TableData,
} from './village-name.service';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MultiVillageFilterService {
  getResults: VillageSearchResult;
  constructor(private httpService: HttpServiceService) {}

  async filterSelectedTopics(choose: Village): Promise<any> {
    const selectedTopic = 'economy';

    let response = await this.httpService
      .post('ccvg/search', { villageid: choose.id, topic: selectedTopic })
      .catch((err: HttpErrorResponse) => {
        console.log('error for request', err);
        return { data: [] };
      });
    console.log('my choose id: ', choose.id);
    return response;
  }
}
