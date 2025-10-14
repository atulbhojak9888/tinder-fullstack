<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Person extends Model
{
    protected $fillable = ['name','age','latitude','longitude','likes_count','notified_at'];

    public function pictures(): HasMany
    {
        return $this->hasMany(Picture::class)->orderBy('order');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }
}
