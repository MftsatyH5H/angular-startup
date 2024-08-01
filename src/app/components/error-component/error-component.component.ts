import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-error-component',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './error-component.component.html',
  styleUrl: './error-component.component.css'

})
export class ErrorComponentComponent {
  visible: boolean = true;
  @Input() errBody = '';
  @Input() errHead = '';

}
