import { Component, OnInit } from '@angular/core';
import { EquipoService } from '@core/service/equipos.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '@core/authentication/token-storage.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrl: './tabla-equipos.component.scss'
})
export class TablaEquiposComponent implements OnInit {

  public equipos: any = [];
  public url = environment.imgUrl;

  constructor(
    public tokenStorage: TokenStorageService,
    private router: Router,
    private equipoService: EquipoService
  ) {}

  ngOnInit(): void {
    this.listarEquipos();
  }

  public listarEquipos() {
    this.equipoService.getAll().subscribe(
      data => {
        console.log("EQUIPOS: ", data);
        this.equipos = data?.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  public verDetalle(id: any) {
    this.router.navigate(['dashboard/equipos/detalle-equipo', id]);
  }

}
