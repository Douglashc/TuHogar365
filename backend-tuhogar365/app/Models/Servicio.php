<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $table = 'servicios';

    protected $fillable = [
        'nombre',
        'responsable',
        'habilitado',
        'titulo',
        'universidad_id',
        'periodo_id',
    ];

    public function scopeHabilitado($query) {
        return $query->where('habilitado', true);
    }

    public function reserva() {
        return $this->hasOne(Reserva::class);
    }

    public function periodo() {
        return $this->belongsTo(Periodo::class, 'periodo_id');
    }
}
