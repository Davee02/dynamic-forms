import { Component, forwardRef, OnInit } from '@angular/core';
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
export class TdDynamicComplexfieldComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
  private data_provider: DataProvider;
  private skip: number = 0;
  private take: number = 5;
  private text: string = '';
  private loadingData: boolean = false;

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
        .switchMap(val => {
          return this.filter(val)
        })
  }

  filter(text): Observable<any[]> {
    this.text = text;
    return this.data_provider.fetchData(this.functionUrl, this.source, text, this.skip, this.take)
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
                obj.name = result['name'];
                obj.type = result['type'];
                obj.required = result['required'];
                obj.source = result[this.source];
                obj.label = result[this.label];
                obj.titlefield = title;
                obj.subtitlefield = subtitle;
                obj.icon = 'image';

                dynObjArray.push(obj)
              });

              return dynObjArray;
            }
        })
      )
  }
  // load next 5 objects
  loadMore() {
    this.skip += 5;
    this.filter(this.text)
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