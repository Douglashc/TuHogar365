<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\Models\Tarea;
use App\Models\Notificacion;
use App\Events\TaskAssigned;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index(Request $request)
    {
        try{
            $rolId = Auth::user()->rol_id;
            
            if($rolId == 1){
                $tareas = Tarea::with(['userRealiza','userAsigna'])->latest()->get();
            }else{
                $idUsuario = Auth::user()->id;
                $tareas = Tarea::with(['userRealiza','userAsigna'])
                ->where('user_id_realiza', $idUsuario)
                ->latest()
                ->get();
            }

            return response()->json([
                'status' => 'Success',
                'message' => 'Datos obtenidos con exito',
                'data' => $tareas,
                'usuario' => $rolId,
                'total' => $tareas->count()
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
            $tarea = Tarea::create([
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
                'user_id_realiza' => $request->user_id_realiza,
                'user_id_asigna' => Auth::user()->id,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_final' => $request->fecha_final
            ]);

            $tarea->load(['userRealiza', 'userAsigna']);

            // Crear notificación
            $notificacion = Notificacion::create([
                'mensaje' => $tarea->titulo,
                'user_id' => $request->user_id_realiza,
            ]);

            // Enviar notificación en tiempo real con Pusher
            event(new TaskAssigned($tarea, $notificacion));

            // Enviar evento SOLO al usuario asignado
            //broadcast(new TaskAssigned($tarea, $notificacion));

            return response()->json([
                'status' => 'Success',
                'message' => 'Tarea creado con exito',
                'data' => $tarea,
            ], 201);

        }catch(\Exception $e){
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al crear la tarea',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    /*public function show($id)
    {
        try{
            $cliente = Cliente::find($id);

            if(!$cliente) {
                return response()->json([
                    'status' => 'Error',
                    'message' => 'No se pudo encontrar el dato solicitado',
                ], 404);
            }

            $cliente->load(['reserva']);

            return response()->json([
                'status' => 'Success',
                'message' => 'Dato encontrado con exito',
                'data' => $cliente,
            ], 200);

        }catch(\Exception $e){
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al obtener el dato',
                'error' => $e->getMessage()
            ], 500);
        }
    }*/

    /**
     * Update the specified resource in storage.
     */
    /*public function update(Request $request, $id)
    {
        try{
            $cliente = Cliente::find($id);

            if(!$cliente) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cliente no encontrada'
                ], 404);
            }

            $cliente->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Datos del cliente actualizados con exito.',
                'data' => $cliente,
            ], 201);
        }catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al actualizar dato.',
                'error' => $e->getMessage()
            ], 500);
        }

    }*/

    /**
     * Remove the specified resource from storage.
     */
    /*public function destroy($id)
    {
        try{
            $cliente = Cliente::find($id);

            if(!$cliente) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No se pudo encontrar el dato solicitado'
                ], 404);
            }

            $cliente->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'El cliente fue eliminado con exito',
                'data' => $cliente
             ], 200);

        }catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
            ], 500);
        }
    }*/

    /*public function habilitar($id) {
        $item = Cliente::find($id);
        $text = 'habilitado.';
        if ($item->habilitado) {
            $item->habilitado = false;
            $text = 'deshabilitado.';
        } else {
            $item->habilitado = true;
        }
        $item->save();
        return response()->json(['success' => 'Operación realizada correctamente. '.$text], 200);
    }*/
}
