import { Component   } from '@angular/core';
import { AuthService } from '../../auth/state/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector:    'app-header',
  templateUrl: './header.component.html',
  styleUrls:   ['./header.component.scss'],
})
export class HeaderComponent {

  openNav = false

  constructor(private authService: AuthService,
              private toast: ToastrService) { }

  logout() {
    this.authService.logout();
    this.toast.success('logout success')
  }
}