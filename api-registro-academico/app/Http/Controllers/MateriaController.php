<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Htpp\Response;
use App\Materia;
use App\User;
use Carbon\Carbon;
class MateriaController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }
    public function index()
    {
        $materias = Materia::all()->where('estadoRegistro', 1);

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'materias' => $materias
        ]);
    }

    public function show($id)
    {
        $materia = Materia::where('id', $id)
                   ->where('estadoRegistro', 1)
                   ->first();

        if(is_object($materia))
        {
           $data = [
            'code' => 200,
            'status' => 'success',
            'materia' => $materia
           ];
        }
        else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El registro de la materia no existe'
               ];
        }

        return response()->json($data, $data['code']);
    }
    public function store(Request $request)
    {
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array))
        {
            //Validar los datos
            $validate = \Validator::make($params_array, [
                'nombre' => 'required'
            ]);
            //Guardar la Docente
            if($validate->fails())
            {
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado los datos de la Materia'
                ];
            }
            else{
                $materia = new Materia();
                $materia->nombre = $params_array['nombre'];
                $materia->estadoRegistro = 1;
                $materia->fechaCreacion = Carbon::now();
                $materia->fechaModificacion = Carbon::now();
                $materia->save();
                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'docente' => $materia
                ];
            }
        }
        else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningun registro'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }
    public function update($id, Request $request)
    {
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        if(!empty($params_array))
        {
            //Validar los datos
            $validate = \Validator::make($params_array, [
                'nombre' => 'required'
            ]);
            //Quitar lo que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['estadoRegistro']);
            unset($params_array['fechaCreacion']);
            //Actualizar el registro
            $params_array += ['fechaModificacion'=> Carbon::now()];
            $materia = Materia::where('id', $id)->update($params_array);
            if(!empty($materia))
            {
                //Devolver array con resultado
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'materia' => $params_array
                ); 
            }
            else{
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'El registro que desea actualizar no existe'
                ];
            }
        }
        else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningun datos'
            ];
        }
        //Devolver el resultado
        return response()->json($data, $data['code']);
    }
    public function destroy($id,Request $request){
        //Comprobar si el usuario esta identificado
        $token=$request->header('Authorization');
        $jwtAuth=new \JwtAuth();
        $checkToken=$jwtAuth->checkToken($token);
 
        if($checkToken){
            
            //Sacar usuario identificado
            $user = $jwtAuth->checkToken($token, true);
             //Verificar si el usuario tiene role de Admin
            $userIden = User::where('id', $user->sub)
                            ->where('role','=','ROLE_ADMIN')->first();
            if($userIden){
                    //Actualizar usuario db
                    $materia_update = Materia::where('id', $id)
                                             ->where('estadoRegistro','=',1)
                                             ->first();
                    $materia_update->estadoRegistro = 0;
                    $materia_update->save();
                    //Devolver array con resultado
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'messaje' => 'Materia eliminada correctamente'
                     );
            }
            else
            {
                $data = array(
                    'code' => 400,
                   'status' => 'error',
                 'message' => 'El usuario no tiene permisos para Eliminar' 
                );
                
            }
        }else{
            $data = array(
               'code' => 400,
               'status' => 'error',
               'message' => 'El usuario no está Identificado' 
            );
        }
 
        return response()->json($data, $data['code']);
    }
}
