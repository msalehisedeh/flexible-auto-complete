
# Welcome to Flexible Autocomplete!

Have you ever wanted to have a ready to use auto-complete that can easily fit in your components? Have you thought of what it takes to get there? 
With flexible auto-complete, you can configure an auto-complete to perform task the way you want it.

Please send your requests or comments through the link provided below:

[Live Demo](https://flexible-auto-complete.stackblitz.io)  | [Source code](https://github.com/msalehisedeh/flexible-auto-complete) | [Comments/Requests](https://github.com/msalehisedeh/flexible-auto-complete/issues)


# Version 1.0.1
Fixed few issues and added attributes to make the auto-fill function better.

# Version 1.0.0

```javascript
MODULE:
  FlexibleAutoCompleteModule

EXPORTS:
  FlexibleAutoCompleteComponent
```

## Features
* Responsive
* ADA Compliant
* Configurable

### How it can be done?

You will need to set the auto-complete in your HTML content:
```javascript
In this example:
1) if icon left blank, will not show icon on the auto-complete field.
2) message is needed to set text in order to make ADA compliant message on each tab.
4) direction options are vertical and horizontal. If hoeizontal, results will be laid out horizontally.
5) delay time is in miliseconds and delays making remote requests in order to capture as many characters as possible for fast type users.
6) triggeron will make request after number of charachters reached.
7) view port max size the popup options.
8) template allows you to shape the way you want the result be displayed.  otherwise internal default template will be used.
9) keymap is a list of keys to be used when trying to match up and filter/display data in the response received or in the default data supplied.
10) if 'source' URL is not supplied, supplied 'data' will be used to do type ahead lookup.
11) 'source' URL will be concatinated with typed charachters. so, if url is http://somethig/keywords, you need to supply 'http://somethig/' or if it is 'http://somethig?param=keyword' you need to supply 'http://somethig?param='. If source URL is supplied, no need to supply data as it will be ignored.
12) prefetchdata will call the remote source URL without additional arguments and saves the result for filtering when user types in charachters.
13) remotepath instructs the auto complete to access results through given value. By default, response.body will be used to get the results.  If remotepath contains dot, result will be traverse down to its final destination. for example, "body.data" will fetch data from "response.body.data".

<flexible-auto-complete 
  icon="fa fa-search"
  message="find user" 
  placeholder="Please enter a name" 
  direction="vertical"
  delayby="300"
  triggeron="2"
  viewport="200px"
  [template]="tab2" 
  [data]="data"
  [keymap]="['fname','lname']"
  (onselect)="onselection($event)"></flexible-auto-complete>
  
<flexible-auto-complete 
  icon="fa fa-search"
  message="find user" 
  placeholder="Please enter a name" 
  prefetchdata="true"
  source="http://jsonplaceholder.typicode.com/users/"
  remotepath="_body"
  [keymap]="['name']"
  (onselect)="onselection($event)"></flexible-auto-complete>

<ng-template #tab2 let-detail="data">
  <img [src]="detail.picture" width="10px" />
  <span class="info">
      <span><span class="bold">Name:</span> {{detail.fname}} {{detail.lname}}</span>
      <span><span class="bold">Age:</span> {{detail.age}}</span>
      <span><span class="bold">Phone:</span> {{detail.phone}}</span>
    </span>
</ng-template>
```

You will also need to implement a few functions

```javascript
  onselection(event) {
    // decide on what to do with the evet
  }
```

If you want to overide any parts of default look, you can use ::ng-deep and do the following:
```javascript
CSS Example:

::ng-deep .viewport {
    li {
        display: flex;
        flex-direction: row;

        img {
            border-radius: 50%;
            border: 1px splid red;
            flex: 0 0 2%;
            float: left;
            width: 25px;
            height: 25px;
        }
        .info {
            font-size: 0.9rem;
            display: flex;
            flex-direction: column;
            float: left;
            margin-left: 5px;
            flex: 1;

            .bold {
                font-weight: bold;
            }
        }
    }
}
```

![alt text](https://raw.githubusercontent.com/msalehisedeh/flexible-auto-complete/master/sample.png  "What you would see when a flexible auto-complete is used")


### How to include font-awesome in your project?

In your project root folder, find and open the file 'angular-cli.json' in any editor 
Locate the styles[] array and add font-awesome references directory. like:

```javascript
"apps": 
	[
        {
            ....
            "styles": [
              "../node_modules/font-awesome/css/font-awesome.css"
              "styles.css"
            ],
            ...
        }
    ]
```