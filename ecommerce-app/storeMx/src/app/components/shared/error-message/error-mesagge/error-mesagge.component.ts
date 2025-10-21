import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-mesagge',
  imports: [],
  templateUrl: './error-mesagge.component.html',
  styleUrl: './error-mesagge.component.css'
})
export class ErrorMesaggeComponent {
  @Input() message:string = ''
}
