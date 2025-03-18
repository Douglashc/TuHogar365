<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Periodo;

class PeriodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{
            $periodos = Periodo::all();

            return response()->json([
                'status' => 'Success',
                'message' => 'Datos obtenidos con exito',
                'data' => $periodos,
                'total' => $periodos->count()
            ], 200);

        }catch(\Exception $e) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Error al obtener los datos',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
