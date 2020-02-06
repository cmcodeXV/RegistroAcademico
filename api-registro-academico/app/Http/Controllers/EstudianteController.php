<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Htpp\Response;
use App\Estudiante;
use App\User;
use Carbon\Carbon;
class EstudianteController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }
    public function index()
    {
        $estudiantes = Estudiante::all()
                    ->where('estadoRegistro', 1);

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'estudiantes' => $estudiantes
        ]);
    }

    public function show($id)
    {
        $estudiante = Estudiante::where('id', $id)
                   ->where('estadoRegistro', 1)
                   ->first();

        if(is_object($estudiante))
        {
           $data = [
            'code' => 200,
            'status' => 'success',
            'estudiante' => $estudiante
           ];
        }
        else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El registro del estudiante no existe'
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
                'edad' => 'required'
            ]);
            //Guardar la Docente
            if($validate->fails())
            {
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado los datos del Estudiante'
                ];
            }
            else{
                $estudiante = new Estudiante();
                $estudiante->nombre = $params_array['nombre'];
                $estudiante->apellido = $params_array['apellido'];
                $estudiante->direccion = $params_array['direccion'];
                $estudiante->edad = $params_array['edad'];
                $estudiante->estadoRegistro = 1;
                $estudiante->fechaCreacion = Carbon::now();
                $estudiante->fechaModificacion = Carbon::now();
                $estudiante->save();
                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'estudiante' => $estudiante
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
                'edad' => 'required'
            ]);
            //Quitar lo que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['estadoRegistro']);
            unset($params_array['fechaCreacion']);
            //Actualizar el registro
            $params_array += ['fechaModificacion'=> Carbon::now()];
            $estudiante = Estudiante::where('id', $id)->update($params_array);
            if(!empty($estudiante))
            {
                //Devolver array con resultado
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'estudiante' => $params_array
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
                    //Actualizar estudiante db
                    $estudiante_update = Estudiante::where('id', $id)
                                                   ->where('estadoRegistro','=',1)
                                                   ->first();
                    //Validar si el registro a eliminar existe
                    if(!empty($estudiante_update)){
                        $estudiante_update->estadoRegistro = 0;
                        $estudiante_update->save();
                        //Devolver array con resultado
                        $data = array(
                            'code' => 200,
                            'status' => 'success',
                            'messaje' => 'Estudiante eliminado correctamente'
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
