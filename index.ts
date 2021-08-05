import { of, concat, Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const stream: Array<Observable<Object>> = [
  of({ data: [{ version: '18.0.x' }], meta: { page: { pageSize: 10 } } }),
  of({ data: [{ version: '19.0.x' }], meta: { page: { pageSize: 10 } } }),
  of({ data: [{ version: '12.0.x' }], meta: { page: { pageSize: 10 } } })
];
let forkJoinData = {
  data: [{ version: '20.0.x' }],
  meta: { page: { pageSize: 10 } }
};
let oldData = 
  of({ data: [{ version: '20.0.x' }], meta: { page: { pageSize: 10 } }});
// it will emit each service succes

concat(...stream, oldData).subscribe(data => console.log(JSON.stringify(data)));

// // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
// .subscribe
// subscribetion happens  once all service responses are received
forkJoin(stream)
  .pipe(
    map(values => {
      console.log('----------------------forkjoin- emit');
      forkJoinData.data = [
        ...forkJoinData.data,
        ...values[0].data,
        ...values[1].data,
        ...values[2].data
      ];
      return forkJoinData.data;
    })
  )
  .subscribe(console.log);
