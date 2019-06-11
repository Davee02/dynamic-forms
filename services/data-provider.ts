import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc/src';

const BASE_URL = 'http://api.docugate.ch/v1/function';

@Injectable()
export class DataProvider {
  http: HttpClient;
  service: DataProvider;
  headers: HttpHeaders;
  oauth: OAuthService;
  mock_data = [
    {
      "personid": "32e707a3-f68e-4209-abe4-824aa2f6f91e",
      "name": "Cirstoforo Bullivent",
      "position": "Structural Engineer"
    },
    {
      "personid": "c1423378-2cbd-4b34-be84-a1d01bc3e9dd",
      "name": "Lisabeth Suggitt",
      "position": "Senior Sales Associate"
    },
    {
      "personid": "2b8f7ac5-1fe5-4d04-8dea-895005dfa054",
      "name": "Jaquenette Janiszewski",
      "position": "Research Nurse"
    },
    {
      "personid": "63a32e73-7992-468b-9cae-ce58c44ec429",
      "name": "Aleksandr Summerson",
      "position": "Sales Associate"
    },
    {
      "personid": "d9c322eb-0b59-4c93-bacd-5c0a45bb2ffc",
      "name": "Carlyle Rodinger",
      "position": "Professor"
    },
    {
      "personid": "e8a8493b-9783-44bc-80c0-a49eefdcfb2c",
      "name": "Alec Van Oord",
      "position": "VP Accounting"
    },
    {
      "personid": "edbb6841-9b41-42b5-9dd0-32188bb17845",
      "name": "Goldi Goodwell",
      "position": "General Manager"
    },
    {
      "personid": "599d7c20-f923-4ee6-aa56-81818d3a7794",
      "name": "Ansell Keilloh",
      "position": "Nurse Practicioner"
    },
    {
      "personid": "37c0e873-feff-492d-a0ea-58d95103c2d5",
      "name": "George Gerg",
      "position": "Actuary"
    },
    {
      "personid": "254cd49a-33b1-4262-80e1-ee7804bc37e2",
      "name": "Jaymee Ervin",
      "position": "Administrative Assistant III"
    },
    {
      "personid": "62579808-9e68-42fc-9583-748e9774fb7e",
      "name": "Marlyn Drinkel",
      "position": "Help Desk Operator"
    },
    {
      "personid": "6cc362b6-7ee1-4101-80c4-5dc7ab9f4487",
      "name": "Kinnie Nesbit",
      "position": "Professor"
    },
    {
      "personid": "4ef6f3cb-bb28-4fa2-9656-4fc308019b22",
      "name": "Dolly Matthaus",
      "position": "Community Outreach Specialist"
    },
    {
      "personid": "9fbec0a5-2545-408a-b816-ac63024895d1",
      "name": "Giraud Demicoli",
      "position": "Geologist II"
    },
    {
      "personid": "e16b276e-42be-4282-9ec3-9195f28c4a0b",
      "name": "Weider Farry",
      "position": "Teacher"
    },
    {
      "personid": "580b78cf-395f-493b-b089-1499686d5b81",
      "name": "Karalee Barenski",
      "position": "Automation Specialist IV"
    },
    {
      "personid": "5544f904-7d08-431a-8621-4769a341fb5a",
      "name": "Jerry Sighard",
      "position": "Junior Executive"
    },
    {
      "personid": "154e682e-9c66-4779-bf01-8e6e204644f9",
      "name": "Curtis Trinkwon",
      "position": "Financial Advisor"
    },
    {
      "personid": "2e1aafb6-5ef8-461e-98a9-2bd3ed12ab9e",
      "name": "Baryram Bloore",
      "position": "Accounting Assistant I"
    },
    {
      "personid": "a9736675-93d2-4230-bed8-57a0ef95f31e",
      "name": "Ellerey Eddies",
      "position": "Chemical Engineer"
    },
    {
      "personid": "fef32644-a5e8-4293-a7d3-56469e41f5f2",
      "name": "William Twitchings",
      "position": "Mechanical Systems Engineer"
    },
    {
      "personid": "909a362c-e2d0-40a1-af6a-f43a8406d34d",
      "name": "Rheba Orae",
      "position": "Quality Control Specialist"
    },
    {
      "personid": "38a51d07-6771-4a8e-b281-330049856f10",
      "name": "Arda Sneller",
      "position": "Tax Accountant"
    },
    {
      "personid": "1b05b79e-abba-4a48-83ae-35288a8d7c95",
      "name": "Flossi Lethcoe",
      "position": "Help Desk Technician"
    },
    {
      "personid": "a1046f09-73e4-4ef3-b277-17c96cb64e9a",
      "name": "Doris Frodsam",
      "position": "Account Representative II"
    },
    {
      "personid": "dc3cd1e9-ea9a-4ecc-ad0a-45151bb34d10",
      "name": "Murvyn De Banke",
      "position": "Health Coach III"
    },
    {
      "personid": "8e5a4999-a846-417c-95f4-b50123056836",
      "name": "Francklin Van der Hoeven",
      "position": "Accounting Assistant II"
    },
    {
      "personid": "abc1aa76-bc87-4fc7-aca5-5539cce7a33e",
      "name": "Shirley Jacketts",
      "position": "Media Manager III"
    },
    {
      "personid": "f6e3714b-aa18-470f-b874-f58cb3e13c9a",
      "name": "Bobby Tumioto",
      "position": "Marketing Manager"
    },
    {
      "personid": "bdb48b51-77f6-44db-88e2-fe4b1a730744",
      "name": "Moses Lower",
      "position": "Chemical Engineer"
    },
    {
      "personid": "69c40830-8b8e-479a-956f-4a4873faa021",
      "name": "Abbe Herculeson",
      "position": "Physical Therapy Assistant"
    },
    {
      "personid": "f5359814-abb7-408c-9139-4521659a7216",
      "name": "Gun Davidek",
      "position": "Nurse"
    },
    {
      "personid": "91d8dc92-be15-4ae2-b02a-518f84a60678",
      "name": "Augusta Kirkhouse",
      "position": "Staff Accountant IV"
    },
    {
      "personid": "29d20494-051e-4a3f-9279-67e9ab8b3b38",
      "name": "Shelba Anthony",
      "position": "Mechanical Systems Engineer"
    },
    {
      "personid": "70f5227d-5f18-43a8-ae01-477b8d9b68e8",
      "name": "Sloane Deschelle",
      "position": "Web Developer II"
    },
    {
      "personid": "f2739af9-2b0d-4fe2-aa31-dcdd22aace97",
      "name": "Zena Benasik",
      "position": "Recruiting Manager"
    },
    {
      "personid": "f878d674-b1ce-4a83-a78e-5277893fc2a9",
      "name": "Jackqueline Everex",
      "position": "Product Engineer"
    },
    {
      "personid": "25486dd0-eab3-42eb-bfb1-17faff789480",
      "name": "Goldia Jillitt",
      "position": "Accountant III"
    },
    {
      "personid": "2a4b326b-fab1-40d0-a55d-ac11e9b799b7",
      "name": "Rheta Doxey",
      "position": "Programmer Analyst I"
    },
    {
      "personid": "469e796b-469a-4a9c-bd96-b9a2d5a1a5f9",
      "name": "Amandy Woolfenden",
      "position": "Administrative Assistant IV"
    },
    {
      "personid": "478b71a9-f4cf-435e-a143-48c7c3741f58",
      "name": "Suzie Laurisch",
      "position": "Systems Administrator III"
    },
    {
      "personid": "b1066bed-2de5-48a3-8774-80cb00da4b4e",
      "name": "Tanitansy MacLucais",
      "position": "Business Systems Development Analyst"
    },
    {
      "personid": "72ba9ccd-4d70-458f-a86c-10bf6b695c0c",
      "name": "Hulda DelaField",
      "position": "Web Developer II"
    },
    {
      "personid": "f75a09ed-85c8-42c7-bb3b-310b528054a8",
      "name": "Cissy Whifen",
      "position": "Clinical Specialist"
    },
    {
      "personid": "b4789469-46f0-482e-9942-bb3366b5ee52",
      "name": "Anastasie Freddi",
      "position": "Librarian"
    },
    {
      "personid": "f75432a3-1b7b-4a7e-9be6-e8b8746c00ee",
      "name": "Merna Abdy",
      "position": "Actuary"
    },
    {
      "personid": "0ec8da33-c0f8-447c-9bdc-78590f25f899",
      "name": "Shurlock Gauche",
      "position": "Software Consultant"
    },
    {
      "personid": "c3f4d811-fdb6-49d9-bdd5-a103c0171106",
      "name": "Auberta Forryan",
      "position": "Analyst Programmer"
    },
    {
      "personid": "6759722a-8a5a-4d3c-97ee-75efd85b4633",
      "name": "Salaidh Deaville",
      "position": "Health Coach II"
    },
    {
      "personid": "4783fe67-8b1a-4710-bf2a-0d4c649bcbad",
      "name": "Rabi Glew",
      "position": "Staff Accountant II"
    },
    {
      "personid": "c4c3d75f-40e6-4d5a-9aff-ba80137a4a63",
      "name": "Natividad Fullager",
      "position": "Payment Adjustment Coordinator"
    },
    {
      "personid": "8c81c524-ea2d-4e53-b14f-29e3cc4e0f0a",
      "name": "Norry Kenderdine",
      "position": "Recruiter"
    },
    {
      "personid": "449da8a7-b86f-4a1f-8db3-c50218ed3b37",
      "name": "Kellen Land",
      "position": "Recruiting Manager"
    },
    {
      "personid": "856bedea-3a4a-4c85-99e5-585d11fb22e1",
      "name": "Remy Arlett",
      "position": "Human Resources Assistant I"
    },
    {
      "personid": "ccdd918e-347e-44f2-abe2-e7dd72ed9259",
      "name": "Fair Heisler",
      "position": "VP Marketing"
    },
    {
      "personid": "ad7335cd-d9d6-4e15-9445-223b9ffbe916",
      "name": "Bunnie Raleston",
      "position": "Financial Advisor"
    },
    {
      "personid": "30677a2d-e8b1-4028-b6f7-410e1c08fabb",
      "name": "Noelle Areles",
      "position": "Programmer Analyst IV"
    },
    {
      "personid": "3a0d54f2-0717-448d-9177-403edcdfff8c",
      "name": "Garold Hannen",
      "position": "Financial Advisor"
    },
    {
      "personid": "1fee851a-dfcd-46f8-994f-a705587c9a89",
      "name": "Chuck Scemp",
      "position": "Nurse Practicioner"
    },
    {
      "personid": "9676f054-9757-4282-a4de-39a20ea5fed2",
      "name": "Tiphany Gleeton",
      "position": "VP Quality Control"
    },
    {
      "personid": "0bb2d61d-a76f-44f6-bc90-e51b4743d1c6",
      "name": "Lucian Caldicott",
      "position": "Accountant IV"
    },
    {
      "personid": "82bcae1e-e76f-48f1-b5e4-3c58a1310101",
      "name": "Guy Antos",
      "position": "Marketing Assistant"
    },
    {
      "personid": "d2c88d65-33d1-4f8b-bece-2486c0df0bc4",
      "name": "Dorena Smillie",
      "position": "Information Systems Manager"
    },
    {
      "personid": "ba7d8d4b-cf96-4905-8145-ecaed45ca389",
      "name": "Pepillo Hennemann",
      "position": "Technical Writer"
    },
    {
      "personid": "0f5a59db-83fe-4038-b9c0-098240adcd52",
      "name": "Dulcine Tschersich",
      "position": "Human Resources Manager"
    },
    {
      "personid": "7743b2ae-3883-4a41-ae6f-ac4274fb397d",
      "name": "Leslie Ousbie",
      "position": "General Manager"
    },
    {
      "personid": "7d6d9eb8-37fc-483b-b754-0de047deaa55",
      "name": "Rosemaria Betun",
      "position": "Junior Executive"
    },
    {
      "personid": "c0789527-4cea-4a1c-b453-7f96735b2018",
      "name": "Massimiliano Carss",
      "position": "Nurse Practicioner"
    },
    {
      "personid": "f00268eb-68fb-4a65-a017-059697241b52",
      "name": "Lek Heball",
      "position": "Senior Developer"
    },
    {
      "personid": "6f892b66-5762-413b-ae5c-e14599d02fac",
      "name": "Sherwin Greest",
      "position": "Environmental Tech"
    },
    {
      "personid": "a66832f9-0009-42a1-9bf4-db75e0b8c4b5",
      "name": "Verne Esome",
      "position": "Financial Analyst"
    },
    {
      "personid": "d63209df-2902-46a2-afa8-5b2ec3249132",
      "name": "Sherri Ouver",
      "position": "Design Engineer"
    },
    {
      "personid": "cb294471-499a-46dd-b76d-3353e0164b15",
      "name": "Sabrina Whatson",
      "position": "Physical Therapy Assistant"
    },
    {
      "personid": "d943dba1-ad57-4601-bbc2-615d050cfd8d",
      "name": "Josy Fairall",
      "position": "Office Assistant I"
    },
    {
      "personid": "207a9ced-85c2-4e08-b07b-8a8f7968ce36",
      "name": "Bartolemo Janaszkiewicz",
      "position": "Associate Professor"
    },
    {
      "personid": "08169cd7-7278-4119-b766-7174f0277cf3",
      "name": "Lothaire Klimes",
      "position": "Financial Analyst"
    },
    {
      "personid": "2d0fe8d0-79e0-4256-822c-eb989f588a2e",
      "name": "Brigid Freezor",
      "position": "General Manager"
    },
    {
      "personid": "bbe4fd69-7d92-413d-8f26-02eb6b660214",
      "name": "Wendell Grieger",
      "position": "Executive Secretary"
    },
    {
      "personid": "0b027946-ddd3-42e7-9570-a443472beef8",
      "name": "Kara Goodfield",
      "position": "Senior Financial Analyst"
    },
    {
      "personid": "2d2cdcfa-a2aa-49a0-9b65-e6908c470c86",
      "name": "Marchall Allred",
      "position": "Analog Circuit Design manager"
    },
    {
      "personid": "f2875a4c-c935-4bf1-a887-ac98e7c50b4d",
      "name": "Katherine Burgne",
      "position": "Senior Quality Engineer"
    },
    {
      "personid": "caa9ca93-4029-461e-8986-21e922482a2d",
      "name": "Rosco Viney",
      "position": "Junior Executive"
    },
    {
      "personid": "8ea06c54-8828-4a26-a12d-178cd706861d",
      "name": "Ernst Mangenet",
      "position": "Human Resources Assistant III"
    },
    {
      "personid": "3d8bc2f3-0545-484a-b0e6-25e83f9b8c37",
      "name": "Leonhard Jesse",
      "position": "Assistant Professor"
    },
    {
      "personid": "addcb170-0ae5-4058-bec4-b1bd919498e3",
      "name": "Carlen Humpage",
      "position": "Legal Assistant"
    },
    {
      "personid": "4c6b0513-5335-4694-86d1-a85b561efd12",
      "name": "Normie Rogier",
      "position": "Human Resources Assistant II"
    },
    {
      "personid": "d74dc706-364b-4828-8caa-0a7bdfc8b4e0",
      "name": "Francisco Pett",
      "position": "Product Engineer"
    },
    {
      "personid": "52daf482-2cf2-4e76-a9c3-c32e19b54939",
      "name": "Arvy Hanscomb",
      "position": "Chief Design Engineer"
    },
    {
      "personid": "f300cc14-4fae-48fa-a568-46ce0c95d705",
      "name": "Culley Nibley",
      "position": "Payment Adjustment Coordinator"
    },
    {
      "personid": "f59dea6c-dc20-4fbc-a01b-f3a752873cb3",
      "name": "Joelynn McGuiney",
      "position": "Computer Systems Analyst IV"
    },
    {
      "personid": "31a364ab-8f75-4c41-b8d4-1fbe67f4e338",
      "name": "Corrie Dunsford",
      "position": "Design Engineer"
    },
    {
      "personid": "1a5ade49-5f70-4eaa-9789-151413959e99",
      "name": "Vic Scorthorne",
      "position": "Account Coordinator"
    },
    {
      "personid": "dde46f7a-93bb-4105-b02f-f9f9bb754e92",
      "name": "Angel Franciskiewicz",
      "position": "Staff Scientist"
    },
    {
      "personid": "b406837c-a18d-4105-bd40-0469afd1b0a3",
      "name": "Emory Dower",
      "position": "VP Product Management"
    },
    {
      "personid": "df2d4c56-2b12-4c60-a6e4-3ca494be2cee",
      "name": "Elva Leggat",
      "position": "Analog Circuit Design manager"
    },
    {
      "personid": "25c72f2a-d07b-4abc-8f27-16e7d3032db3",
      "name": "Francis Gaddas",
      "position": "Financial Advisor"
    },
    {
      "personid": "aac7bbd6-ff06-499a-ace5-8ff8d7aa4e43",
      "name": "Felike Haggish",
      "position": "Desktop Support Technician"
    },
    {
      "personid": "12f16ba8-2e26-413f-a3f6-c500b927010c",
      "name": "Perice Agirre",
      "position": "Research Associate"
    },
    {
      "personid": "abe2e5d0-0a49-42fa-b0a8-3edd824afc86",
      "name": "Irving Ianiello",
      "position": "Junior Executive"
    },
    {
      "personid": "d41020ed-c38a-4c31-b6a6-76f2e8c31bf4",
      "name": "Dur Ashingden",
      "position": "VP Sales"
    }];

  constructor(http: HttpClient, oauth: OAuthService) {
    this.http = http;
    this.oauth = oauth;
    // this is a random guid
  }

  // fetches data from source which matches the text param 
  fetchData(functionUrl, source, text, skip, take) {
    let url = `${functionUrl}/${source}/invoke?text=${text}&skip=${skip}&take=${take}`;
    console.debug('URL', url)
    this.setHeaders();

    console.debug('skip: ',skip)
    console.debug('take', take)

    return this.http.get<any[]>(url, { headers: this.headers });
  }

  // set headers for request
  setHeaders() {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.oauth.getAccessToken()}`
    });
  }
}

export class Response {
  key: string;
  skip: number;
  take: number;
  results: any[];
}