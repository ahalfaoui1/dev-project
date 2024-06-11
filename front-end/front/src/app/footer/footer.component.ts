import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  content?: string;

  constructor() {}

  ngOnInit() {
    // Initialization logic if needed
  }

  ngOnDestroy() {
    // Cleanup logic if needed
  }
}
