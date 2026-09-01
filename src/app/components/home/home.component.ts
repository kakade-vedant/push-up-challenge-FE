import { Component } from '@angular/core';
import { LogSetComponent } from "../log-set/log-set.component";

@Component({
  selector: 'app-home',
  imports: [LogSetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
