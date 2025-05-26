<?php
require_once __DIR__ . '/../config.php';

$pdo = Database::connect();

$categories = [
    ['id' => 1, 'name' => 'Porcije'],
    ['id' => 2, 'name' => 'Kombinacije'],
    ['id' => 3, 'name' => 'Plate'],
    ['id' => 4, 'name' => 'Salate'],
    ['id' => 5, 'name' => 'Pecivo i mlijecni proizvodi'],
    ['id' => 6, 'name' => 'Pića'],
    ['id' => 7, 'name' => 'Kafa i čaj'],
    ['id' => 8, 'name' => 'Dezerti'],
];

foreach ($categories as $category) {
    try {
        $stmt = $pdo->prepare("INSERT INTO categories (id, name) VALUES (:id, :name)");
        $stmt->execute([
            ':id' => $category['id'],
            ':name' => $category['name']
        ]);
        echo "✅ Dodana kategorija: {$category['name']}<br>";
    } catch (PDOException $e) {
        echo "❌ Greška kod kategorije {$category['name']}: " . $e->getMessage() . "<br>";
    }
}
