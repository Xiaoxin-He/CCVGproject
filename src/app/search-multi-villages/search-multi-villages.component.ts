import { VillageNameService } from './../services/village-name.service';
import { Component, OnInit } from '@angular/core';
import { ProvinceCityCountyService } from '../services/province-city-county.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-multi-villages',
  templateUrl: './search-multi-villages.component.html',
  styleUrls: ['./search-multi-villages.component.css']
})
export class SearchMultiVillagesComponent implements OnInit {
  options;
  //TODO this is fake data for province, need change later
  provinceList: string[] = [];
  //city and county got from database with 100 values
  cityList: string[] = [];
  countyList: string[] = [];
  displayedColumns: string[] = ['checked','name', 'province', 'city', 'county'];
  dataSource;
  selectedValue: string;
  provinceSearch: string;
  citySearch: string;
  countySearch: string;
  villageSearch: string;
  totalList: any = {};



  constructor(private villageNameService: VillageNameService,
    private provinceCityCountyService: ProvinceCityCountyService) {

    // this.provinceList = this.provinceCityCountyService.getProvince();

  }

  ngOnInit(): void {
    this.villageNameService.getVillages().then(result =>{
      this.totalList = result.data;
      result.data.map(item =>{
        if(this.cityList.includes(item.city) === false) {

          //push to array and prevent duplicate items
          //BUG
          if(this.provinceList.indexOf(item.province) == -1) {
            this.provinceList.push(item.province);
          }
          if(this.cityList.indexOf(item.city) == -1) {
            this.cityList.push(item.city);
          }
          if(this.countyList.indexOf(item.county) == -1) {
            this.countyList.push(item.county);
          }
        }
      })
      // console.log(result.data[0].city);
      console.log(this.totalList);
      // console.log(this.countyList);
      this.options = new MatTableDataSource(result.data);
    })
  }


  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.options.filter = filterValue.trim().toLowerCase();
    console.log(this.options.filter);
  }


  changeProvince(data: Event) {
    this.options.filter = data;

    this.cityList = [];
    this.options.filteredData.map(item => {
      if(!this.cityList.includes(item.city)){
        this.cityList.push(item.city)
      }
    })

    this.countyList = [];
    this.options.filteredData.map(item => {
      if(!this.countyList.includes(item.county)) {
        this.countyList.push(item.county);
      }
    })

  }

  changeCity(data: Event) {
    this.options.filter = data;

    this.countyList = [];
    this.options.filteredData.map(item => {
      if(!this.countyList.includes(item.county)) {
        this.countyList.push(item.county);
      }
    })
  }

  changeCounty(data) {
    this.options.filter = data;
  }


}
