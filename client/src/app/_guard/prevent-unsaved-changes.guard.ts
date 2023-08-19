import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard
  implements CanDeactivate<MemberEditComponent>
{
  canDeactivate(
    component: MemberEditComponent,
  ): boolean {
    if (component.editForm?.dirty) {
      return window.confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
    }
    return true;
  }
}