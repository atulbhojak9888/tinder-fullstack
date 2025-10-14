<?php
namespace App\Console\Commands;
use App\Mail\PopularPersonAlert;
use App\Models\Person;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class NotifyPopularPeople extends Command
{
    protected $signature = 'people:notify-popular';
    protected $description = 'Email admin for people with likes_count > 50 and not notified';
    public function handle()
    {
        $threshold = 50;
        $people = Person::where('likes_count','>',$threshold)->whereNull('notified_at')->get();
        if ($people->isEmpty()) { $this->info('No new popular people.'); return 0; }
        foreach ($people as $person) {
            Mail::to(config('app.admin_email'))->send(new PopularPersonAlert($person));
            $person->update(['notified_at'=>now()]);
            $this->info("Notified about person: {$person->id}");
        }
        return 0;
    }
}
