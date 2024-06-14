<?php
  include 'conexao.php';

  $user_email = $_POST['user_email'];
  $password = $_POST['password'];

  $sql = mysql_query("SELECT * FROM users WHERE (user_name = '$user_email' OR email = '$user_email') AND password = '$password'");

  $user_data = mysql_fetch_assoc($sql);

  if ($user_data){
    
    echo $user_data['user_name'], ' logado' ;
    
  }else{
    echo'senha ou usuario errado';
  }  

?>
