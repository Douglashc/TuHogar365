<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $table = 'tareas';

    protected $fillable = [
        'titulo', 'descripcion', 'fecha_inicio', 'fecha_final', 
        'estado', 'proyecto_id', 'user_id_asigna', 'user_id_realiza'
    ];

    // Relación con Proyecto (Una tarea pertenece a un proyecto)
    public function proyecto() {
        return $this->belongsTo(Proyecto::class, 'proyecto_id');
    }
    
    // Relación con Usuario que asigna la tarea
    public function userAsigna() {
        return $this->belongsTo(User::class, 'user_id_asigna');
    }

    // Relación con Usuario que realiza la tarea
    public function userRealiza() {
        return $this->belongsTo(User::class, 'user_id_realiza');
    }

    // Relación con Archivos (Una tarea puede tener varios archivos adjuntos)
    public function archivos() {
        return $this->hasMany(Archivo::class, 'tarea_id');
    }
}
