import { Component, forwardRef, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { DataProvider } from '../../services/data-provider';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';

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
  styleUrls: ['./dynamic-complexfield.component.scss'],
  templateUrl: './dynamic-complexfield.component.html',
})
export class TdDynamicComplexfieldComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit, AfterViewInit {
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  data_provider: DataProvider;
  skip: number = 0;
  take: number = 5;
  text: string = '';
  loadingData: boolean = false;
  ignoreScroll: boolean = false;

  // autocomplete properties
  filteredObjects: Observable<any[]>;
  objects: any[] = new Array<any>();
  selectedObject: any;
  control: FormControl;

  // chip props
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  separatorKeysCodes = [ENTER, COMMA];

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
  error: any = undefined;

  constructor(dataProvider: DataProvider, private cdRef: ChangeDetectorRef) {
    super();
    this.data_provider = dataProvider;
  }

  ngAfterViewInit() {
    this.control = new FormControl();
  }

  ngOnInit(): void {
    const defaultValue = this.control.value;
    if (defaultValue) {
      this.filter(defaultValue).subscribe(val => {
        this.selectedObject = val.find(e => e.key === defaultValue);
      });
    }
  }

  onClickInput() {
    this.createControlValueChangesEvent();
  }

  createControlValueChangesEvent() {
    this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    ).subscribe(val => {
      console.debug('control changed');
      this.loadingData = true;
      this.ignoreScroll = true;
      this.skip = 0;

      if (!(val instanceof DynamicObject)) { // ignore valuechange caused by the selection of a searched item
        this.loadData(val.toString());
      }
    });
  }

  loadData(val: string) {
    this.error = undefined;
    this.filter(val)
      .subscribe(res => {
        console.debug('form control values: ', res);
        this.objects = new Array<any>();
        res.forEach(element => {
          if (!this.objects.find(o => o.key === element.key)) {
            this.objects.push(element);
          }
        });
        this.detectChanges();
        this.loadingData = false;
        this.ignoreScroll = false;
      }, (error) => {
        console.warn(error);
        this.loadingData = false;
        this.ignoreScroll = false;
        this.error = error;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.cdRef.detectChanges();
    this.cdRef.reattach();
  }

  // load next 5 objects
  onScroll(event) {
    if (!this.ignoreScroll) {
      let scrollTop = event.target.scrollTop;
      let scrollHeight = event.target.scrollHeight;
      let childElementCount = event.target.childElementCount;

      if ((scrollHeight / childElementCount) == scrollTop) {
        console.debug('can load more');
        this.loadingData = true;
        this.loadMore(event);
      }
    }
  }

  loadMore(event) {
    console.debug('loading 5 more');
    this.skip += 5;

    this.filter()
      .subscribe(res => {
        res.forEach(element => {
          if (!this.objects.find(o => o.key === element.key)) {
            this.objects.push(element);
          }
        });

        this.loadingData = false;
      }, (error) => {
        console.warn(error);
      });
  }

  filter(term: string = ""): Observable<any[]> {
    return this.data_provider.fetchData(this.functionUrl, this.source, !term || typeof term !== 'string' ? "" : term, this.skip, this.take)
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
              obj.required = response['required'];

              dynObjArray.push(obj);
            });

            return dynObjArray;
          }
        })
      );
  }

  displayView(object?: any): string | undefined {
    return object ? object.titlefield : undefined;
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    if (event && event.option) {
      this.selectedObject = event.option.value;
    }
  }

  removeSelection() {
    this.selectedObject = undefined;
    this.loadData('');
    setTimeout(() => {
      this.autocompleteTrigger.openPanel();
    }, 0);
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
  error: any;
}