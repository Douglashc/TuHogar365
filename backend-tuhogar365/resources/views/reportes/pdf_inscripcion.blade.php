@extends('cr_blank')

@section('content')
<div class="text-center title">{{ $title }}</div>
<div class="text-center title">{{ $data->torneo->nombre }}</div>
<div>Categoria: {{ $categoria->nombre }}</div>
<div>Genero: {{ $categoria->genero=='M'?'MASCULINO':'FEMENINO' }}</div>
<div>Cantidad inscritos: {{ count($data->inscripciones) }}</div>
<div>Peso mínimo: {{ $categoria->rango_min }}</div>
<div>Peso máximo: {{ $categoria->rango_max }}</div>

<table class="table-data bordes">
  <tr>
    <th>N.</th>
    <th>Fecha</th>
    <th>Nombre Completo</th>
    <th>Edad</th>
    <th>Peso</th>
    <th>Estado</th>
  </tr>
  @foreach ($data->inscripciones as $item)
    <tr>
      <td class="text-center">{{ ++$i }}</td>
      <td class="text-center">{{ date('d-m-Y', strtotime($item->fecha)) }}</td>
      <td>{{ $item->estudiante->nombres }} {{ $item->estudiante->apellidos }}</td>
      <td class="text-center">{{ $item->estudiante->edad }}</td>
      <td class="text-center">{{ $item->peso }}</td>
      <td class="text-center">{{ $item->estado }}</td>
    </tr>  
  @endforeach
</table>
    
@endsection

@section('scripts')
  <style>
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .table-data {
      width: 100%;
    }
  </style>
    
@endsection
