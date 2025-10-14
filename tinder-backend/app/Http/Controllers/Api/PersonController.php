<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\PersonResource;
use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int)$request->get('per_page', 10);
        $query = Person::with('pictures');
        if ($request->filled('q')) {
            $query->where('name','like','%'.$request->q.'%');
        }
        $people = $query->orderBy('created_at','desc')->paginate($perPage);
        return PersonResource::collection($people);
    }

    public function show(Person $person)
    {
        $person->load('pictures');
        return new PersonResource($person);
    }
}
