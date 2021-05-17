import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableData } from '../services/village-name.service';
import { StateServiceService } from '../services/state-service.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SingleVillageSearchResultService } from '../services/single-village-search-result.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-village-search-result',
  templateUrl: './single-village-search-result.component.html',
  styleUrls: ['./single-village-search-result.component.css'],
})
export class SingleVillageSearchResultComponent implements OnInit {
  searchResult: TableData[];
  selectedTable: TableData;

  //for download
  checkedTables: string[];
  downloadLink: any;

  choose;

  constructor(
    private stateService: StateServiceService,
    private villageSearchResultService: SingleVillageSearchResultService,
    private activatedRoute: ActivatedRoute
  ) {}
  // ngOnDestroy(): void {
  //   console.log('destroy');
  //   this.stateService.data = this.searchResult;
  // }

  ngOnInit(): void {
    // this.choose = this.activatedRoute.snapshot.paramMap.get('choose');
    // console.log(this.choose);
    // console.log('hello');

    this.searchResult = this.stateService.data;
    console.log('🛋 this.searchResult' + this.searchResult);

    this.searchResult = JSON.parse(window.localStorage.getItem('result'));
    console.log(typeof this.selectedTable);
    // this.stateService.data = undefined;

    console.log(this.searchResult);

    this.selectedTable = this.searchResult[0];
  }

  // async search(): Promise<void> {
  //   this.searchResult = (
  //     await this.villageSearchResultService.searchEncap(this.choose)
  //   ).tables;
  // }

  onSelect(table: TableData) {
    this.selectedTable = table;
    console.log('selected table: ', this.selectedTable);
    this.downloadLink =
      'http://ngrok.luozm.me:8395/ccvg/download' +
      '/' +
      this.selectedTable.id +
      '_' +
      this.selectedTable.topic +
      '.csv';
  }

  checktables(topic: string, checked: MatCheckboxChange) {
    console.log('1235435', checked);

    if (checked) {
      this.checkedTables.push(topic);
    } else {
      const index = this.checkedTables.indexOf(topic, 0);
      if (index > -1) {
        this.checkedTables.splice(index, 1);
      }
    }
    console.log('this.checkedTables', this.checkedTables);
  }
}
