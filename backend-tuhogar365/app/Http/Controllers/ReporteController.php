<?php

namespace App\Http\Controllers;

use PDF;
use Illuminate\Http\Request;

class ReporteController extends Controller
{
    // public function inscripcionesPdf($id) {
    //     $data = CategoriaTorneo::with(['torneo','categoria','inscripciones'])->find($id);
    //     $datos = [
    //         'i' => 0,
    //         'title' => 'Incripciones',
    //         'data' => $data,
    //         'categoria' => $data->categoria,
    //     ];

    //     $pdf = PDF::loadView('reportes.pdf_inscripcion', $datos);
    //     return $pdf->stream('reporte.pdf');
    // }
}
