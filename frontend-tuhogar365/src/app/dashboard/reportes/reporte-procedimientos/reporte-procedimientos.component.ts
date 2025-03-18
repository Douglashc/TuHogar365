import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-tabla-procedimientos',
  templateUrl: './reporte-procedimientos.component.html',
  styleUrl: './reporte-procedimientos.component.scss'
})
export class ReporteProcedimientosComponent implements OnInit {

  ngOnInit(): void {
    
  }
  /*public nombreColumnas: string[] = [
    'Nº',
    'Diagnostico Consulta',
    'Propietario',
    'Nombre Mascota',
    'Tipo Mascota',
    'Procedimiento',
    'Descripcion',
    'Costo',
    'Fecha Procedimiento',
    'Resultado',
    'Atendio',
  ];

  public url = environment.imgUrl;
  public procedimientos: any;

  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private procedimientosService: ProcedimientosService,
    private dialog: MatDialog

  ) {

  }
  ngOnInit(): void {
    this.listaProcedimientos();
  }


  listaProcedimientos() {
    this.procedimientosService.getAll().subscribe(data => {
      console.log("Datos procedimientos: ", data);
      this.procedimientos = data?.data;
      this.paginado = new MatTableDataSource<any>(this.procedimientos);
      this.paginado.paginator = this.paginator;
    })
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }*/

}
