<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikeController extends Controller
{
    // Protected by sanctum middleware in routes
    public function like(Person $person, Request $request)
    {
        $likerId = $request->user()?->id ?? $request->input('liker_id');
        return $this->storeLike($person, 'like', $likerId);
    }

    public function dislike(Person $person, Request $request)
    {
        $likerId = $request->user()?->id ?? $request->input('liker_id');
        return $this->storeLike($person, 'dislike', $likerId);
    }

    protected function storeLike(Person $person, string $type, $likerId = null)
    {
        return DB::transaction(function () use ($person, $type, $likerId) {
            $exists = Like::where('person_id',$person->id)->where('liker_id',$likerId)->where('type',$type)->exists();
            if (!$exists) {
                Like::create(['person_id'=>$person->id,'liker_id'=>$likerId,'type'=>$type]);
                if ($type === 'like') {
                    $person->increment('likes_count');
                }
            }
            return response()->json(['success'=>true,'likes_count'=>$person->fresh()->likes_count]);
        });
    }

    public function likedPeople(Request $request)
    {
        $likerId = $request->user()?->id ?? $request->get('liker_id');
        $perPage = (int)$request->get('per_page',12);
        $query = Person::select('people.*')->join('likes','likes.person_id','=','people.id')->where('likes.type','like');
        if ($likerId) $query->where('likes.liker_id',$likerId);
        $people = $query->with('pictures')->distinct()->paginate($perPage);
        return \App\Http\Resources\PersonResource::collection($people);
    }
}
