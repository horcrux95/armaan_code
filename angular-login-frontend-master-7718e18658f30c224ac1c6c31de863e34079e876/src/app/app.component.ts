import { Component,OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
input_error="";

  constructor(
    
    
    private router: Router
  ) {
    this.router.navigate(['/signin']);
  }

  ngOnInit() {
    
  }

  join(){
    
    
  }
  


  
}

