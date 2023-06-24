import { Component } from '@angular/core';
import { IconName } from '../shared/models/icon-names.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected icon = IconName.MAIL;
  protected email = 'mateuszgonet15@gmail.com';
}
