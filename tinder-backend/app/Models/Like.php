<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = ['person_id','liker_id','type'];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }
}
