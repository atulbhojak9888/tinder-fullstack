<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'age'=>$this->age,
            'latitude'=>$this->latitude,
            'longitude'=>$this->longitude,
            'likes_count'=>$this->likes_count,
            'pictures'=>$this->pictures->map(fn($p)=>['id'=>$p->id,'url'=>$p->url,'order'=>$p->order])->values(),
            'created_at'=>$this->created_at,
        ];
    }
}
