import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map, concat } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/observable/combineLatest';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { DataProvider } from '../../services/data-provider';
import { MatAutocomplete } from '@angular/material';

export const COMPLEXFIELD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TdDynamicComplexfieldComponent),
  multi: true,
};

@Component({
  providers: [
    COMPLEXFIELD_CONTROL_VALUE_ACCESSOR,
    DataProvider
  ],
  selector: 'td-dynamic-complexfield',
  styleUrls: [ './dynamic-complexfield.component.scss' ],
  templateUrl: './dynamic-complexfield.component.html',
})
export class TdDynamicComplexfieldComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
  private data_provider: DataProvider;
  private skip: number = 0;
  private take: number = 5;
  private text: string = '';
  private loadingData: boolean = false;
  private loadingMore: boolean = false;
  private ignoreScroll: boolean = false;

  // autocomplete properties
  filteredObjects: Observable<any[]>;
  objects: any[] = new Array<any>();
  control: FormControl;

  // inputelements
  type: string = undefined;
  required: boolean = undefined;
  keyfield: string = undefined;
  source: string = undefined;
  label: string = '';
  titlefield: string = undefined;
  subtitlefield: string = undefined;
  icon: string = "image";
  functionUrl: string = undefined;
  
  constructor(dataProvider: DataProvider) {
    super();
    this.data_provider = dataProvider;
  }
  
  ngOnInit(): void {
    this.control = new FormControl();
    this.filteredObjects = this.control.valueChanges
    .startWith('')
    .debounceTime(300)
    .do(() => {
      this.loadingData = true;
      this.ignoreScroll = true;
    })
    .switchMap(val => {
      this.skip = 0;
      this.text = val;
      return this.filter();
    })
    .do(() => {
      this.loadingData = false;
      this.ignoreScroll = false;
    })
  }
  
  // load next 5 objects
  onScroll(event) {
    if(!this.ignoreScroll){
      let scrollTop = event.target.scrollTop;
      let scrollHeight = event.target.scrollHeight;
      let childElementCount = event.target.childElementCount;

      if((scrollHeight / childElementCount) == scrollTop){
        console.debug('can load more')
        this.loadMore();
      }
    }
  }
  
  loadMore() {
    console.debug('loading 5 more')
    this.skip += 5;

    this.filteredObjects = this.mergeObservableArrays();

  }

  mergeObservableArrays(): Observable<any[]> {
    let merged = new Observable<Array<any>>();
    let newArray = this.filter();

    return Observable.combineLatest(this.filteredObjects, newArray)
      .do(() => this.loadingData = true)
      .map(([existingArr, newArr]) => [...existingArr, ...newArr])
      .do(() => {
        this.ignoreScroll = true;
        this.loadingData = false;
      })
  }

  filter(): Observable<any[]> {
    return this.data_provider.fetchData(this.functionUrl, this.source, this.text, this.skip, this.take)
      .pipe(
        map(response => {
            let dynObjArray = new Array<DynamicObject>();
            console.debug(`response of function ${this.source}: `, response);
            if (response['results']) {
              response['results'].forEach(result => {
                let obj = new DynamicObject();

                // load title and subtitle with right culture
                let stringArr = this.titlefield.split('.');
                let object = result[stringArr[0]];
                let culturekey = stringArr[1];
                let title = culturekey && object[culturekey] ? object[culturekey] : object;

                stringArr = this.subtitlefield.split('.');
                object = result[stringArr[0]];
                culturekey = stringArr[1];
                let subtitle = culturekey && object[culturekey] ? object[culturekey] : object;

                // map response elements
                obj.keyfield = response['key'];
                obj.key = result[response['key']];
                obj.name = result['name'];
                obj.titlefield = title;
                obj.subtitlefield = subtitle;

                dynObjArray.push(obj)
              });

              return dynObjArray;
            }
        })
      )
  }

  displayView(object?: any): string | undefined {
    return object ? object.titlefield : undefined;
  }
}

export class DynamicObject {
  keyfield: string;
  key: string;
  name: string;
  type: string;
  required: boolean;
  source: string;
  label: string;
  titlefield: string;
  subtitlefield: string;
  icon: string;
}