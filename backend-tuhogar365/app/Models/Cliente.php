<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';

    protected $fillable = [
        'nombre',
        'apellido',
        'telefono',
        'tipo',
        'fecha_nacimiento',
        'habilitado',
        'direccion',
        'fecha_registro',
        'tipo_membresia'
    ];

    public function reserva() {
        return $this->hasOne(Reserva::class);
    }
}
