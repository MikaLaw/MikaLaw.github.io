<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$email      = $_POST['email'];

$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    // Настройки почты
    $mail->Host = 'smtp.gmail.com'; // SMTP server
    $mail->Username = 'feoktis.n@gmail.com'; // Login your email
    $mail->Password = 'k107riku985h'; // Password your email
    $mail->SMTPSecure = "tls";
    $mail->Port       = 587;
    $mail->setFrom("no-reply@site.com", "Sender name"); // Адрес почты и имя отправителя
    // Получатель письма
    $mail->addAddress("to@mail.com");

    // -----------------------
    // Письмо
    // -----------------------
    $mail->Subject = "Новая заявка";
    $mail->Body    = "Email: $email";

  if ($mail->send()) {
    echo "Письмо успешно отправлено";
  } else {
    echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
  }
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
?>


