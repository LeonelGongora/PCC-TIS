<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DemoMail extends Mailable
{
    use Queueable, SerializesModels;

    //public $mailData;
    protected $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($content)
    {
        $this->content = $content;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
        ->from('blackcloudsrl@gmail.com')->subject('Envio de contraseña')
        ->text('orden')
                    ->with(['content' => $this->content]);
                    //->view('orden');
        //->to('blackcloudsrl@gmail.com')
        
    }
}
