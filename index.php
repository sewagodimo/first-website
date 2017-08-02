<?php

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['msg'];
    $via = $_POST['via'];
    $orgname= $_POST['org'];
    $from = 'From: Ednecia me'; 
    $to = 'edneicamat@gmail.com'; 
   $subject = 'From Ednecia me';
   $human = $_POST['human'];
	$nameErr = $emailErr = $messageErr = "";		
   
    $body = "From: $name\n E-Mail: $email\n Message:\n $message \nOrganization $org\n Via $org";
				
    if ($_POST['submit'] && $human == '4') {
    if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
      $nameErr = "Only letters and white space allowed"; 
    }
  }		
  else  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format"; 
    }
  }
   else  if (empty($_POST["msg"])) {
    $emailErr = "Message is required";
  }
       else if (mail ($to, $subject, $body, $from)) { 
	    echo '<p>Your message has been sent!</p>';
	} else { 
	    echo '<p>Something went wrong, go back and try again!</p>'; 
	} 
     else if ($_POST['submit'] && $human != '4') {
	echo '<p>You answered the anti-spam question incorrectly!</p>';
    }
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>