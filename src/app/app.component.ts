import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'app works!';
  p1 = 1;
  collection1: any[] = ['aaa', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb', 'bbbb'];

  @Input('data') meals: string[] = [
    'meal 1', 'meal 2', 'meal 3', 'meal 4', 'meal 5',
    'meal 6', 'meal 7', 'meal 8', 'meal 9', 'meal 10',
    'meal 11', 'meal 12', 'meal 13', 'meal 14', 'meal 15',
    'meal 16', 'meal 17', 'meal 18', 'meal 19', 'meal 20',
    'meal 21', 'meal 22', 'meal 23', 'meal 24', 'meal 25',
    'meal 26', 'meal 27', 'meal 28', 'meal 29', 'meal 30',
    'meal 31', 'meal 32', 'meal 33', 'meal 34', 'meal 35',
    'meal 36', 'meal 37', 'meal 38', 'meal 39', 'meal 40'];
  asyncMeals: Observable<string[]>;
  p = 1;
  total = 1;
  loading: boolean;
  perPage = 7;
  loadFinish = false;

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncMeals = serverCall(this.meals, page, this.perPage)
      .do(res => {
        // this.total = res.total;
        if (this.loadFinish === false) {
          this.total += res.total;
        }
        if (res.next === false) {
          this.loadFinish = true;
        }
        console.log(this.total);
        // if (res.next === false) {
        //   this.total += res.total;
        //   console.log(res.total);
        // }


        this.p = page;
        this.loading = false;
      })
      .map(res => res.items);
  }

}


interface IServerResponse {
  items: string[];
  total: number;
  next: boolean;
}
/**
 * Simulate an async HTTP call with a delayed observable.
 */
function serverCall(meals: string[], page: number, perPage: number): Observable<IServerResponse> {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  let isNext = true;
  const array1 = meals.slice(start, end);
  if (array1.length < perPage) {
    isNext = false;
  }

  return Observable.of({
      items: array1,
      total: array1.length,
      next: isNext
    }).delay(1000);
}
