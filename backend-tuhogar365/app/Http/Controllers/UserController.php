<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index(Request $request) {
        
        $term = $request->input('term');
        $rol = $request->input('rol');

        $query = User::sterm($term,'')
        ->srol($rol,'')
        ->with(['rol'])
        ->latest()
        ->get();
        return response()->json($query, 200);
    }

    public function show($id) {
        $data = User::with('rol')->find($id);
        return response()->json($data, 200);
    }
    
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users,username',
            'password' => 'required',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048' // Validación para la imagen
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => 'Algunos campos son requeridos o incorrectos.', 'errors' => $validator->errors()], 409);
        }
    
        $fullname = trim(($request->nombres ?? '') . ' ' . ($request->apellidos ?? ''));
    
        try {
            DB::beginTransaction();
            $newItem = new User;
            $newItem->nombres = $request->nombres;
            $newItem->apellidos = $request->apellidos;
            $newItem->nombre_completo = $fullname;
            $newItem->ci = $request->ci;
            $newItem->celular = $request->celular;
            $newItem->username = $request->username;
            $newItem->password = bcrypt($request->password);
            $newItem->email = $request->email;
            $newItem->habilitado = true;
            $newItem->rol_id = $request->rol_id;
    
            // Ruta de almacenamiento personalizada
            $userFolder = 'usuarios';
            $storagePath = "public/$userFolder";
    
            // Asegurar que la carpeta existe
            if (!Storage::exists($storagePath)) {
                Storage::makeDirectory($storagePath);
            }
    
            // Guardar la foto si se sube
            if ($request->hasFile('foto')) {
                $file = $request->file('foto');
                $fileName = time() . '_' . $file->getClientOriginalName(); // Evitar nombres duplicados
                $path = $file->storeAs($userFolder, $fileName, 'public'); // Guarda en storage/app/public/usuarios
                $newItem->foto = $path;
            }
    
            $newItem->save();
    
            DB::commit();
            return response()->json(['success' => 'Usuario creado exitosamente.'], 201);
        } catch (\Exception $th) {
            DB::rollback();
            return response()->json(['error' => 'Error al crear el usuario', 'message' => $th->getMessage()], 409);
        }
    }
    
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users,username,' . $id,
            'password' => 'nullable',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048' // Validación para la imagen
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => 'Algunos campos son requeridos o incorrectos.', 'errors' => $validator->errors()], 409);
        }
    
        // Verificar que el usuario existe
        $editItem = User::find($id);
        if (!$editItem) {
            return response()->json('No se encuentra el usuario en el sistema, COD-ID: ' . $id, 409);
        }
    
        // Verificar que el username no esté en uso por otro usuario
        $valUserName = User::where('username', $request->username)->where('id', '!=', $id)->first();
        if ($valUserName) {
            return response()->json('El nombre de usuario ya está en uso.', 409);
        }
    
        // Generar el nombre completo
        $fullname = trim(($request->nombres ?? '') . ' ' . ($request->apellidos ?? ''));
    
        try {
            DB::beginTransaction();
    
            // Actualizar datos del usuario
            $editItem->nombres = $request->nombres;
            $editItem->apellidos = $request->apellidos;
            $editItem->nombre_completo = $fullname;
            $editItem->ci = $request->ci;
            $editItem->celular = $request->celular;
            $editItem->username = $request->username;
            $editItem->email = $request->email;
    
            if ($request->password) {
                $editItem->password = bcrypt($request->password);
            }
    
            $editItem->rol_id = $request->rol_id;
    
            // Manejo de la foto de usuario
            if ($request->hasFile('foto')) {
                $userFolder = 'usuarios';
                $storagePath = "public/$userFolder";
    
                // Asegurar que la carpeta existe
                if (!Storage::exists($storagePath)) {
                    Storage::makeDirectory($storagePath);
                }
    
                // Eliminar la foto anterior si existe
                if ($editItem->foto && Storage::exists("public/" . $editItem->foto)) {
                    Storage::delete("public/" . $editItem->foto);
                }
    
                // Guardar la nueva foto
                $file = $request->file('foto');
                $fileName = time() . '_' . $file->getClientOriginalName(); // Evitar nombres duplicados
                $path = $file->storeAs($userFolder, $fileName, 'public');
                $editItem->foto = $path;
            }
    
            $editItem->save();
    
            DB::commit();
            return response()->json(['success' => 'Operación realizada exitosamente.'], 200);
        } catch (\Exception $th) {
            DB::rollback();
            return response()->json(['error' => 'Error al actualizar el usuario', 'message' => $th->getMessage()], 409);
        }
    }

    public function destroy($id) {
        $item = User::find($id);
        if(!$item) {
            return response()->json($item, 409);
        }
        // $valid = Ingreso::where('user_id',$id)->first();
        // if ($valid) {
        //     return response()->json('No puede ser eliminado.', 409);
        // }
        $item->delete();

        return response()->json($item, 200);
    }
    
    public function habilitar($id) {
        $item = User::find($id);
        $text = 'habilitado.';
        if ($item->habilitado) {
            $item->habilitado = false;
            $text = 'deshabilitado.';
        } else {
            $item->habilitado = true;
        }
        $item->save();
        return response()->json(['success' => 'Operación realizada correctamente. '.$text], 200);
    }

    public function roles() {
        return response()->json(Role::get(), 200);
    }
}
