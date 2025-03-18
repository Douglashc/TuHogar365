<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Reserva;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{
            $reservas = Reserva::with(['servicio','cliente'])->latest()->get();

            return response()->json([
                'status' => 'Success',
                'message' => 'Datos obtenidos con exito',
                'data' => $reservas,
                'total' => $reservas->count()
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
            $reserva = Reserva::create($request->all());

            return response()->json([
                'status' => 'Success',
                'message' => 'Reserva creado con exito',
                'data' => $reserva,
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
            $reserva = Reserva::find($id);

            if(!$reserva) {
                return response()->json([
                    'status' => 'Error',
                    'message' => 'No se pudo encontrar el dato solicitado',
                ], 404);
            }

            $reserva->load(['servicio','cliente']);

            return response()->json([
                'status' => 'Success',
                'message' => 'Dato encontrado con exito',
                'data' => $reserva,
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
            $reserva = Reserva::find($id);

            if(!$reserva) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reserva no encontrada'
                ], 404);
            }

            $reserva->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Datos de la reserva actualizados con exito.',
                'data' => $reserva,
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
            $reserva = Reserva::find($id);

            if(!$reserva) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No se pudo encontrar el dato solicitado'
                ], 404);
            }

            $reserva->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'La reserva fue eliminado con exito',
                'data' => $reserva
             ], 200);

        }catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
            ], 500);
        }
    }

    public function habilitar($id) {
        $item = Reserva::find($id);
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
