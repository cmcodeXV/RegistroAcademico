<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    public $timestamps = false;
    protected $table = 'materia';

    public function matricula(){
        return $this->hasMany('App\Matricula');
    }
}
