<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $table = 'tareas';

    protected $fillable = [
        'titulo',
        'descripcion',
        'user_id_asigna',
        'user_id_realiza',
        'fecha_inicio',
        'fecha_final'
    ];
    
    public function userAsigna() {
        return $this->belongsTo(User::class, 'user_id_asigna');
    }

    public function userRealiza() {
        return $this->belongsTo(User::class, 'user_id_realiza');
    }
}
