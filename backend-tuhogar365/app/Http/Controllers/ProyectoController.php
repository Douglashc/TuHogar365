<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\Models\Proyecto;
//use App\Models\Notificacion;
//use App\Events\TaskAssigned;

class ProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index(Request $request)
    {
        try{
            $rolId = Auth::user()->rol_id;
            $idUsuario = Auth::user()->id;
            
            if ($rolId == 1) {
                // Admin: Puede ver todos los proyectos
                $proyectos = Proyecto::with(['equipo', 'tareas'])->latest()->get();
            } 
            
            if ($rolId == 2) {
                // Líder: Solo ve los proyectos de los equipos donde es líder
                $proyectos = Proyecto::with(['equipo', 'tareas'])
                    ->whereHas('equipo', function ($query) use ($idUsuario) {
                        $query->where('lider_id', $idUsuario);
                    })
                    ->latest()
                    ->get();
            } 
            
            if ($rolId == 3) {
                // Empleado: Solo ve los proyectos de los equipos donde pertenece
                $proyectos = Proyecto::with(['equipo', 'tareas'])
                    ->whereHas('equipo.usuarios', function ($query) use ($idUsuario) {
                        $query->where('usuario_id', $idUsuario); // Corregido
                    })
                    ->latest()
                    ->get();
            }

            return response()->json([
                'status' => 'Success',
                'message' => 'Datos obtenidos con exito',
                'data' => $proyectos,
                'usuario' => $rolId,
                'total' => $proyectos->count()
            ], 200);

        }catch(\Exception $e) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al obtener los datos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $proyecto = Equipo::create([
                'nombre_proyecto' => $request->nombre_proyecto,
                'descripcion' => $request->descripcion, 
                'equipo_id' => $request->equipo_id
            ]);

            $proyecto->load(['equipo', 'proyectos']);

            // Crear notificación
            /*$notificacion = Notificacion::create([
                'mensaje' => $equipo->titulo,
                'user_id' => $request->user_id_realiza,
            ]);*/

            // Enviar notificación en tiempo real con Pusher
            //event(new TaskAssigned($tarea, $notificacion));

            // Enviar evento SOLO al usuario asignado
            //broadcast(new TaskAssigned($tarea, $notificacion));

            return response()->json([
                'status' => 'Success',
                'message' => 'Proyecto creado con exito',
                'data' => $proyecto,
            ], 201);

        }catch(\Exception $e){
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al crear el proyecto',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
