import {
  VillageNameService,
  TableData,
} from './../services/village-name.service';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ProvinceCityCountyService } from '../services/province-city-county.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MultiVillageFilterService } from '../services/multi-village-filter.service';
import { HttpClient } from '@angular/common/http';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-multi-villages',
  templateUrl: './search-multi-villages.component.html',
  styleUrls: ['./search-multi-villages.component.css'],
})
export class SearchMultiVillagesComponent implements OnInit {
  @ViewChild('myYearDiv', { static: false }) myYearDiv: ElementRef;
  options;
  //TODO this is fake data for province, need change later
  provinceList: string[] = [];
  //city and county got from database with 100 values
  cityList: string[] = [];
  countyList: string[] = [];
  displayedColumns: string[] = [
    'checked',
    'name',
    'province',
    'city',
    'county',
  ];
  dataSource;
  selectedValue: string;
  provinceSearch: string;
  citySearch: string;
  countySearch: string;
  villageSearch: string;
  totalList: any = {};
  checkItems = new Map();
  tempcheckItems: string[] = [];
  rightToptempcheckItems: string[] = [];
  startYearInput: string;
  endYearInput: string;
  searchCollectorInput: string;
  multiSearchResult: any;

  searchResult: TableData[];

  villageidList: any = [];

  constructor(
    private villageNameService: VillageNameService,
    private provinceCityCountyService: ProvinceCityCountyService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router, // private multiVillageFilterService: MultiVillageFilterService,
    private http: HttpClient,
    private multiVillageFilterService: MultiVillageFilterService
  ) {
    // this.provinceList = this.provinceCityCountyService.getProvince();
  }

  ngOnInit(): void {
    this.villageNameService.getVillages().then((result) => {
      console.log(result);
      this.totalList = result.data;
      result.data.map((item) => {
        if (this.cityList.includes(item.city) === false) {
          //push to array and prevent duplicate items
          //BUG
          if (this.provinceList.indexOf(item.province) == -1) {
            this.provinceList.push(item.province);
          }
          if (this.cityList.indexOf(item.city) == -1) {
            this.cityList.push(item.city);
          }
          if (this.countyList.indexOf(item.county) == -1) {
            this.countyList.push(item.county);
          }
        }
        // item.isSelected = false;
      });
      // console.log(result.data[0].city);
      console.log(result.data);
      // console.log(this.countyList);
      this.options = new MatTableDataSource(result.data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.options.filter = filterValue.trim().toLowerCase();
    console.log(this.options.filter);
  }

  async checkBoxValue(event: MatCheckboxChange, element) {
    // const isChecked = (<HTMLInputElement>event).checked;
    console.log('check box event', event.checked);
    this.multiSearchResult = element;
    console.log('element', element);
    console.log(element.id);

    if (element.id) {
      this.villageidList.push(element.id);
    }

    //TODO
    // this.searchResult =
    //   await this.multiVillageFilterService.filterSelectedTopics(element);
    // console.log('this is the searchResult', this.searchResult);

    //BUG
    // this.router.navigate(['/single-village-search']);

    if (event.checked) {
      this.checkItems.set(element.id, element);
    } else {
      this.checkItems.delete(element.id);
    }
  }

  //TODO
  onCreatePost(postData: { villageid: any; topic: any }) {
    // Send Http request
    this.http
      .post('http://ngrok.luozm.me:8395/ccvg/advancesearch', postData)
      .subscribe((responseData) => {
        console.log('responseData', responseData);
      });
  }

  //TODO  use dynamic db data
  middleCheckBox(event: MatCheckboxChange) {
    if (event.checked) {
      this.tempcheckItems.push(event.source.name);
    } else {
      var index = this.tempcheckItems.indexOf(event.source.name);
      if (index > -1) {
        this.tempcheckItems.splice(index, 1);
      }
      // this.checkItems.delete(element.id);
    }
  }

  rightTopCheckBox(event: MatCheckboxChange) {
    if (event.checked) {
      this.rightToptempcheckItems.push(event.source.name);
    } else {
      var index = this.rightToptempcheckItems.indexOf(event.source.name);
      if (index > -1) {
        this.rightToptempcheckItems.splice(index, 1);
      }
      // this.checkItems.delete(element.id);
    }
  }

  changeProvince(data: Event) {
    this.options.filter = data;

    this.cityList = [];
    this.options.filteredData.map((item) => {
      if (!this.cityList.includes(item.city)) {
        this.cityList.push(item.city);
      }
    });

    this.countyList = [];
    this.options.filteredData.map((item) => {
      if (!this.countyList.includes(item.county)) {
        this.countyList.push(item.county);
      }
    });
  }

  changeCity(data: Event) {
    this.options.filter = data;

    this.countyList = [];
    this.options.filteredData.map((item) => {
      if (!this.countyList.includes(item.county)) {
        this.countyList.push(item.county);
      }
    });
  }

  changeCounty(data) {
    this.options.filter = data;
  }

  onInputStartYearField(event: any) {
    this.startYearInput = event.target.value;
    console.log(event.target.value);
  }
  onInputEndYearField(event: any) {
    this.endYearInput = event.target.value;
    console.log(event.target.value);
  }

  addInputYears() {
    console.log('input year called');
    // console.log(this.startYearInput + ' - ' + this.endYearInput);

    const div = this.renderer.createElement('p');
    const text = this.renderer.createText(
      `${this.startYearInput} - ${this.endYearInput}`
    );
    this.renderer.appendChild(div, text);
    // console.log(this.myYearDiv.nativeElement);
    this.renderer.appendChild(this.myYearDiv.nativeElement, div);
  }

  resetAll() {
    console.log('reset');
    this.checkItems.clear();
    this.tempcheckItems = [];
    this.rightToptempcheckItems = [];
    // const div =

    const childElements = this.myYearDiv.nativeElement.children;
    console.log('childElements', childElements);
    for (let child of childElements) {
      this.renderer.removeChild(this.myYearDiv.nativeElement, child);
    }

    this.searchCollectorInput = '';
    // this.startYearInput = '';
  }

  async goToPage() {
    console.log(this.villageidList);
    console.log(this.checkItems);
    console.log(this.multiSearchResult);

    const postData = {
      villageid: this.villageidList,
      topic: ['economy', 'population'],
    };

    // this.searchResult =
    //   await this.multiVillageFilterService.onPostMultiVillages(postData);
    console.log(
      'this is the searchResult from service',
      await this.multiVillageFilterService.onPostMultiVillages(postData)
    );
    // this.onCreatePost(postData);

    window.localStorage.setItem(
      'choose',
      JSON.stringify(this.multiSearchResult)
    );
    this.router.navigate(['/multi-village-search-result']);
  }
}
