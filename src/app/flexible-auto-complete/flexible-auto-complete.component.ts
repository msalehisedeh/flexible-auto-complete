/*
* Provides rendering of a table which is using the given FlexibleTableHeader set in
* order to tabulate the given data. As per definition of earch header component,
* a column could be hidden, sortable, or draggable. Each table row can expand/collapse
* or respond to a click action.
*/
import {
    Component,
	Input,
	Output,
	AfterViewInit,
	EventEmitter,
	ElementRef
} from '@angular/core';

import { Http } from '@angular/http';

@Component({
	selector: 'flexible-auto-complete',
	templateUrl: './flexible-auto-complete.component.html',
	styleUrls: ['./flexible-auto-complete.component.scss']
})
export class FlexibleAutoCompleteComponent implements AfterViewInit{

	private interval: any;

	entry = "";
	filteredData: any[] = [];

	@Input("flexibleId")
	public flexibleId = "flexible";
	
	@Input("placeholder")
	public placeholder = "";
	
	@Input("remotepath")
	public remotepath = "body";
	
	@Input("prefetchdata")
	public prefetchdata = false;
	
	@Input("animateonresult")
	public animateonresult = false;
	
	@Input("allowdropdown")
	public allowdropdown = false;
	
	@Input('keymap')
    public keymap: any[] = [];

    @Input("icon")
    public icon = "";

    @Input("message")
    public message = "";

	@Input("direction")
    public direction = "vertical";

    @Input("delayby")
    public delayby = 300;

    @Input("triggeron")
    public triggeron = 2;

    @Input("viewport")
    public viewport = "200px";

	@Input("template")
    public template: any;

    @Input("source")
    public source: string;

    @Input("data")
    public data: any;

	@Output("onselect")
	onselect = new EventEmitter();

	@Output("onsearch")
	onsearch = new EventEmitter();

	constructor(private http: Http, private el: ElementRef) {}
	
	ngAfterViewInit() {
		this.resize(false);
		if (this.prefetchdata && this.source) {
			this.http.get(this.source).subscribe(
				(result: any) => {
					const response = this.traverseResult(result);
					if (response) {
						this.data = response;
					}
				}
			);
		}
	}

	private traverseResult(response) {
		const list = this.remotepath.split(".");
		list.map( (item) => {
			response = response ? response[item] : undefined;
		});
		const x = list.length ? response : undefined;
		return x && (typeof x === "string") ? JSON.parse(x) : x;
	}

	clickup(event, item, i, max) {
		const code = event.which;
		
		if (code === 13) {
			this.selectTab( item );
		} else if (code === 38) { // arrow up
			if(i > 0) {
				document.getElementById(this.flexibleId + "-item-" + ( i - 1)).focus();
			} else {
				document.getElementById(this.flexibleId).focus();
			}
		} else if (code === 40 && i < max) { // arrow down
			document.getElementById(this.flexibleId + "-item-" + ( i + 1)).focus();
		}
	}
	private resize(flag) {
		if (this.animateonresult) {
			if (flag) {
				this.el.nativeElement.classList.add("has-data");
			} else {
				this.el.nativeElement.classList.remove("has-data");
			}
		} else {
			this.el.nativeElement.classList.add("has-data");
		}
	}
	keyup(event) {
        const code = event.which;
		
		if (code === 13) {
			if (this.filteredData && this.filteredData.length) {
				this.selectTab( this.filteredData[0] );
			}
		} else if (code === 38) { // arrow up
			// do nothing
		} else if (code === 40) { // arrow down
			if (this.filteredData && this.filteredData.length){
				document.getElementById(this.flexibleId + "-item-0").focus();
			}
		} else {
			this.entry = event.target.value;
			if (this.interval) {
				clearTimeout(this.interval);
			}
			this.interval = setTimeout( () => {
				const key = this.entry.toLowerCase();
				if (key.length > this.triggeron) {
					if (!this.prefetchdata && this.source) {
						this.http.get(this.source + key).subscribe(
							(result: any) => {
								const response = this.traverseResult(result);
								if (response) {
									this.data = response;
									this.filteredData = response;
									if (this.filteredData.length) {
										this.onsearch.emit(key);
										setTimeout(()=> this.resize(true), 66);
									} else {
										setTimeout(()=> this.resize(false), 66);
									}
								}
							}
						);
					} else if (this.data) {
						this.filteredData = this.data.filter( (item) => {
							let keep = false;
							for(let j = 0; j < this.keymap.length; j++) {
								const k = this.keymap[j];
								let tmp = item[k]
								const v = tmp ? tmp.toLowerCase() : undefined;
								if (v && v.indexOf(key) >= 0) {
									keep = true;
									break;
								}
							}
							return keep;
						});
						if (this.filteredData.length) {
							this.onsearch.emit(key);
							setTimeout(()=> this.resize(true), 66);
						} else {
							setTimeout(()=> this.resize(false), 66);
						}
					}
				} else {
					this.filteredData = [];
					setTimeout(()=> this.resize(false), 66);
				}
			}, this.delayby);
		}
	}
	selectTab(item) {
		this.onselect.emit(item);
		this.filteredData = [];
		setTimeout(()=> this.resize(false), 66);
		this.entry = "";
	}
}
