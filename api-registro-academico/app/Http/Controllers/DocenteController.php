<?php

namespace App\Http\Controllers;
use Illuminate\Htpp\Response;
use Carbon\Carbon;
use App\Docente;
use App\User;

use Illuminate\Http\Request;

class DocenteController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }
   
    public function index()
    {
        
        $docentes = Docente::all()->where('estadoRegistro', 1);

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'docente' => $docentes
        ]);
    }

    public function show($id)
    {
        $docente = Docente::where('id', $id)
                   ->where('estadoRegistro', 1)
                   ->first();

        if(is_object($docente))
        {
           $data = [
            'code' => 200,
            'status' => 'success',
            'docente' => $docente
           ];
        }
        else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El registro del docente no existe'
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
                'nombre' => 'required',
                'apellido' => 'required',
                'direccion' => 'required',
                'especialidad' => 'required'
            ]);
            //Guardar la Docente
            if($validate->fails())
            {
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado los datos del Docente'
                ];
            }
            else{
                $docente = new Docente();
                $docente->nombre = $params_array['nombre'];
                $docente->apellido = $params_array['apellido'];
                $docente->direccion = $params_array['direccion'];
                $docente->especialidad = $params_array['especialidad'];
                $docente->estadoRegistro = 1;
                $docente->fechaCreacion = Carbon::now();
                $docente->fechaModificacion = Carbon::now();
                $docente->save();
                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'docente' => $docente
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
                'nombre' => 'required',
                'apellido' => 'required',
                'direccion' => 'required',
                'especialidad' => 'required'
            ]);
            //Quitar lo que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['estadoRegistro']);
            unset($params_array['fechaCreacion']);
            //Actualizar el registro
            $params_array += ['fechaModificacion'=> Carbon::now()];
            $docente = Docente::where('id', $id)->update($params_array);

            if(!empty($docente))
            {
                //Devolver array con resultado
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'docente' => $params_array
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
                $docente_update = Docente::where('id', $id)
                                         ->where('estadoRegistro','=',1)
                                         ->first();
                //Validar si el registro a eliminar existe
                if(!empty($docente_update)){
                    $docente_update->estadoRegistro = 0;
                    $docente_update->save();
                    //Devolver array con resultado
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'messaje' => 'Docente eliminado correctamente'
                    );
                }
                else{
                    $data = array(
                        'code' => 400,
                        'status' => 'error',
                        'message' => 'El registro no existe' 
                     );
                }
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
               'message' => 'El Usuario no está Identificado' 
            );
        }
 
        return response()->json($data, $data['code']);
    }
}
