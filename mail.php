<?php
require_once "sendmailsmtp.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$post = (!empty($_POST)) ? true : false;

if ($post) {
	$name=htmlspecialchars(trim($_POST['name']));
	$emailaddress=htmlspecialchars(trim($_POST['emailaddress']));
	$subject=htmlspecialchars(trim($_POST['subject']));
	$spamtrap=htmlspecialchars(trim($_POST['spamtrap']));
	$arrError=[];
	$mailTo='mail@serjionemano.ru';
	$mesage='';
	$flags=0;
	$values=[$name, $emailaddress, $subject];
	if (!$spamtrap=='') {
		$flags++;
	}
	foreach ($values as $key => $value) {
	 	if (isset($value) && $value=='') {
	 		array_push($arrError, $key);
			$flags++;
	 	}
	}
	if ($flags==0) {
		$theme='К Вам с письмом обратился господин '.$name; 
		  $headers = "MIME-Version: 1.0\r\n";
		  $headers .= "Content-type: text/html; charset=utf-8\r\n";
		  $headers .= "To: $to\r\n";
		  $headers .= "From: Имя отправителя <mail@serjionemano.ru>";
		$message=$subject.'. <br> В обратном адрессе господин '.$name.' указал '.$emailaddress;
		MailSmtp($mailTo, $theme, $message, $headers);
	 	echo "true";
	}else{
		print_r($arrError);
	}
}



?>