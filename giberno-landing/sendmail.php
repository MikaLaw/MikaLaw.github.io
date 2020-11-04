<?php
// phpmailer files
use PHPMailer/PHPMailer/PHPMailer;
use PHPMailer/PHPMailer/Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Settings PHPMailer
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->isHTML(true);

    //От кого
    $mail->setFrom('feoktis.n@gmail.com', 'Sender is name'); // Mail address itself and sender's name
    // кому отправить
    $mail->addAddress('feoktistovaconstr@gmail.com');
    $mail->Subject ='ldfkld';
    $hand = 'Правая';
    if($_POST['hand'] == 'left') {
    $hand = 'левая';
    }
    $mail->Body = '<h1>jhsdjkssadls; ldkv;ldk</h1>';
    // Настройки вашей почты
      $mail->Body = $body

    $mail->Host = 'smtp.gmail.com'; // SMTP server
    $mail->Username = 'feoktis.n@gmail.com'; // Login your email
    $mail->Password = 'k107riku985h'; // Password your email
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;



// Sending a message




// Checking for poisoning
if ($mail->send()) {$result = "success";}
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Message was not sent. Cause of the error: {$mail->ErrorInfo}";
}
