<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;



class MailController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        //Mail::send(new DemoMail());
        $destinatario = $request->input('destinatario');
        $contenido = $request->input('contenido');

        //Mail::to($destinatario)->send(new CustomTextEmail($contenido));

        Mail::to($destinatario)->send(new DemoMail($contenido));

        return response()->json(['mensaje' => 'Correo enviado correctamente']);
    }
}
