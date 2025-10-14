<?php
namespace App\Mail;
use App\Models\Person;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PopularPersonAlert extends Mailable
{
    use Queueable, SerializesModels;
    public Person $person;
    public function __construct(Person $person) { $this->person = $person; }
    public function build()
    {
        return $this->subject("Popular person >50 likes: {$this->person->name}")->view('emails.popular_person')->with(['person'=>$this->person]);
    }
}
