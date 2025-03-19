<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    use HasFactory;

    protected $fillable = ['nombre_archivo', 'ruta_archivo', 'fecha_subida', 'tarea_id'];

    // Relación con Tarea (Un archivo pertenece a una tarea)
    public function tarea() {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }
}
