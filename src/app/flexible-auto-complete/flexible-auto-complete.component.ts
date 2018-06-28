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
	EventEmitter
} from '@angular/core';

import { Http } from '@angular/http';

@Component({
	selector: 'flexible-auto-complete',
	templateUrl: './flexible-auto-complete.component.html',
	styleUrls: ['./flexible-auto-complete.component.scss']
})
export class FlexibleAutoCompleteComponent {

	private interval: any;

	entry = "";
	filteredData: any[] = [];

	@Input('keymap')
    public keymap: any[] = [];

    @Input("icon")
    public icon: string;

    @Input("message")
    public message: string;

	@Input("direction")
    public direction = "vertical";

    @Input("delayby")
    public delayby = 300;

    @Input("triggeron")
    public triggeron = 2;

    @Input("source")
    public source: string;

    @Input("viewport")
    public viewport: string;

	@Input("template")
    public template: any;

    @Input("data")
    public data: any;

	@Output("onselect")
	onselect = new EventEmitter();

    constructor(private http: Http) {}

	clickup(event, item) {
		const code = event.which;
		
		if (code === 13) {
			this.selectTab( item );
		}	
	}
	keyup(event) {
        const code = event.which;
		
		if (code === 13) {
			if (this.filteredData && this.filteredData.length) {
				this.selectTab( this.filteredData[0] );
			}
		} else {
			this.entry = event.target.value;
			if (this.interval) {
				clearTimeout(this.interval);
			}
			this.interval = setTimeout( () => {
				const key = this.entry.toLowerCase();
				if (key.length > this.triggeron) {
					if (this.source) {
						this.http.get(this.source + key).subscribe(
							(result: any) => {
								this.data = result.body;
								this.filteredData = result.body;
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
					}
				} else {
					this.filteredData = [];
				}
			}, this.delayby);
		}
	}
	selectTab(item) {
		this.onselect.emit(item);
		this.filteredData = [];
		this.entry = "";
	}
}
