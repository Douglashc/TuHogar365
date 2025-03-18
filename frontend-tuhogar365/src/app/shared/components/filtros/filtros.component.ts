import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '@core';
import { UserService } from '@core/service/user.service';
import { HasRolesDirective } from 'app/layout/has-roles.directive';
import { WebMaterialModule } from 'app/webmaterial.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Subject, debounceTime, delay, filter, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    WebMaterialModule,
    HasRolesDirective,
    NgxMatSelectSearchModule,
  ],
  providers:[
    DatePipe
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {

  form: FormGroup;
  @Input() tipo: any
  @Output()dataLista:EventEmitter<any> = new EventEmitter<any>();
  sucursales: any;
  usuarios: any;
  clientes: any;
  public searching: boolean = false;
  public searching1: boolean = false;
  textInput: FormControl = new FormControl();
  textInput1: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  ingresos: any;
  vendedores: any;

  
  constructor(
    private fb: FormBuilder,
    private usuariosService:UserService,
    private datePipe: DatePipe,
    private clienteService: ClientesService,

  ) {
    this.createForm();
    this.listaSucursal();
    this.listaUsuarios();
    this.listaClientes();
    this.listaIngreso();
    this.listaVendedores();
    this.textInput.valueChanges.
    pipe(
      filter(search => !!search),
      tap(() => this.searching = true),
      takeUntil(this._onDestroy),
      debounceTime(200),
      map(search => {
        this.listaClientes(search)
      }),
      delay(500)
    )
    .subscribe(data=>{
      this.searching = false;
    })

    this.textInput1.valueChanges.
    pipe(
      filter(search => !!search),
      tap(() => this.searching1 = true),
      takeUntil(this._onDestroy),
      debounceTime(200),
      map(search => {
        this.listaUsuarios(search)
      }),
      delay(500)
    )
    .subscribe(data=>{
      this.searching1 = false;
    })

    this.form.valueChanges.subscribe(data=>{
      this.lista(data);
    })
  }

  listaClientes(term?:any) {
    this.clienteService.getEnabledList({
      'term': term
    }).subscribe(data=>{
      this.clientes = data;
    })
  }

  listaSucursal() {
    /*this.sucursalService.getEnabledList().subscribe(data=>{
      this.sucursales = data;
    })*/
  }
  

  listaIngreso() {
    /*this.ingresoService.getEnabledList().subscribe(data=>{
      this.ingresos = data;
    })*/
  }
  
  listaUsuarios(term?:any) {
    this.usuariosService.getAll({
      'term': term
    }).subscribe((data: any) => {
      this.usuarios = data;
    })
  }

  listaVendedores() {
    this.usuariosService.vendedores().subscribe((data: any) => {
      this.vendedores = data;
    })
  }
  createForm() {
    this.form = this.fb.group({
      sucursal_id:[0],
      cliente_id:[''],
      user_id:[''],
      vendedor_id:[''],
      estado:[''],
      orden:[''],
      fecha_inicio:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      fecha_fin:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')]
    })
  }

  lista(data:any){
    this.dataLista.emit(data)
  }

  

}
