<?php
require "PHPMailer-master/PHPMailerAutoload.php";

$name = $_POST['name'];




$mail = new PHPMailer;

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '';                 // SMTP username
$mail->Password = '';                           // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
$mail->CharSet = 'UTF-8';
$mail->setFrom('', 'mr. fsd');
$mail->addAddress('', 'Дорогому клиенту');     // Add a recipient

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = "Сообщение от пользователя";
$mail->Body    = "Сообщение от пользователя: {$_POST['name']}";
$mail->AltBody = "Сообщение от пользователя: {$_POST['name']}";

if(!$mail->send()) {
    $mydata['status'] = 'Message could not be sent.';
    $mydata['status'] .= 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    $mydata['status'] = 'Message has been sent';
}

echo json_encode($mydata);