<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id'])) {
    $cne = $_GET['id'];
    
    try {
        $stmt = $conn->prepare("DELETE FROM etudiant WHERE cne = ?");
        $stmt->execute([$cne]);
        
        header("Location: index.php?success=Étudiant supprimé avec succès");
        exit();
    } catch (PDOException $e) {
        header("Location: index.php?error=".$e->getMessage());
        exit();
    }
} else {
    header("Location: index.php");
    exit();
}
?>