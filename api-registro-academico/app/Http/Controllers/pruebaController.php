<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Matricula;
class pruebaController extends Controller
{
    public function testOrm(){
        $matricula = Matricula::all();
        foreach($matricula as  $m)
        {
            echo "<h1>".$m->descripcion."</h1";   
            echo "<h1>".$m->user->nombre."</h1";  
            echo "<h1>".$m->materia->nombre."</h1";   
            echo "<h1>".$m->docente->nombre."</h1"; 
            echo "<h1>".$m->estudiante->nombre."</h1";      
        }
        
        die();
    }

}
