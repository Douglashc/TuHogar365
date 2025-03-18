<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    use HasFactory;

    protected $table = 'periodos';

    protected $fillable = [
        'fecha_inicio',
        'fecha_final',
        'descripcion',
    ];

    public function servicio() {
        return $this->hasOne(Servicio::class);
    }
}
