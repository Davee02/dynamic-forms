import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const COMPLEXFIELD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TdDynamicComplexfieldComponent),
  multi: true,
};

@Component({
  providers: [ COMPLEXFIELD_CONTROL_VALUE_ACCESSOR ],
  selector: 'td-dynamic-complexfield',
  styleUrls: [ './dynamic-complexfield.component.scss' ],
  templateUrl: './dynamic-complexfield.component.html',
})
export class TdDynamicComplexfieldComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
  queryId: string = undefined;
  
  endpoint: string = undefined;
  
  title: string = undefined;
  
  subtitle: string = undefined;
  
  icon: string = "image";

  control: FormControl;

  label: string = '';

  type: string = undefined;

  required: boolean = undefined;

  filteredObjects: Observable<any[]>;

  objects: any[] = new Array<any>();

  constructor() {
    super();
    this.loadObjects();
    this.control = new FormControl();
    this.filteredObjects = this.control.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.objects.slice())
      );
  }

  filterStates(title: string) {
    return this.objects.filter(state =>
      state.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }

  loadObjects() {
    this.objects = [
      {
        "name": "person",
        "type": "complex",
        "required": true,
        "queryId": "00000000-0000-0000-0000-000000000000",
        "label": "Adressat",
        "title": "Max Muster",
        "subtitle": "Neustadtstrasse 25",
        "icon": "image"
      },
      {
        "name": "person",
        "type": "complex",
        "required": true,
        "queryId": "00000000-0000-0000-0000-000000000000",
        "label": "Adressat",
        "title": "Hans Holzer",
        "subtitle": "Waldweg 25",
        "icon": "person"
      }
    ];
  }
}
