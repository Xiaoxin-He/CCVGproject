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
  provinceList: any[];
  cityList: string[] = [];
  displayedColumns: string[] = ['checked','name', 'province', 'city', 'county'];
  dataSource;
  selectedValue: string;

  constructor(private villageNameService: VillageNameService,
    private provinceCityCountyService: ProvinceCityCountyService) {

    this.provinceList = this.provinceCityCountyService.getProvince();

  }

  ngOnInit(): void {
    this.villageNameService.getVillages().then(result =>{
      console.log(result);
      console.log(result.data[69].province);
      result.data.map(item =>{
        if(this.cityList.includes(item.city) === false) {
          this.cityList.push(item.city);
        }
      })
      console.log(result.data[0].city);
      console.log(this.cityList);
      this.options = new MatTableDataSource(result.data);
    })
    console.log(this.provinceList);
  }



  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.options.filter = filterValue.trim().toLowerCase();
    console.log(this.options.filter);
  }

  changeProvince(data: Event) {
    this.options.filter = data;
  }

  changeCity(data: Event) {
    this.options.filter = data;
  }


}
