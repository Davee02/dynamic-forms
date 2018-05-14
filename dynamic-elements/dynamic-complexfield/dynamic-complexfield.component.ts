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
  source: string = undefined;
  label: string = '';
  title: string = undefined;
  subtitle: string = undefined;
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
    
    this.text = text;
    this.filteredObjects = this.data_provider.fetchData(this.source, this.text, skip, this.show);
  }

  // load next 5 objects
  loadMore() {
    this.skip += 5;
    this.filterObjects(this.text, this.skip)
  }
}
