import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { DataProvider } from '../../services/data-provider';

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
export class TdDynamicComplexfieldComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
  private data_provider: DataProvider;
  private skip: number = 0;
  private show: number = 5;
  private text: string = '';
  private loadingData: boolean = false;

  // autocomplete properties
  filteredObjects: Observable<any[]>;
  objects: any[] = new Array<any>();
  control: FormControl;

  // inputitems
  type: string = undefined;
  required: boolean = undefined;
  keyfield: string = undefined;
  source: string = undefined;
  label: string = '';
  titlefield: string = undefined;
  subtitlefield: string = undefined;
  icon: string = "image";
  
  constructor(dataProvider: DataProvider) {
    super();
    this.data_provider = dataProvider;
    this.control = new FormControl();
  }

  filterObjects(text: string, skip: number = 0) {
    if(!text) {
      text = '';
    }
    console.log('this');
    console.log(this);
    this.text = text;
    this.mapData(skip);
    // this.filteredObjects = this.data_provider.fetchData(this.source, this.text, skip, this.show);
  }

  mapData(skip) {
    this.data_provider.fetchData(this.source, this.text, skip, this.show)
        .subscribe(objs => {
          let objArr = new Array<any>();
          objs.forEach(o => {
            console.log('O', o)
            let obj = new DynamicObject();
            obj.keyfield = o[this.keyfield];
            obj.name = o['name'];
            obj.type = o['type'];
            obj.required = o['required'];
            obj.source = o[this.source];
            obj.label = o[this.label];
            obj.titlefield = o[this.titlefield];
            obj.subtitlefield = o[this.subtitlefield];
            obj.icon = o[this.icon];

            objArr.push(obj);
            console.log('pushed: ', obj);
          });

          this.filteredObjects = Observable.of(objArr);
        }, (error) => {
          console.warn(error);
        })
  }

  // load next 5 objects
  loadMore() {
    this.skip += 5;
    this.filterObjects(this.text, this.skip)
  }
}

export class DynamicObject {
  keyfield: string;
  name: string;
  type: string;
  required: boolean;
  source: string;
  label: string;
  titlefield: string;
  subtitlefield: string;
  icon: string;
}