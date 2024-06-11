import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.css',

})
export class RecapComponent {
  activeTab: string = 'tasks';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
