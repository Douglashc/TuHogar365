<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\Models\Equipo;
//use App\Models\Notificacion;
//use App\Events\TaskAssigned;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index(Request $request)
    {
        try{
            $rolId = Auth::user()->rol_id;
            $idUsuario = Auth::user()->id;
            
            if($rolId == 1){
                $equipos = Equipo::with(['lider','usuarios','proyectos'])->latest()->get();
            }

            if($rolId == 2) {
                $equipos = Equipo::with(['lider','usuarios','proyectos'])
                ->where('lider_id', $idUsuario)
                ->latest()
                ->get();
            }

            if($rolId == 3) {
                // Empleado: Solo puede ver los equipos donde pertenece
                $equipos = Equipo::with(['lider', 'usuarios', 'proyectos'])
                    ->whereHas('usuarios', function ($query) use ($idUsuario) {
                        $query->where('usuario_id', $idUsuario);
                    })
                    ->latest()
                    ->get();
            }

            return response()->json([
                'status' => 'Success',
                'message' => 'Datos obtenidos con exito',
                'data' => $equipos,
                'usuario' => $rolId,
                'total' => $equipos->count()
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
            $equipo = Equipo::create([
                'nombre_equipo' => $request->nombre_equipo,
                'descripcion' => $request->descripcion, 
                'lider_id' => $request->lider_id
            ]);

            $equipo->load(['lider', 'usuarios', 'proyectos']);

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
                'message' => 'Equipo creado con exito',
                'data' => $equipo,
            ], 201);

        }catch(\Exception $e){
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al crear el equipo',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try{
            $rolId = Auth::user()->rol_id;

            $equipo = Equipo::with(['lider','usuarios','proyectos','tareasRecientes'])
                ->where('id', $id)
                ->first();

            return response()->json([
                'status' => 'Success',
                'message' => 'Dato obtenido con exito',
                'data' => $equipo,
                'usuario' => $rolId
            ], 200);

        }catch(\Exception $e) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al obtener los dato',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
