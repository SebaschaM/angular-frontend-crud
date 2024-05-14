import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContaineremployeeComponent } from './components/containeremployee/containeremployee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContaineremployeeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-standalone';
}
