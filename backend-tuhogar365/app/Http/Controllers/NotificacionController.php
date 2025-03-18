<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

use App\Models\Notificacion;

class NotificacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{
            $usuarioId = Auth::user()->id;
            $notificaciones = Notificacion::where('user_id', $usuarioId)
            ->latest()
            ->get();

            return response()->json([
                'status' => 'Success',
                'message' => 'Notificaciones obtenidos con exito',
                'data' => $notificaciones,
                'total' => $notificaciones->count()
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
     * Update the specified resource in storage.
    */

    public function leerNotificacion($id) {
        try{
            $notificacion = Notificacion::find($id);

            if(!$notificacion) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Notificacion no encontrada'
                ], 404);
            }
 
            $cliente->read = true;

            return response()->json([
                'status' => 'success',
                'message' => 'Notificacion leida.',
                'data' => $notificacion,
            ], 201);
        }catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al actualizar dato.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
