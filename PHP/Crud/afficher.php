<?php
include('connection.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Étudiants</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Gestion des Étudiants</h1>
        
        <a href="AddForm.html" class="btn">Ajouter un étudiant</a>
        
        <?php
        if (isset($_GET['success'])) {
            echo '<div class="alert alert-success">'.htmlspecialchars($_GET['success']).'</div>';
        }
        if (isset($_GET['error'])) {
            echo '<div class="alert alert-error">'.htmlspecialchars($_GET['error']).'</div>';
        }
        ?>

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
                try {
                    $stmt = $conn->query("SELECT * FROM etudiant ORDER BY nom, prenom");
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        echo "<tr>
                                <td>{$row['CNE']}</td>
                                <td>{$row['nom']}</td>
                                <td>{$row['prenom']}</td>
                                <td>{$row['date_nes']}</td>
                                <td>{$row['email']}</td>
                                <td>{$row['filiere']}</td>
                                <td class='actions'>
                                    <a href='edit.php?id={$row['CNE']}' class='btn btn-info'>Modifier</a>
                                    <a href='delete.php?id={$row['CNE']}' class='btn btn-danger' onclick='return confirm(\"Êtes-vous sûr de vouloir supprimer cet étudiant ?\")'>Supprimer</a>
                                </td>
                              </tr>";
                    }
                } catch (PDOException $e) {
                    echo "<tr><td colspan='7'>Erreur: ".$e->getMessage()."</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>