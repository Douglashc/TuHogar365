import { Component, OnInit } from '@angular/core';
import { EquipoService } from '@core/service/equipos.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '@core/authentication/token-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.component.html',
  styleUrl: './detalle-equipo.component.scss'
})
export class DetalleEquipoComponent implements OnInit {

  public equipoId: any;
  public equipo: any;
  public total_tareas: any
  public tareas_completadas: any;
  public miembros_equipo: any;
  public proyectos_equipo: any;
  public tareas_resientes: any;
  public url = environment.imgUrl;

  constructor(
    private equipoService: EquipoService,
    private activatedRoute: ActivatedRoute,
    public tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.equipoId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID del equipo:', this.equipoId);
    if (this.equipoId) {
      this.mostrarDetalleEquipo(this.equipoId);
    }
  }

  public mostrarDetalleEquipo(idEquipo: any) {
    this.equipoService.getById(idEquipo).subscribe(
      data => {
        console.log("EQUIPO: ", data);
        this.equipo = data?.data;
        this.total_tareas = data?.data?.total_tareas_equipo.length;
        this.tareas_completadas = data?.data?.tareas_completadas_equipo.length;
        this.miembros_equipo = data?.data?.usuarios;
        this.proyectos_equipo = data?.data?.proyectos;
        this.tareas_resientes = data?.data?.tareas_recientes;
      },
      error => {
        console.log(error);
      }
    )
  }

  // Método para asignar clases según el estado
  getStatusClass(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'pending';
      case 'en proceso':
        return 'in-progress';
      case 'completado':
        return 'completed';
      default:
        return '';
    }
  }

  goBack() {
    window.history.back();
  }
}
