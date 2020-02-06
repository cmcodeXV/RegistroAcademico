<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    public $timestamps = false;
    protected $table = 'estudiante';

    public function matricula(){
        return $this->hasMany('App\Matricula');
    }
}
