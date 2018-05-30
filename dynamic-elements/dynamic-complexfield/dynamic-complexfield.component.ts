import { Component, forwardRef, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map, concat } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';

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
export class TdDynamicComplexfieldComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit, AfterViewInit {
  data_provider: DataProvider;
  skip: number = 0;
  take: number = 5;
  text: string = '';
  loadingData: boolean = false;
  ignoreScroll: boolean = false;

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
  
  constructor(dataProvider: DataProvider, private cdRef: ChangeDetectorRef) {
    super();
    this.data_provider = dataProvider;
  }
  
  ngAfterViewInit() {
    this.control = new FormControl();
    let temp = new DynamicObject();
    this.control.valueChanges
        .startWith('')
        .debounceTime(300)
        .subscribe(val => {
          this.loadingData = true;
          this.ignoreScroll = true;
          this.skip = 0;

          this.filter(val)
            .subscribe(res => {
              console.debug('form control values: ', res)
              this.objects = new Array<any>();
              res.forEach(result => {
                this.objects.push(result);
              })

              this.loadingData = false;
              this.ignoreScroll = false;

              this.cdRef.detectChanges();
            }, (error) => {
              console.warn(error);
              this.loadingData = false;
              this.ignoreScroll = false;
            })
        })
  }

  ngOnInit(): void {
  }
  
  // load next 5 objects
  onScroll(event) {
    if(!this.ignoreScroll){
      let scrollTop = event.target.scrollTop;
      let scrollHeight = event.target.scrollHeight;
      let childElementCount = event.target.childElementCount;

      if((scrollHeight / childElementCount) == scrollTop){
        console.debug('can load more')
        this.loadingData = true;
        this.loadMore(event);
      }
    }
  }
  
  loadMore(event) {
    console.debug('loading 5 more')
    this.skip += 5;

    this.filter()
    .subscribe(res => {
      res.forEach(result => {
        this.objects.push(result);
      })
      
      this.loadingData = false;
    }, (error) => {
      console.warn(error);
    })
  }

  filter(term: string = ""): Observable<any[]> {
    return this.data_provider.fetchData(this.functionUrl, this.source, !term ? "" : term, this.skip, this.take)
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