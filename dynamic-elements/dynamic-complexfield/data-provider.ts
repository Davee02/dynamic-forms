import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';

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
            "queryId": "00000000-0000-0000-0000-000000000001",
            "label": "Adressat",
            "title": "Hans Holzer",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000002",
            "label": "Adressat",
            "title": "Marcel Wüest",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000003",
            "label": "Adressat",
            "title": "Sandro Ruch",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000004",
            "label": "Adressat",
            "title": "Fabian Nef",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000005",
            "label": "Adressat",
            "title": "Samuel Walker",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000006",
            "label": "Adressat",
            "title": "Elena Müller",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000007",
            "label": "Adressat",
            "title": "Nina Stocker",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000008",
            "label": "Adressat",
            "title": "Sarah Amstutz",
            "subtitle": "Neustadtstrasse 25",
            "icon": "image"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000009",
            "label": "Adressat",
            "title": "Manuel Walter",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000010",
            "label": "Adressat",
            "title": "Arina Demic",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000011",
            "label": "Adressat",
            "title": "Roland Just",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000012",
            "label": "Adressat",
            "title": "Noa Truttmann",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000013",
            "label": "Adressat",
            "title": "Adrian Moos",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000014",
            "label": "Adressat",
            "title": "Gabriela Oss",
            "subtitle": "Waldweg 25",
            "icon": "person"
        },
        {
            "name": "person",
            "type": "complex",
            "required": true,
            "queryId": "00000000-0000-0000-0000-000000000015",
            "label": "Adressat",
            "title": "Ursula Zemp",
            "subtitle": "Waldweg 25",
            "icon": "person"
        }
    ];

    constructor(http: HttpClient) {
        this.http = http;
        // this is a random guid
        this.source = '9a972dbc-2f9b-4b50-880d-480d578714f9'
    }

    // fetches data which matches the text param 
    fetchData(text, skip, show) {
        // let url = `${BASE_URL}/${this.source}/invoke?text=${this.text}&skip=${this.skip}&show=${this.show}`;
        // console.debug('fetching data from: ', url);

        // return this.http.get<any[]>(url);

        let results = this.mock_data.filter(d => d.title.toLowerCase().indexOf(text.toLowerCase()) === 0);
        return Observable.of(results.slice(skip, show));
    }
}