import { Component, OnInit } from '@angular/core';
import {TableData} from '../services/village-name.service';
import {StateServiceService} from '../services/state-service.service';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-single-village-search-result',
  templateUrl: './single-village-search-result.component.html',
  styleUrls: ['./single-village-search-result.component.css']
})
export class SingleVillageSearchResultComponent implements OnInit {
  searchResult: TableData[];
  selectedTable: TableData ;

  //for download
  checkedTables: string[];
  downloadLink: any;

  constructor(private stateService: StateServiceService) {

  }

  ngOnInit(): void {
    this.searchResult = this.stateService.data;
    this.stateService.data = undefined;
    this.selectedTable = this.searchResult[0];
  }

  onSelect(table: TableData) {
    this.selectedTable = table;
    console.log("selected table: ",this.selectedTable);
    this.downloadLink = "http://ngrok.luozm.me:8395/ccvg/download"+"/"+this.selectedTable.id+"_"+this.selectedTable.topic+".csv";
  }

  checktables(topic: string, checked: MatCheckboxChange) {
    console.log("1235435",checked);

    if(checked){
      this.checkedTables.push(topic);
    }else{
      const index = this.checkedTables.indexOf(topic, 0);
      if (index > -1) {
        this.checkedTables.splice(index, 1);
      }
    }
    console.log("this.checkedTables",this.checkedTables)

  }
}
