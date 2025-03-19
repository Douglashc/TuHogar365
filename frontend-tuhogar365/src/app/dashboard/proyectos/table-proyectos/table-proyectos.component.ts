import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '@core/service/proyecto.service';
import { TokenStorageService } from '@core/authentication/token-storage.service';

@Component({
  selector: 'app-table-proyectos',
  templateUrl: './table-proyectos.component.html',
  styleUrl: './table-proyectos.component.scss'
})
export class TableProyectosComponent implements OnInit {

  public proyectos: any = [];

  constructor(
    public tokenStorage: TokenStorageService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.listarProyectos();
  }

  public listarProyectos() {
    this.proyectoService.getAll().subscribe(
      data => {
        console.log("PROYECTOS: ", data);
        this.proyectos = data?.data;
      },
      error => {
        console.log(error);
      }
    )
  }
}
