<?
 //если проблемы с кодировкой файла сохранить его в другой
    $name = $_POST['name']; 
    $staff = $_POST['staff']; 
    $place = $_POST['place'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    $to = 'sochi@open-s.info,kuznecovs45@gmail.com';
    //$to = 'kuznecovs45@gmail.com';
    if ($name) {$mainName="Имя: <strong>$name</strong><br>"  ;}
    if ($staff) {$mainStaff="Должность: <strong>$staff</strong><br>"  ;}
    if ($place) {$mainPlace="Наименование заведения: <strong>$place</strong><br>"  ;}
    if ($phone) {$mainPhone="Телефон: <strong>$phone</strong><br>"  ;}
    if ($email) {$mainEmail="Почта: <strong>$email</strong><br>"  ;}
    $subject = 'Заявка с сайта OPENSERVICE';
    $body = "Информация:<br><br>          
            $mainName
            $mainStaff
            $mainPlace
            $mainPhone
            $mainEmail
            ";


    $headers = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset=utf-8";
    $headers[] = "Subject: {$subject}";
    $headers[] = "From: mail@openservice.ru";
    $headers[] = "X-Mailer: PHP/".phpversion();


    mail($to,  $subject, $body, implode("\r\n", $headers));

?>