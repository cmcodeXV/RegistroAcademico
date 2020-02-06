<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    public $timestamps = false;
    protected $table = 'matricula';

    protected $fillable = [
        'user_id', 'materia_id', 'docente_id','estudiante_id','descripcion'
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
    public function docente()
    {
        return $this->belongsTo('App\Docente', 'docente_id');
    }
    public function estudiante()
    {
        return $this->belongsTo('App\Estudiante', 'estudiante_id');
    }
    public function materia()
    {
        return $this->belongsTo('App\Materia', 'materia_id');
    }
}
