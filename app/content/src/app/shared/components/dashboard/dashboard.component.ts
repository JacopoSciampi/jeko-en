import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public isWebView = true;

    constructor() { }

    public ngOnInit() {
        this.upsertMobileViewStatus();
    }

    @HostListener('window:resize')
    upsertMobileViewStatus() {
        (window.innerWidth >= 960) ? this.isWebView = true : this.isWebView = false;
    }

}
