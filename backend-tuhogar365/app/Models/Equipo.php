<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;

    protected $fillable = ['nombre_equipo', 'descripcion', 'lider_id'];

    // Relación con Líder (Un equipo tiene un líder que es un usuario)
    public function lider() {
        return $this->belongsTo(User::class, 'lider_id');
    }

    // Relación con Usuarios (Muchos a Muchos)
    public function usuarios() {
        return $this->belongsToMany(User::class, 'usuario_equipo', 'equipo_id', 'usuario_id');
    }

    // Relación con Proyectos (Un equipo puede tener varios proyectos)
    public function proyectos() {
        return $this->hasMany(Proyecto::class, 'equipo_id')->with(['tareas']);
    }

    public function tareasRecientes()
    {
        return $this->hasManyThrough(Tarea::class, Proyecto::class, 'equipo_id', 'proyecto_id')
            ->orderBy('created_at', 'desc')
            ->limit(5);
    }

    public function totalTareasEquipo()
    {
        return $this->hasManyThrough(Tarea::class, Proyecto::class, 'equipo_id', 'proyecto_id');
    }

    public function tareasCompletadasEquipo()
    {
        return $this->hasManyThrough(Tarea::class, Proyecto::class, 'equipo_id', 'proyecto_id')
            ->where('estado', 'completado');
    }
}
