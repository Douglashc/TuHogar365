<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Servicio;

class ServicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{
            $servicios = Servicio::with(['periodo', 'reserva'])->latest()->get();

            return response()->json([
                'status' => 'Success',
                'message' => 'Datos obtenidos con exito',
                'data' => $servicios,
                'total' => $servicios->count()
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
            $servicio = Servicio::create($request->all());

            return response()->json([
                'status' => 'Success',
                'message' => 'Servicio creado con exito',
                'data' => $servicio,
            ], 201);

        }catch(\Exception $e){
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al insertar los datos',
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
            $servicio = Servicio::find($id);

            if(!$servicio) {
                return response()->json([
                    'status' => 'Error',
                    'message' => 'No se pudo encontrar el dato solicitado',
                ], 404);
            }

            $servicio->load(['periodo','reserva']);

            return response()->json([
                'status' => 'Success',
                'message' => 'Dato encontrado con exito',
                'data' => $servicio,
            ], 200);

        }catch(\Exception $e){
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al obtener el dato',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try{
            $servicio = Servicio::find($id);

            if(!$servicio) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Servicio no encontrada'
                ], 404);
            }

            $servicio->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Datos del servicio actualizados con exito.',
                'data' => $servicio,
            ], 201);
        }catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al actualizar dato.',
                'error' => $e->getMessage()
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try{
            $servicio = Servicio::find($id);

            if(!$servicio) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No se pudo encontrar el dato solicitado'
                ], 404);
            }

            $servicio->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'El servicio fue eliminado con exito',
                'data' => $servicio
             ], 200);

        }catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
            ], 500);
        }
    }

    public function habilitar($id) {
        $item = Servicio::find($id);
        $text = 'habilitado.';
        if ($item->habilitado) {
            $item->habilitado = false;
            $text = 'deshabilitado.';
        } else {
            $item->habilitado = true;
        }
        $item->save();
        return response()->json(['success' => 'Operación realizada correctamente. '.$text], 200);
    }
}
