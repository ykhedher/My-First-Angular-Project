import {User} from '../models/user.model';
import {Subject} from 'rxjs';
export class UserSevice {
  private users: User[] = [
    {
      firstName: 'James',
      lastName: 'Bond',
      email: 'James.Bond@gmail.com',
      drinkPreference: 'Coca',
      hobbies: ['coding', 'fitness']
    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }
  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }

}
