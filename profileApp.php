<?php
/*
include ("../../session.php");
include_once ("../../service.php");
include ("../../accountApp/accountApp.php");
*/
include ("../../session.php");
include_once ("../../service.php");

  
 class profileApp
 {  	
public $disk;
  
   public function __construct()
    {
        $this->disk = new Disk($_SESSION['userId']);
    }

     function load($id)
    {
    	$id = json_decode($id,false);
        
    	if($id == false){
            returnWrapper($this->disk->read('models/profile.json', false));
        } else {
            $diskOther = new Disk($id);
            returnWrapper($diskOther->read('models/profile.json', false));
        }
       
    }


function changePassword( $old, $new){

$userId = $_SESSION['userId'];
$oldPass = dbSelect("SELECT password FROM users WHERE id='".$userId."';");

if ($old != $oldPass[0]['password']) {
	returnWrapper('Your old pass is not <strong>'.$old.'</strong>, please try again!');
} else {

$validationResult = $this->validatePassword($new);
if( $validationResult == 'OK'){
	dbQuery("UPDATE users SET password = '$new' WHERE id='$userId';");
	returnWrapper(true);
} else { 
	returnWrapper($validationResult);
}

}



	
}



 


 function validatePassword($candidate) {


    // Password Strength check
    if( strlen($candidate) < 8 ) {
        $error[] = 'Password need to have at least 8 characters!';
    }

    if( strlen($candidate) > 20 ) {
        $error[] = 'Password needs to have less than 20 characters!';
    }

    if( !preg_match("#[0-9]+#", $candidate) ) {
        $error[] = 'Password must include at least one number!';
    }


    if( !preg_match("#[A-Za-z]+#", $candidate) ) {
        $error[] = 'Password must include at least one letter!';
    }

 
        if( !preg_match("#[A-Z]+#", $candidate) ) {
            $error[] = 'Password must include at least one uppercase letter!';
        }
 
        if (!empty($error))
        {
          return($error);
        }
        else
        {
            return("OK");
        }           
    }
 }