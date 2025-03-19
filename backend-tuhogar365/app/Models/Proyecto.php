<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    use HasFactory;

    protected $fillable = ['nombre_proyecto', 'descripcion', 'equipo_id'];

    // Relación con Equipo (Un proyecto pertenece a un equipo)
    public function equipo() {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    // Relación con Tareas (Un proyecto puede tener muchas tareas)
    public function tareas() {
        return $this->hasMany(Tarea::class, 'proyecto_id');
    }
}
