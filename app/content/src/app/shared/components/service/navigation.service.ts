import { Injectable } from "@angular/core";

import { Subject } from 'rxjs';

@Injectable()
export class NavigationService {
    private $navigateTo = new Subject<string>();
    public navigateToEvent = this.$navigateTo.asObservable();

    public setNavigation(url: string): void {
        this.$navigateTo.next(url);
    }
}