<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id'])) {
    $cne = $_GET['id'];
    
    try {
        $stmt = $conn->prepare("SELECT * FROM etudiant WHERE cne = ?");
        $stmt->execute([$cne]);
        $etudiant = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$etudiant) {
            header("Location: index.php?error=Étudiant non trouvé");
            exit();
        }
    } catch (PDOException $e) {
        header("Location: index.php?error=".$e->getMessage());
        exit();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cne = $_POST['cne'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $date_nes = $_POST['date_nes'];
    $email = $_POST['email'];
    $filiere = $_POST['filiere'];
    
    try {
        $sql = "UPDATE etudiant SET nom = ?, prenom = ?, date_nes = ?, email = ?, filiere = ? WHERE cne = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nom, $prenom, $date_nes, $email, $filiere, $cne]);
        
        header("Location: index.php?success=Étudiant mis à jour avec succès");
        exit();
    } catch (PDOException $e) {
        header("Location: index.php?error=".$e->getMessage());
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier un étudiant</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Modifier un étudiant</h1>
        
        <form action="edit.php" method="POST">
            <input type="hidden" name="cne" value="<?php echo htmlspecialchars($etudiant['CNE']); ?>">
            
            <div>
                <label for="CNE">CNE :</label>
                <input type="text" id="CNE" name="cne_display" value="<?php echo htmlspecialchars($etudiant['CNE']); ?>" disabled>
            </div>
            <div>
                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" value="<?php echo htmlspecialchars($etudiant['nom']); ?>" required>
            </div>
            <div>
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" value="<?php echo htmlspecialchars($etudiant['prenom']); ?>" required>
            </div>
            <div>
                <label for="date_nes">Date de naissance :</label>
                <input type="date" id="date_nes" name="date_nes" value="<?php echo htmlspecialchars($etudiant['date_nes']); ?>" required>
            </div>
            <div>
                <label for="email">Email :</label>
                <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($etudiant['email']); ?>" required>
            </div>
            <div>
                <label for="filiere">Filière :</label>
                <input type="text" id="filiere" name="filiere" value="<?php echo htmlspecialchars($etudiant['filiere']); ?>" required>
            </div>
            <div>
                <button type="submit" class="btn">Mettre à jour</button>
                <a href="index.php" class="btn btn-danger">Annuler</a>
            </div>
        </form>
    </div>
</body>
</html>