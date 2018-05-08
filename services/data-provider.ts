import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc/src';
import 'rxjs/add/observable/of';

const BASE_URL = 'http://api.docugate.ch/v1/function';

@Injectable()
export class DataProvider {
    http: HttpClient;
    service: DataProvider;
    headers: HttpHeaders;
    oauth: OAuthService;
    mock_data = [
        {
            "personenid": "69b57e53-98e8-48f8-8638-f447ccd16f6f",
            "name": "Cara Casella",
            "position": "Human Resources Assistant IV"
          }, {
            "personenid": "39bbb0a0-48d8-47a2-8419-54d33b92e207",
            "name": "Brendis Gilpin",
            "position": "Nuclear Power Engineer"
          }, {
            "personenid": "f32bed3f-453a-46a9-bcbf-e09d531a0bf6",
            "name": "Vivia Popplewell",
            "position": "Quality Engineer"
          }, {
            "personenid": "3cd41ddf-8583-498c-954a-a0fcf2aa9dec",
            "name": "Callean Wait",
            "position": "GIS Technical Architect"
          }, {
            "personenid": "b06c8c29-4352-4afa-aa40-4c8003f4d581",
            "name": "Pepita Jorgesen",
            "position": "Office Assistant II"
          }, {
            "personenid": "f0539d37-9bee-4ca1-b1a1-a980fdc01d68",
            "name": "Fredi Bilofsky",
            "position": "Mechanical Systems Engineer"
          }, 
          {
            "personenid": "93962d39-0e99-44b7-a40a-d7f96503b3d5",
            "name": "Reed Dury",
            "position": "Paralegal"
          }, 
          {
            "personenid": "2ce9022c-bec2-4093-bc42-fd6dc6f5178f",
            "name": "Ulick De Cruce",
            "position": "Research Assistant III"
          },
          {
            "personenid": "3cbba323-2ef8-4654-a895-df817ea95ef8",
            "name": "Udell Aberdalgy",
            "position": "Occupational Therapist"
          }, 
          {
            "personenid": "a8d57bbf-d0b7-484e-bea9-ce7ab43c341c",
            "name": "Jay Reeken",
            "position": "Actuary"
          }, 
          {
            "personenid": "16a89ee4-f694-4298-a80d-8eb942b9901e",
            "name": "Ludwig Pearch",
            "position": "Tax Accountant"
          }, 
          {
            "personenid": "4dad868d-1957-40ff-938d-b837b9936b3a",
            "name": "Skye Menco",
            "position": "Sales Associate"
          }, 
          {
            "personenid": "9f27228e-9fae-49ca-a919-2eac56ca3aef",
            "name": "Piggy Sabattier",
            "position": "Nurse"
          }, 
          {
            "personenid": "774540f3-9e2b-490f-a988-27a7a0237c2f",
            "name": "Leanna Pennini",
            "position": "Biostatistician I"
          }, 
          {
            "personenid": "1f25e199-a181-4b5b-8587-30232359d159",
            "name": "Ethelin Kolis",
            "position": "Director of Sales"
          }, 
          {
            "personenid": "51932e10-fe52-485d-ad27-252b0b1a8335",
            "name": "Lizzie Swarbrick",
            "position": "Marketing Assistant"
          }, 
          {
            "personenid": "76c72ccf-425b-4312-b214-646f9c02ad04",
            "name": "Britney Wyllt",
            "position": "Financial Advisor"
          }, 
          {
            "personenid": "197551d9-f102-4d43-9e71-56c7bfcf3e74",
            "name": "Helaina Pauler",
            "position": "Analyst Programmer"
          }, 
          {
            "personenid": "abb5b039-8de8-43b4-8e0b-de531a87e43c",
            "name": "Horatia Vahl",
            "position": "Software Consultant"
          }, 
          {
            "personenid": "3123b975-e46e-42e8-ba87-612f9fe088a0",
            "name": "Katy Oxe",
            "position": "Administrative Officer"
          }, 
          {
            "personenid": "c9b3a508-b94b-4310-a737-6a8bb520157d",
            "name": "Svend Johnes",
            "position": "Health Coach I"
          }, 
          {
            "personenid": "6e4a950d-3bad-478d-87e7-e5a4d225d7f8",
            "name": "Gratiana Edens",
            "position": "Financial Analyst"
          }, 
          {
            "personenid": "9242af38-84a4-4449-b612-baca07237772",
            "name": "Giustina Pales",
            "position": "Account Coordinator"
          }, 
          {
            "personenid": "f54ce473-b249-4b7c-b169-db9f06a1d44f",
            "name": "Berti Pinnington",
            "position": "Staff Accountant IV"
          }, 
          {
            "personenid": "e7f53197-aeec-4951-b961-4f3475a783cd",
            "name": "Aldon Huzzey",
            "position": "Computer Systems Analyst III"
          }, 
          {
            "personenid": "9d58c69d-4602-49ba-b1e1-2dce3867cfe5",
            "name": "Nana Colmer",
            "position": "VP Quality Control"
          }, 
          {
            "personenid": "0960d522-3821-4346-a0d0-89b301d01365",
            "name": "Daffy Fandrey",
            "position": "Account Executive"
          }, 
          {
            "personenid": "31b463b6-71d0-4a5b-91da-091c510bf890",
            "name": "Jerald Seawell",
            "position": "Account Representative IV"
          }, 
          {
            "personenid": "fb4decb6-8d47-4b70-806c-9651026951c5",
            "name": "Shamus Grimstead",
            "position": "Account Representative II"
          }, 
          {
            "personenid": "e829a944-7f9e-4efc-a123-34f0c35774cc",
            "name": "Torin Rabier",
            "position": "Programmer III"
          },
          {
            "personenid": "5c85dc0c-4a60-4d89-b7cc-209f64d7e813",
            "name": "Briny Ingles",
            "position": "Speech Pathologist"
          }, 
          {
            "personenid": "6cdc54e6-ea52-4540-99ba-56a013d7c647",
            "name": "Donnie Gudgen",
            "position": "Accountant IV"
          }, 
          {
            "personenid": "552ed6d5-3f91-439c-b821-0a826399d999",
            "name": "Chaunce Popping",
            "position": "Financial Analyst"
          }, 
          {
            "personenid": "571924ba-2108-4ff3-87b0-123e9a8f1a57",
            "name": "Marguerite Hamly",
            "position": "Structural Engineer"
          }, 
          {
            "personenid": "131c91ad-3738-4509-b17d-572b2ee06af6",
            "name": "Daisie Magnus",
            "position": "VP Sales"
          }, 
          {
            "personenid": "9bd0a82d-fcae-4b10-8e62-261fa71513cb",
            "name": "Idell Baudain",
            "position": "Administrative Officer"
          }, 
          {
            "personenid": "4d43d25d-5059-45b0-9896-527a867b798c",
            "name": "Vernen Osbourne",
            "position": "Recruiter"
          }, 
          {
            "personenid": "a4518907-bdef-43dd-aa55-df92b9ea28d5",
            "name": "Fleming Chivers",
            "position": "Analyst Programmer"
          }, 
          {
            "personenid": "5b42a4a0-6d9a-4904-a450-e26c8b708b2a",
            "name": "Norry Moles",
            "position": "Account Representative IV"
          }, 
          {
            "personenid": "647c82ca-b0bb-49e9-ac56-f0f1d2fbdd7a",
            "name": "Nicolette Kenright",
            "position": "Office Assistant IV"
          }
    ];

    constructor(http: HttpClient, oauth: OAuthService) {
        this.http = http;
        this.oauth = oauth;
        // this is a random guid
    }

    // fetches data from source which matches the text param 
    fetchData(source, text, skip, show) {
        let url = `${BASE_URL}/${source}/invoke?text=${text}&skip=${skip}&show=${show}`;
        this.setHeaders();
        
        // return this.http.get<any[]>(url, { headers: this.headers });
        let results = this.mock_data.filter(d => d.name.toLowerCase().indexOf(text.toLowerCase()) === 0);
        return Observable.of(results.slice(skip, show));
    }

    // set headers for request
    setHeaders() {
        this.headers = new HttpHeaders({
            'Authorization': `Bearer ${this.oauth.getAccessToken()}`
        });
    }
}