import { Component } from '@angular/core';
import { TestService } from './test.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hello-world';

  constructor(private svc: TestService, private http: HttpClient) {
    this.svc.printToConsole('Got the service');
  }

  ngOnInit() {
    let obs = this.http.get('http://jsonplaceholder.typicode.com/users');
    obs.subscribe((response) => console.log(response));
  }
}
