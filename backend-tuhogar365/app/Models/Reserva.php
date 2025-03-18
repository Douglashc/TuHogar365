<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $table = 'reservas';

    protected $fillable = [
        'cliente_id',
        'servicio_id',
        'fecha_reserva',
        'fecha_hora_inicio',
        'fecha_hora_fin'
    ];

    public function servicio() {
        return $this->belongsTo(Servicio::class, 'servicio_id');
    }
    
    public function cliente() {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }
}
