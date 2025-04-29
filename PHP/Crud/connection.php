<?php
try{
    $conn = new PDO("mysql:host=khalid.local;dbname=crud","root","");
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}
catch (PDOExeption $e){
    echo  "message erreur : ".$e->getMessage();
}
?>