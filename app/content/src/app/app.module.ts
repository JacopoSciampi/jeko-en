import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

import { NavigationService } from './shared/components/service/navigation.service';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        NavbarComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        NavigationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
