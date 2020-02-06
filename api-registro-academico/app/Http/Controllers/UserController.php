<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;
use Carbon\Carbon;
class UserController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index', 'show','login','store','getImage']]);
    }
    public function store(Request $request)
    {
        //Recoger los datos del usuario por post
        $json = $request->input('json', null);

        $params = json_decode($json);//Objeto
        $params_array = json_decode($json, true); //Array
        
        if(!empty($params) && !empty($params_array))
        {
            //Limpiar datos
            $params_array = array_map('trim', $params_array);
        
            //Validar datos
            $validate = \Validator::make($params_array, [
                'nombre' => 'required|alpha',
                'apellido' => 'required|alpha',
                'email' => 'required|email|unique:users',
                'password' => 'required',
                'role' => 'required'
            ]);
            if($validate->fails())
            {
                //Validacion ha fallado
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El usuario no se ha creado',
                    'error' => $validate->errors()
                );
            }
            else{
                //Validacion pasada correctamente
                    //Cifrar la contraseña
                    $pwd = hash('sha256', $params->password);
                    
                    //Crear el ususario
                    $user = new User();
                    $user->nombre = $params_array['nombre'];
                    $user->apellido = $params_array['apellido'];
                    $user->role = $params_array['role'];
                    $user->email = $params_array['email'];
                    $user->password = $pwd;
                    $user->estadoRegistro= 1;
                    $user->fechaCreacion = Carbon::now();
                    $user->fechaModificacion = Carbon::now();  
                    //Guardar el usuario

                    $user->save();
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario se ha creado correctamente'
                );
            }
        }
        else{
            $data = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'Los datos enviados no son correctos'
            );
        }
    
        return response()->json($data, $data['code']);
    }
    
    public function login(Request $request){
        $jwtAuth = new \JwtAuth();
        //Recibir datos por POST
        $json = $request->input('json', null);

        $params = json_decode($json);

        $params_array = json_decode($json, true);
        //Validar esos datos
        $validate = \Validator::make($params_array, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validate->fails())
        {
            //Validacion ha fallado
            $signup = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'El usuario no se ha podido identificar',
                'error' => $validate->errors()
            );
        }
        else
        {
            //Cifrar la contraseña
            $pwd = hash('sha256', $params->password);
        
            //Devolver token o datos
            $signup = $jwtAuth->signup($params->email, $pwd);

            if(!empty($params->gettoken))
            {
                $signup = $jwtAuth->signup($params->email, $pwd, true);
            }
        }
        
          return response()->json($signup, 200);
    }

    public function update($id,Request $request){
        //Comprobar si el usuario esta identificado
        $token=$request->header('Authorization');
        $jwtAuth=new \JwtAuth();
        $checkToken=$jwtAuth->checkToken($token);

        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

 
        if($checkToken && !empty($params_array) && !empty($id)){
            
            //Sacar usuario identificado
            $user = $jwtAuth->checkToken($token, true);
            //Validar datos
            $validate = \Validator::make($params_array, [
                'nombre' => 'required|alpha',
                'apellido' => 'required|alpha',
                'email' => 'required|email|unique:users,'.$user->sub
            ]);
            //Quitar los campos que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['role']);
            unset($params_array['password']);
            unset($params_array['fechaCreacion']);
            //Actualizar usuario db
            $params_array += ['fechaModificacion'=> Carbon::now()];
            $user_update = User::where('id', $id)->update($params_array);
            if(!empty($user_update))
            {
                //Devolver array con resultado
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'user' => $user,
                    'changes' => $params_array
                );
            }
            else{
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'El registro que desea actualizar no existe'
                ];
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
    public function show($id)
    {
        $estado =1;
       $user = User::where('id', $id)
                   ->where('estadoRegistro', 1)
                   ->first();

       if(is_object($user))
       {
           $data = array(
               'code' => 200,
               'status' => 'success',
               'user' => $user 
           );
       }
       else{
        $data = array(
            'code' => 404,
            'status' => 'error',
            'message' => 'El Usuario no existe.' 
        );
       }

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
                    $user_update = User::where('id', $id)
                                      ->where('estadoRegistro','=',1)
                                      ->first();
                    //Validar si el registro a eliminar existe
                    if(!empty($user_update)){
                        $user_update->estadoRegistro = 0;
                        $user_update->save();
                        //Devolver array con resultado
                        $data = array(
                            'code' => 200,
                            'status' => 'success',
                            'messaje' => 'Usuario eliminado correctamente'
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
    public function index()
    {
        $user = User::all()->where('estadoRegistro', 1);

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'matricula' => $user
        ]);
    }

    public function upload(Request $request)
    {
        //Recoger datos de la peticion
        $image = $request->file('file0');

        //Validacion de imagen

        $validate = \Validator::make($request->all(), [
           'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        //Guardar imagen
        if(!$image || $validate->fails())
        {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Error al subir Imagen' 
            );
        }
        else{
            $imagen_name = time().$image->getClientOriginalName();
           \Storage::disk('users')->put($imagen_name, \File::get($image));

           $data = array(
            'code' => 200,
            'status' => 'success',
            'image' => $imagen_name
           );
        }
        
        return response()->json($data, $data['code']);
    }

    public function getImage($filename)
    {
        $isset = \Storage::disk('users')->exists($filename);
        if($isset)
        {
            $file = \Storage::disk('users')->get($filename);
            return new Response($file, 200);
        }
        else
        {
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'La Imagen no existe'
            );
            return response()->json($data, $data['code']);
        }
        
    }
}
