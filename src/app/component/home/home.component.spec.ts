import { MatTableDataSource } from '@angular/material';
import { DataService } from './../../services/data.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const response = {
  'houses': ['house1', 'house2']
};

class DataServiceMock {
  getHouseDetails() {
    return Promise.resolve(response);
  }
}

class MattableMockService {}
describe('HomeComponent', () => {  
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let service;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      schemas      : [ NO_ERRORS_SCHEMA ],
      providers    : [
        { provide : DataService, useClass : DataServiceMock },
        { provide: MatTableDataSource, useClass: MattableMockService }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
  });

  it('should create home', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get house closest sister data', () => {
    const data = [{coords: {lat : 123, lon: 323}, params: {rooms: 5, value: 100}, street: 'test', distance: 10}];
    fixture = TestBed.createComponent(HomeComponent);
    spyOn(service, 'getHouseDetails').and.returnValue(Promise.resolve('houses'));
    fixture.componentInstance.populateSisterCloseHouses(data);
    expect(component.dataSourceSisterClose).toBe(new MatTableDataSource(data));
  });

  it('should get house with room more than 5', () => {
    const data = [{coords: {lat : 123, lon: 323}, params: {rooms: 5, value: 100}, street: 'test', distance: 10}];
    fixture = TestBed.createComponent(HomeComponent);
    spyOn(service, 'getHouseDetails').and.returnValue(Promise.resolve('houses'));
    fixture.componentInstance.populateHousesRoomGT5(data);
    expect(component.dataSourceSisterClose).toBe(new MatTableDataSource(data));
  });

  it('should get house with missing information', () => {
    const data = [{coords: {lat : 123, lon: 323}, params: {rooms: 5, value: 100}, street: 'test', distance: 10}];
    fixture = TestBed.createComponent(HomeComponent);
    spyOn(service, 'getHouseDetails').and.returnValue(Promise.resolve('houses'));
    fixture.componentInstance.populateHousesUnknownData(data);
    expect(component.dataSourceSisterClose).toBe(new MatTableDataSource(data));
  });

});
