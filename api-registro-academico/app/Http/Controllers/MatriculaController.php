<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Htpp\Response;
use App\Matricula;
use App\User;
use Carbon\Carbon;
class MatriculaController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }
    public function index()
    {
        //Observacion
        $matriculas = Matricula::with('docente','estudiante','materia','user')
                               ->where('estadoRegistro', 1)
                               ->get();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'matricula' => $matriculas
        ]);
    }
    

    public function show($id)
    {
        $matricula = Matricula::where('id', $id)
                   ->where('estadoRegistro', 1)
                   ->with('docente','estudiante','materia','user')
                   ->first();
        if(is_object($matricula))
        {
           $data = [
            'code' => 200,
            'status' => 'success',
            'matricula' => $matricula
           ];
        }
        else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El registro de la Matricula no existe'
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
                'user_id' => 'required',
                'docente_id' => 'required',
                'estudiante_id' => 'required',
                'materia_id' => 'required',
                'descripcion' => 'required'
            ]);
            //Guardar la Docente
            if($validate->fails())
            {
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado los datos de la Matricula'
                ];
            }
            else{
                $matricula = new Matricula();
                $matricula->user_id = $params_array['user_id'];
                $matricula->docente_id = $params_array['docente_id'];
                $matricula->estudiante_id = $params_array['estudiante_id'];
                $matricula->materia_id = $params_array['materia_id'];
                $matricula->descripcion = $params_array['descripcion'];
                $matricula->estadoRegistro = 1;
                $matricula->fechaCreacion = Carbon::now();
                $matricula->fechaModificacion = Carbon::now();
                $matricula->save();
                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'matricula' => $matricula
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
            $matricula = Matricula::where('id', $id)->update($params_array);

            //Devolver array con resultado
            $data = array(
                'code' => 200,
                'status' => 'success',
                'matricula' => $params_array
             );
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
                    //Actualizar matricula db
                    $matricula_update = Matricula::where('id', $id)
                                                 ->where('estadoRegistro','=',1)
                                                 ->first();
                    //Validar si el registro a eliminar existe
                    if(!empty($matricula_update)){
                        $matricula_update->estadoRegistro = 0;
                        $matricula_update->save();
                        //Devolver array con resultado
                        $data = array(
                            'code' => 200,
                            'status' => 'success',
                            'messaje' => 'Matricula eliminada correctamente'
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
               'message' => 'El usuario no está Identificado' 
            );
        }
 
        return response()->json($data, $data['code']);
    }
}
