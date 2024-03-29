import { Component } from '@angular/core';
import { FlexibleAutoCompleteComponent } from './flexible-auto-complete/flexible-auto-complete.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FlexibleAutoCompleteComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flexible auto-complete';
  events: any[] = [];
  trigger = 2;
  allowdropdown = true;
  showCounter = false;
  forceResultIntoView = false;

  data = [
    {
      "_id": "5aaa0d8de72edc57a2ffa2a0",
      "index": 0,
      "guid": "5c4df3d6-88cc-4833-8577-cbcba31e5b72",
      "isActive": false,
      "balance": "$2,866.70",
      "picture": "/assets/images/1.png",
      "age": 39,
      "eyeColor": "blue",
      "fname": "Mathis",
      "lname": "Morales De santino JR",
      "gender": "male",
      "company": "EURON",
      "email": "mathismorales@euron.com",
      "phone": "+1 (940) 531-2138"
    },
    {
      "_id": "5aaa0d8d3530dbc3b36190ea",
      "index": 1,
      "guid": "b3682f9a-8a81-474e-88a7-5c9be2a1cc8d",
      "isActive": false,
      "balance": "$2,070.14",
      "picture": "/assets/images/2.png",
      "age": 34,
      "eyeColor": "green",
      "fname": "Tonya",
      "lname": "Sweeney",
      "gender": "female",
      "company": "FIREWAX",
      "email": "tonyasweeney@firewax.com",
      "phone": "+1 (928) 563-2254"
    },
    {
      "_id": "5aaa0d8deaa6c896d7a191f4",
      "index": 2,
      "guid": "6d8b932f-36a3-4f0c-8f48-b20cb23c8a53",
      "isActive": false,
      "balance": "$1,883.90",
      "picture": "/assets/images/3.png",
      "age": 21,
      "eyeColor": "blue",
      "fname": "Nguyen",
      "lname": "Hubbard",
      "gender": "male",
      "company": "HOMELUX",
      "email": "nguyenhubbard@homelux.com",
      "phone": "+1 (826) 465-3417"
    },
    {
      "_id": "5aaa0d8d8907a727fe9909f6",
      "index": 3,
      "guid": "701134c1-82cd-4f24-a867-f896350643f9",
      "isActive": false,
      "balance": "$3,666.56",
      "picture": "/assets/images/4.png",
      "age": 37,
      "eyeColor": "brown",
      "fname": "Cecelia",
      "lname": "Hartman",
      "gender": "female",
      "company": "MOMENTIA",
      "email": "ceceliahartman@momentia.com",
      "phone": "+1 (937) 578-2156"
    },
    {
      "_id": "5aaa0d8dce9b34329be37614",
      "index": 4,
      "guid": "09af711e-26e4-4169-8e09-99bb7ef8d149",
      "isActive": true,
      "balance": "$2,665.18",
      "picture": "/assets/images/3.png",
      "age": 28,
      "eyeColor": "green",
      "fname": "Gilliam",
      "lname": "Walker",
      "gender": "male",
      "company": "AQUASSEUR",
      "email": "gilliamwalker@aquasseur.com",
      "phone": "+1 (909) 586-3974"
    },
    {
      "_id": "5aaa0d8d276289980c471c92",
      "index": 5,
      "guid": "36913bf3-9b05-41ab-a274-d033866adf92",
      "isActive": true,
      "balance": "$3,698.24",
      "picture": "/assets/images/2.png",
      "age": 39,
      "eyeColor": "brown",
      "fname": "Bernard",
      "lname": "Downs",
      "gender": "male",
      "company": "PROSURE",
      "email": "bernarddowns@prosure.com",
      "phone": "+1 (850) 400-3183"
    },
    {
      "_id": "5aaa0d8d4bbab672fea889bc",
      "index": 6,
      "guid": "a3ca7ac4-c798-40e4-acfa-e4a942c56efb",
      "isActive": false,
      "balance": "$2,351.14",
      "picture": "/assets/images/1.png",
      "age": 28,
      "eyeColor": "brown",
      "fname": "Cooke",
      "lname": "Sellers",
      "gender": "male",
      "company": "RETROTEX",
      "email": "cookesellers@retrotex.com",
      "phone": "+1 (837) 495-3455"
    },
    {
      "_id": "5aaa0d8d8bd2919a9de7fdae",
      "index": 7,
      "guid": "170dfa05-141f-4e7b-a462-f4a55b21d3d7",
      "isActive": true,
      "balance": "$3,562.47",
      "picture": "/assets/images/2.png",
      "age": 32,
      "eyeColor": "blue",
      "fname": "Lawrence",
      "lname": "Barnett",
      "gender": "male",
      "company": "OBLIQ",
      "email": "lawrencebarnett@obliq.com",
      "phone": "+1 (939) 507-3595"
    },
    {
      "_id": "5aaa0d8d27ab2e871522318f",
      "index": 8,
      "guid": "e09ece86-d227-4c47-91ab-49481a6c6fa0",
      "isActive": false,
      "balance": "$3,756.37",
      "picture": "/assets/images/3.png",
      "age": 36,
      "eyeColor": "brown",
      "fname": "Jaime",
      "lname": "Woodard",
      "gender": "female",
      "company": "AUSTECH",
      "email": "jaimewoodard@austech.com",
      "phone": "+1 (986) 449-2054"
    },
    {
      "_id": "5aaa0d8da1df0afbe903ae1b",
      "index": 9,
      "guid": "36c27f54-bc3a-4280-903f-a79c9503a8e2",
      "isActive": true,
      "balance": "$2,819.61",
      "picture": "/assets/images/4.png",
      "age": 28,
      "eyeColor": "blue",
      "fname": "Wilcox",
      "lname": "Becker",
      "gender": "male",
      "company": "GONKLE",
      "email": "wilcoxbecker@gonkle.com",
      "phone": "+1 (922) 506-2399"
    },
    {
      "_id": "5aaa0d8de92a65a8eff0692b",
      "index": 10,
      "guid": "1064823b-bb77-4945-8bce-b37e085c6ce8",
      "isActive": false,
      "balance": "$3,981.63",
      "picture": "/assets/images/3.png",
      "age": 30,
      "eyeColor": "brown",
      "fname": "Concepcion",
      "lname": "Mcpherson",
      "gender": "female",
      "company": "WAAB",
      "email": "concepcionmcpherson@waab.com",
      "phone": "+1 (916) 529-2785"
    },
    {
      "_id": "5aaa0d8ddd09ce4ca3fb8182",
      "index": 11,
      "guid": "4c9bd812-dd98-4dfa-8751-3bc696a3f54b",
      "isActive": false,
      "balance": "$3,524.69",
      "picture": "/assets/images/2.png",
      "age": 31,
      "eyeColor": "brown",
      "fname": "Maxine",
      "lname": "Bridges",
      "gender": "female",
      "company": "KNOWLYSIS",
      "email": "maxinebridges@knowlysis.com",
      "phone": "+1 (955) 445-3426"
    },
    {
      "_id": "5aaa0d8d7a7a8292d0def9ff",
      "index": 12,
      "guid": "2a72dbbd-e543-400f-894d-8b63172517a9",
      "isActive": false,
      "balance": "$2,089.46",
      "picture": "/assets/images/1.png",
      "age": 34,
      "eyeColor": "green",
      "fname": "Craig",
      "lname": "Gibson",
      "gender": "male",
      "company": "UNCORP",
      "email": "craiggibson@uncorp.com",
      "phone": "+1 (829) 513-2318"
    },
    {
      "_id": "5aaa0d8dd9302d80f18c1e10",
      "index": 13,
      "guid": "5f1bddac-19a6-47fa-ba25-6b38b87c8f50",
      "isActive": false,
      "balance": "$1,000.51",
      "picture": "/assets/images/2.png",
      "age": 20,
      "eyeColor": "blue",
      "fname": "Gould",
      "lname": "Holmes",
      "gender": "male",
      "company": "BALUBA",
      "email": "gouldholmes@baluba.com",
      "phone": "+1 (860) 452-2739"
    },
    {
      "_id": "5aaa0d8d1995a9d1cb81de78",
      "index": 14,
      "guid": "929950e8-1b7e-49fd-9166-a22e1b013eae",
      "isActive": false,
      "balance": "$3,977.01",
      "picture": "/assets/images/3.png",
      "age": 40,
      "eyeColor": "green",
      "fname": "Downs",
      "lname": "Kent",
      "gender": "male",
      "company": "ANDERSHUN",
      "email": "downskent@andershun.com",
      "phone": "+1 (917) 525-3943"
    },
    {
      "_id": "5aaa0d8d405ccbedbddc2908",
      "index": 15,
      "guid": "5f8316b5-bb86-4323-a1c9-fd0ef87b0550",
      "isActive": false,
      "balance": "$2,852.33",
      "picture": "/assets/images/4.png",
      "age": 31,
      "eyeColor": "blue",
      "fname": "Matelda",
      "lname": "England",
      "gender": "male",
      "company": "BIOSPAN",
      "email": "ramosengland@biospan.com",
      "phone": "+1 (883) 524-3172"
    },
    {
      "_id": "5aaa0d8de72edc57a2ffa2a0",
      "index": 0,
      "guid": "5c4df3d6-88cc-4833-8577-cbcba31e5b72",
      "isActive": false,
      "balance": "$2,866.70",
      "picture": "/assets/images/3.png",
      "age": 19,
      "eyeColor": "blue",
      "fname": "Mathew",
      "lname": "Menendez",
      "gender": "male",
      "company": "EURON",
      "email": "mathismorales@euron.com",
      "phone": "+1 (940) 531-2138"
    }
  ];
  
  constructor() {

  }

  keyup(event: any) {
    const code = event.which;
    if (code === 13) {
      event.target.click();
		}
  }
  textkeyup(event: any) {
    const code = event.which;
    if (code === 13) {
      this.onTriggerEntered(event);
		}
  }
  onTriggerEntered(event: any) {
    if (event.target.value.length) {
      this.trigger = isNaN(event.target.value) ? 2 : parseInt(event.target.value, 10);
    }
  }
  click(event: any, attr: any) {
    const checked = event.target.checked;
    switch(attr) {
      case 'allowdropdown' : this.allowdropdown = checked; break;
      case 'showCounter' : this.showCounter = checked; break;
      case 'forceResultIntoView' : this.forceResultIntoView = checked; break;
    }
  }
  onsearch(event: any) {
    this.events.push("Searching for " +event);
  }
  onselection(event: any) {
    this.events.push(event);
  }
}
