<?php

$json = file_get_contents('../goods.json');
$json = json_decode($json);

$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>ФИО: '.$_POST['eFIO'].'</p>';
$message .= '<p>Номер телефона: '.$_POST['eNum'].'</p>';
$message .= '<p>Электронная почта: '.$_POST['email'].'</p>';
$message .= '<p>Город: '.$_POST['eCity'].'</p>';
$message .= '<p>Отделение Новой почты: '.$_POST['ePost'].'</p>';

$goods = $_POST['card'];

foreach($card as $id=>$count){
    $message .=$json[$id][$name];
}

print_r($message);
?>