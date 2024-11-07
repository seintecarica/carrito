import { Component, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';

  counter = signal(0);
  counterRef: number | undefined;

  constructor(){ //solo para inicializar variables, ocurre antes de renderizar el componente o "before render"
    //No debe ser asincrona, es decir no se puede implementar promesas ni await
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges){ //Se ejecuta antes del render y durante "before and during render"
    //Cada vez que ocurra un cambio en duration o message va a detectarlos, se corre antes de que sea renderizado y durante.
    //Corre antes del ngOnInit()
    //Se pueden ejecutar cosas ASYNCRONAS
    console.log('ngOnChanges');
    console.log(changes);
    console.log('-'.repeat(10));

    const duration = changes['duration'];
    if(duration && duration.currentValue != duration.previousValue){
      this.hacerAlgo();
    }
  }

  ngOnInit(){ //Inicializador del cmponente, después del render, SOLO CORRE UNA VEZ
    //Se pueden llamar promesas, suscripci´n, async, puedo traer una lista de algo a través de una api.
    console.log('nhOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval'); //esto seguirá corriendo en el eventloop, pese a que matamos el componente
      this.counter.update(statePrev => statePrev + 1);
    }, 1000)
  }

  ngAfterViewInit(){ //Después del render
    //PRegunta si lo shijos de este componente ya fueron rendereados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy(){ //Sirve para prevenir fugas de memoria
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  hacerAlgo(){ //Voy a hacer algo si duration cambia
    //En funciones personalizadas puede también ejecutar cosas asyncronas
    console.log('change duration');
  }
}
