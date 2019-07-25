import { Component, Input } from '@angular/core';

import { NavigationService } from 'src/app/shared/components/service/navigation.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    @Input() isWebView: boolean;
    constructor(
        private navigationService: NavigationService
    ) { }

    public navigateTo(url: string): void {
        this.navigationService.setNavigation(url);
    }

}
