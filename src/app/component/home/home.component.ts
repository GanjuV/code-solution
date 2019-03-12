import { HouseDTO } from './../../house.interface';
import {
  PAGINATOR_SIZE_ARRAY,
  HEADER_COLUMN_CLOSE_TO_SISTER,
  HEADER_COLUMN_ROOM_GT5,
  HEADER_COLUMN_UNKNOWN_DATA
} from './../../app.constant';
import { DataService } from './../../services/data.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import findDistance from 'src/app/shared/methods';
/**
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  paginatorSize = PAGINATOR_SIZE_ARRAY;
  columns = HEADER_COLUMN_CLOSE_TO_SISTER;
  displayedColumnSisterClose = this.columns.map(x => x.key);
  columnsGT5 = HEADER_COLUMN_ROOM_GT5;
  displayedColumnGT5 = this.columnsGT5.map(x => x.key);
  columnsUnknown = HEADER_COLUMN_UNKNOWN_DATA;
  displayedColumnsUnknown = this.columnsUnknown.map(x => x.key);
  sisterStreet = 'Eberswalder Straße 55';
  distanceUnit = 'K';
  houseToMove: HouseDTO;
  dropdownArry = ['Sister closest', 'Room greater than 5', 'Missing information'];
  housesCloseToSister: HouseDTO[];
  housesRoomGT5: HouseDTO[];
  housesDataUnknown: HouseDTO[];
  dataSourceSisterClose: MatTableDataSource<any>;
  dataSourceRoomGT5: MatTableDataSource<any>;
  unknownDataSource: MatTableDataSource<any>;
  isSisterCloseHouseLayoutHidden = false;
  isRoomGT5LayoutHidden = false;
  isMissingLayoutHidden = false;
  isDataLoaded = false;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  /**
   * Creates an instance of HomeComponent.
   * @param {DataService} dataService
   * 
   * @memberOf HomeComponent
   */
  constructor(
    private dataService: DataService
  ) { }


  /**
   * Getting data and pupolating values.
   * 
   * 
   * @memberOf HomeComponent
   */
  ngOnInit() {
    this.dataService.getHouseDetails().subscribe( ({ houses }) => {
      this.isDataLoaded = true;
      this.populateSisterCloseHouses(houses);
      this.populateHousesRoomGT5(houses);
      this.populateHousesUnknownData(houses);
      this.findHouseToMove();
    });
  }

  /**
   * Finding house close to sister
   * 
   * @param {HouseDTO[]} data 
   * 
   * @memberOf HomeComponent
   */
  populateSisterCloseHouses(data: HouseDTO[]) {
    const sisterHouseObj: HouseDTO = data.filter( (obj: HouseDTO) => obj.street === this.sisterStreet)[0];
    this.housesCloseToSister = data.map( (obj: HouseDTO) => {
      return {
        ...obj,
        distance: findDistance(sisterHouseObj.coords.lat, sisterHouseObj.coords.lon , obj.coords.lat, obj.coords.lon, this.distanceUnit)
      };
    })
    .filter(obj => obj.distance > 0)
    .sort((obj1, obj2) => obj1.distance > obj2.distance ? 1 : -1);
    this.dataSourceSisterClose = new MatTableDataSource(this.housesCloseToSister);
    this.dataSourceSisterClose.paginator = this.paginator.toArray()[0];
  }

  /**
   * Finding house have more than 5 rooms
   * 
   * @param {HouseDTO[]} data 
   * 
   * @memberOf HomeComponent
   */
  populateHousesRoomGT5(data: HouseDTO[]) {
    this.housesRoomGT5 = data.filter( (obj: HouseDTO) => {
      if (('params' in obj) && ('rooms' in obj.params)) {
        return obj.params.rooms > 5;
      }
    })
    .sort((obj1, obj2) => obj1.params.rooms > obj2.params.rooms ? 1 : -1);
    this.dataSourceRoomGT5 = new MatTableDataSource(this.housesRoomGT5);
    this.dataSourceRoomGT5.paginator = this.paginator.toArray()[1];

  }

  /**
   * Finding house have missing data.
   * 
   * @param {HouseDTO[]} data 
   * 
   * @memberOf HomeComponent
   */
  populateHousesUnknownData(data: HouseDTO[]) {
    this.housesDataUnknown = data.filter( (obj: HouseDTO) => {
      let coordinatesExists = false;
      if ('coords' in obj) {
        coordinatesExists = (('lat' in obj.coords) && ('lon' in obj.coords));
      }
      const roomExist = (('params' in obj) && ('rooms' in obj.params));
      const valueExist = (('params' in obj) && ('value' in obj.params));
      if (!coordinatesExists || !roomExist || !valueExist) {
        return obj;
      }
    })
    .sort((obj1, obj2) => obj1.street.localeCompare(obj2.street));
    this.unknownDataSource = new MatTableDataSource(this.housesDataUnknown);
    this.unknownDataSource.paginator = this.paginator.toArray()[2];
  }

  /**
   * Finding how to move which fullfill all the provided conditions.
   * 
   * 
   * @memberOf HomeComponent
   */
  findHouseToMove() {
    const filterArry = this.housesCloseToSister.filter((obj: HouseDTO) => {
      const roomExist = (('params' in obj) && ('rooms' in obj.params));
      const valueExist = (('params' in obj) && ('value' in obj.params));
      if (roomExist && valueExist) {
        return obj.params.rooms >= 10 && obj.params.value <= 5000000;
      }
    })[0];
    this.houseToMove = filterArry;
  }
/**
 * Selecting the layout based on dropdown value.
 *
 * @param {number} value
 * @memberof HomeComponent
 */
onChange(value: number) {
    this.isSisterCloseHouseLayoutHidden = false;
    this.isRoomGT5LayoutHidden = false;
    this.isMissingLayoutHidden = false;
    switch (value) {
      case 0: {
        this.isSisterCloseHouseLayoutHidden = true;
        break;
      }
      case 1: {
        this.isRoomGT5LayoutHidden = true;
        break;
      }
      case 2: {
        this.isMissingLayoutHidden = true;
        break;
      }
    }
  }
}
