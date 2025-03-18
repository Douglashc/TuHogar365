<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Cliente;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{
            $clientes = Cliente::with(['reserva'])->latest()->get();

            return response()->json([
                'status' => 'Success',
                'message' => 'Datos obtenidos con exito',
                'data' => $clientes,
                'total' => $clientes->count()
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
            $cliente = Cliente::create($request->all());

            return response()->json([
                'status' => 'Success',
                'message' => 'Cliente creado con exito',
                'data' => $cliente,
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
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
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

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
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
    }

    public function habilitar($id) {
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
    }
}
