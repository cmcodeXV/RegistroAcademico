<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    public $timestamps = false;
    protected $table = 'docente';

    public function matricula(){
        return $this->hasMany('App\Matricula');
    }

}
