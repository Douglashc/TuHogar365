<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\User;
use App\Models\Estudiante;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    public function index(Request $request) {
        $data = Estudiante::with(['categoria'])->latest()->get();

        // Retornar los registros como respuesta
        return response()->json($data);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            // 'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['Algunos campos son requeridos.'], 409);
        }
        
        $valUserName = User::where('username',$request->username)->first();
        if ($valUserName) {
            return response()->json('El nombre de usuario ya esta en uso.', 409);
        }
        // $valid = Estudiante::where('nombre',$request->input('nombre'))->first();
        // if ($valid) {
        //     return response()->json('Nombre repetido', 409);
        // }
        $fullname = null;
        if ($request->nombres) {
            if ($request->apellidos) {
                $fullname = $request->nombres.' '.$request->apellidos;
            } else {
                $fullname = $request->nombres;
            }
        } else {
            if ($request->apellidos) {
                $fullname = $request->apellidos;
            }
        }
        
        $name = null;
        $dir_folder = 'images/estudiantes';
        if($request->hasFile('file')){
            if (!is_dir(public_path().'/'.$dir_folder)) {
                $crearDir = mkdir(public_path().'/'.$dir_folder, 0777, true);
            }
            $file = $request->file('file');
            //concatena la hora y el nombre del archivo
            $name = $file->getClientOriginalName();
            $file->move(public_path().'/'.$dir_folder, $name);
            $ruta = public_path().'/'.$dir_folder.'/'. $name;
        }
        // Recuperar todos los registros del modelo asociado con el controlador actual
        $model = new Estudiante;
        if ($name) {
            $model->foto = $dir_folder.'/'.$name;
        }
        $model->nombres = $request->input('nombres');
        $model->apellidos = $request->input('apellidos');
        $model->fecha_nacimiento = date('Y-m-d',strtotime($request->input('fecha_nacimiento')));
        $model->genero = $request->input('genero');
        $model->cinturon = $request->input('cinturon');
        $model->peso = $request->input('peso');
        $model->habilitado = true;
        $model->save();
        
        $newItem = new User;
        $newItem->nombres = $request->nombres;
        $newItem->apellidos = $request->apellidos;
        $newItem->nombre_completo = $fullname;
        // $newItem->ci = $request->ci;
        $newItem->celular = $request->celular;
        $newItem->username = $request->username;
        $newItem->password = bcrypt($request->password);
        $newItem->email = $request->email;
        $newItem->habilitado = true;
        $newItem->rol_id = 3;
        $newItem->estudiante_id = $model->id;
        $newItem->save();

        $data = [
            'element' => $model,
            'success' => 'Registrado'
        ];
        // Retornar respuesta
        return response()->json($data, 201);
    }
    
    public function update(Request $request, $id) {
        // $valid = Estudiante::where('nombre',$request->input('nombre'))
        // ->where('id','!=',$id)->first();
        // if ($valid) {
        //     return response()->json('Nombre repetido', 409);
        // }
        $name = null;
        $dir_folder = 'images/estudiantes';
        if($request->hasFile('file')){
            if (!is_dir(public_path().'/'.$dir_folder)) {
                $crearDir = mkdir(public_path().'/'.$dir_folder, 0777, true);
            }
            $file = $request->file('file');
            //concatena la hora y el nombre del archivo
            $name = $file->getClientOriginalName();
            $file->move(public_path().'/'.$dir_folder, $name);
            $ruta = public_path().'/'.$dir_folder.'/'. $name;
        }
        // Recuperar todos los registros del modelo asociado con el controlador actual
        $model = Estudiante::find($id);
        if (!$model) {
            return response()->json('Elemento no encontrado', 409);
        }
        if ($name) {
            $model->foto = $dir_folder.'/'.$name;
        }
        $model->nombres = $request->input('nombres');
        $model->apellidos = $request->input('apellidos');
        $model->fecha_nacimiento = date('Y-m-d',strtotime($request->input('fecha_nacimiento')));
        $model->genero = $request->input('genero');
        $model->cinturon = $request->input('cinturon');
        $model->peso = $request->input('peso');
        $model->save();

        $data = ['success' => 'Actualizado'];
        // Retornar respuesta
        return response()->json($data, 200);
    }
}
