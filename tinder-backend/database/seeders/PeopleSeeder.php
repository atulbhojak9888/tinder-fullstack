<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Person;
use App\Models\Picture;

class PeopleSeeder extends Seeder {
    public function run()
    {
        // Simple manual seed
        $names = ['Alex','Sam','Taylor','Jordan','Casey','Jamie','Riley','Morgan','Quinn','Avery'];
        foreach ($names as $i => $n) {
            $p = Person::create(['name'=>$n,'age'=>20 + $i,'latitude'=>null,'longitude'=>null]);
            Picture::create(['person_id'=>$p->id,'url'=>'https://picsum.photos/600/900?random=' . ($i+1),'order'=>1]);
        }
    }
}
