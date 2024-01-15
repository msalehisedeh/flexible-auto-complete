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

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'flexible-auto-complete',
	standalone: true,
	imports: [CommonModule, HttpClientModule],
	providers: [HttpClient],
	templateUrl: './flexible-auto-complete.component.html',
	styleUrls: ['./flexible-auto-complete.component.scss']
})
export class FlexibleAutoCompleteComponent implements AfterViewInit{

	private interval: any;

	entry = "";
	focusedItem = -1;
	verticalPosition = '';
	flipOrigin = false;
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
	set animateonresult(value: boolean) {
		throw 'animateonresult is deprecated';
	}
	
	@Input("allowdropdown")
	public allowdropdown = false;
	
	@Input("showCounter")
	public showCounter = false;
	
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
    public source!: string;

    @Input("data")
    public data: any;

	@Output("onselect")
	onselect = new EventEmitter();

	@Output("onsearch")
	onsearch = new EventEmitter();

	constructor(private http: HttpClient, private el: ElementRef) {}
	
	ngAfterViewInit() {
		this.resize(false, []);
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

	private traverseResult(response: any) {
		const list = this.remotepath.split(".");
		list.map( (item) => {
			response = response ? response[item] : undefined;
		});
		const x = list.length ? response : undefined;
		return x && (typeof x === "string") ? JSON.parse(x) : x;
	}

	onBlur(event: any) {
		setTimeout(() => {
			if (this.filteredData.length && (this.focusedItem < 0)) {
				this.focusedItem = -1;
				this.filteredData = [];
			}
		}, 66);
	}
	onBlurItem(event: any, i: number) {
		if (i === this.filteredData.length - 1) {
			this.focusedItem = -1;
			this.verticalPosition = '';
			this.filteredData = [];
		}
	}
	clickup(event: any, item: any, i: number, max: number) {
		const code = event.which;
		
		if (code === 13) {
			this.selectTab( item );
		} else if (code === 38) { // arrow up
			if(i > 0) {
				document.getElementById(this.flexibleId + "-item-" + ( i - 1))?.focus();
			} else {
				document.getElementById(this.flexibleId)?.focus();
			}
		} else if (code === 40 && i < max) { // arrow down
			document.getElementById(this.flexibleId + "-item-" + ( i + 1))?.focus();
		} else if (code === 9) { // tab
			if (i < max) {
				document.getElementById(this.flexibleId + "-item-" + ( i ))?.focus();
			}
		} 
	}
	private resize(flag: boolean, result: any[], source?: any) {
		if (flag && source) {
			const sr = source.getBoundingClientRect();
			const dr = document.body.getBoundingClientRect();
			if ((dr.height - sr.y) < (result.length * 20)) {
				this.verticalPosition = (sr.height + 5) + 'px';
			} else {
				this.verticalPosition = '';
			}
			this.flipOrigin = ((dr.width - (sr.x+sr.width)) < sr.width);
			this.filteredData = result;
		}
	}
	onFocus(event: any) {
		if (event.target.value) {
			this.search(event);
		}
	}
	keyup(event: any) {
        const code = event.which;
		
		if (code === 13) {
			if (this.filteredData && this.filteredData.length) {
				this.selectTab( this.filteredData[0] );
			} else {
				this.search(event);
			}
		} else if (code === 9) { // tab
			if (this.focusedItem < 0) {
				this.filteredData = [];
			}
		} else if (code === 38) { // arrow up
			// do nothing
		} else if (code === 40) { // arrow down
			if (this.filteredData && this.filteredData.length){
				document.getElementById(this.flexibleId + "-item-0")?.focus();
			}
		} else {
			this.filteredData = [];
			this.search(event);
		}
	}
	selectTab(item: any) {
		this.onselect.emit(item);
		this.focusedItem = -1;
		setTimeout(()=> this.resize(false, this.filteredData), 66);
	}
	private search(event: any) {
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
								if (response.length) {
									this.onsearch.emit(key);
									setTimeout(()=> this.resize(true, response, event.target), 66);
								} else {
									setTimeout(()=> this.resize(false, []), 66);
								}
							}
						}
					);
				} else if (this.data) {
					const response = this.data.filter( (item: any) => {
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
					if (response.length) {
						this.onsearch.emit(key);
						setTimeout(()=> {
							this.resize(true, response, event.target);
						}, 66);
					} else {
						setTimeout(()=> this.resize(false, []), 66);
					}
				}
			} else {
				setTimeout(()=> this.resize(false, []), 66);
			}
		}, this.delayby);
	}
}
