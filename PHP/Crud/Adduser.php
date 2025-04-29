<?php
include ('connection.php');
function checkexist($conn,$cne)
{
    $check = $conn->prepare("SELECT * FROM etudiant WHERE cne = ?");
    if ($check->rowCount() > 0) {
        echo "<script>alert('Erreur : Ce CNE existe déjà !');</script>";
        return (0);
    }
    else 
        return (1);

}

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $cne = $_POST['cne'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $date_nes = $_POST['date_nes'];
    $email = $_POST['email'];
    $filiere = $_POST['filiere'];

    try{
        $check = $conn->prepare("SELECT * FROM etudiant WHERE cne = ?");
        if ($check->rowCount() > 0) {
            echo "<script>alert('Erreur : Ce CNE existe déjà !');</script>";
            header("Location: adduser.php");           
        }
        else {
            $sql = "INSERT INTO etudiant (cne, nom, prenom, date_nes, email,filiere) VALUES (?, ?, ?, ?, ?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$cne, $nom, $prenom, $date_nes, $email,$filiere]);
            echo "<script>alert('Étudiant ajouté avec succès');</script>";
            header("location :afficher.php");
        }
    
    }
    catch (PDOExeption $e)
    {
        echo " messsage erreur : ".$e->getMessage();
    }
}

?>