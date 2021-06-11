import { Component, OnInit } from '@angular/core';
import { MultiVillageFilterService } from '../services/multi-village-filter.service';
@Component({
  selector: 'app-muiti-village-results',
  templateUrl: './muiti-village-results.component.html',
  styleUrls: ['./muiti-village-results.component.css'],
})
export class MuitiVillageResultsComponent implements OnInit {
  userInput: any = {};
  getAllResponses: any = {};
  constructor(private multiVillageFilterService: MultiVillageFilterService) {}

  ngOnInit(): void {}

  async getData() {
    console.log('get it !', await this.multiVillageFilterService.getUserList);
    this.userInput = await this.multiVillageFilterService.getUserList;
    console.log(
      'this is the searchResult from service ininnnnn',
      await this.multiVillageFilterService.onPostMultiVillages(this.userInput)
    );
  }
}
