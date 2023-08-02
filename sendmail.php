<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('uk', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('kenici780@gmail.com', 'форма заявки');
$mail->addAddress('dobrocenterfin@gmail.com');
$mail->Subject = 'Новая заявка!';

$body = '<h1>Новая заявка!</h1>';

if (trim(!empty($_POST['name']))){
   $body.= '<p>Имя: '.$_POST['name'].'</p>';
}
if (trim(!empty($_POST['surename']))){
   $body.= '<p>Фамилия: '.$_POST['surename'].'</p>';
}
if (trim(!empty($_POST['email']))){
   $body.= '<p>Email: '.$_POST['email'].'</p>';
}
if (trim(!empty($_POST['lesson']))){
   $body.= '<p>Название кружка / секции: '.$_POST['lesson'].'</p>';
}
if (trim(!empty($_POST['address']))){
   $body.= '<p>Адрес: '.$_POST['address'].'</p>';
}
if (trim(!empty($_POST['phoneNumber']))){
   $body.= '<p>Телефон: '.$_POST['phoneNumber'].'</p>';
}
if (trim(!empty($_POST['message']))){
   $body.= '<p>Сообщение: '.$_POST['message'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
   $message = 'Ошибка отправки формы';
} else {
   $message = 'Заявка отправлена';
}

$response = ['message' => $message];

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://127.0.0.1:56013/enroll.html");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: * ");
echo json_encode($response);
?>