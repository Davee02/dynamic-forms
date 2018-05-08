import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const BASE_URL = 'http://api.docugate.ch/v1/function';

@Injectable()
export class DataProvider {
    http: HttpClient;
    service: DataProvider;
    source: string;
    skip: number;
    show: number;
    text: string;
    mock_data = [
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
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000000",
            "label": "Adressat",
            "title": "Marcel Wüest",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000000",
            "label": "Adressat",
            "title": "Sandro Ruch",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000000",
            "label": "Adressat",
            "title": "Fabian Nef",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000000",
            "label": "Adressat",
            "title": "Samuel Walker",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000000",
            "label": "Adressat",
            "title": "Elena Müller",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000000",
            "label": "Adressat",
            "title": "Nina Stocker",
            "subtitle": "Waldweg 25",
            "icon": "person"
        }
    ];

    constructor(
        service: DataProvider,
        http: HttpClient) {
            this.http = http;
            this.service = service;
            // this is a random guid
            this.source = '9a972dbc-2f9b-4b50-880d-480d578714f9'
    }

    fetchData(text, skip, show) {
        // let url = `${BASE_URL}/${this.source}/invoke?text=${this.text}&skip=${this.skip}&show=${this.show}`;
        // console.debug('fetching data from: ', url);

        // return this.http.get<any[]>(url);

        return Observable.of(this.mock_data.filter(d => d.title.toLowerCase().indexOf(text.toLowerCase()) === 0));
    }
}