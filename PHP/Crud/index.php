<?php
include ('connection.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>afficher les etudiant</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1 class="title">Gestion des etudiant </h1>
    <a href="addForm.html" class="btn"> Ajouter Etudiant</a>

    <table>
        <thead>
            <tr>
                <th>CNE</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Email</th>
                <th>Filière</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php 
                try{
                    $stmt = $conn ->prepare("select * from etudiant group by nom ,prenom;");
                    $stmt->execute();
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC))
                    {
                        echo "<tr>
                                <th>{$row['CNE']}</th>
                                <th>{$row['nom']}</th>
                                <th>{$row['prenom']}</th>
                                <th>{$row['date_nes']}</th>
                                <th>{$row['email']}</th>
                                <th>{$row['filiere']}</th>
                                <th class='action'>
                                    <a href='update.php?id={$row['CNE']}' class='btn btn-info'>Modifier</a>
                                    <a href='delete.php?id={$row['CNE']}' class='btn btn-danger' onclick='return confirm(\"Êtes-vous sûr de vouloir supprimer cet étudiant ?\")'>Supprimer</a>
                                </th>
                            </tr>";
                    }
                }
                catch (PDOException $e) {
                    echo "<tr><td colspan='7'>Erreur: ".$e->getMessage()."</td></tr>";
                }


            ?>
        </tbody>
    </table>
</div>
    
</body>
</html>