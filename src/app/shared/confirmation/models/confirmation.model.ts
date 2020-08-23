import { Observable } from 'rxjs';

export interface ConfirmationModel<T> {
  action: Observable<T>,
  message: string
}