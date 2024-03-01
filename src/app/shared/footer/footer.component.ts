import { Component } from '@angular/core';
import { Constants } from '../../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  resourceSections = Constants.footerContent;
}
