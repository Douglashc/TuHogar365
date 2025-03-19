import { Component, OnInit } from '@angular/core';
import { EquipoService } from '@core/service/equipos.service';
import { TokenStorageService } from '@core/authentication/token-storage.service';

@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrl: './tabla-equipos.component.scss'
})
export class TablaEquiposComponent implements OnInit {

  public equipos: any = [];

  constructor(
    public tokenStorage: TokenStorageService,
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

}
