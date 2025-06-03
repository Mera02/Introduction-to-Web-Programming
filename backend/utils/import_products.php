<?php
require_once __DIR__ . '/../config.php';

$db = Database::connect();

// Učitaj JSON fajl
$jsonFile = __DIR__ . '/../data/import_products.json';
$jsonData = file_get_contents($jsonFile);
$products = json_decode($jsonData, true);

if (!$products) {
    die("Greška prilikom čitanja JSON fajla.");
}

foreach ($products as $product) {
    // Pronađi odgovarajući category_id
    $stmt = $db->prepare("SELECT id FROM categories WHERE LOWER(name) = LOWER(?)");
    $stmt->execute([$product['category']]);
    $category = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$category) {
        echo "❌ Kategorija ne postoji: " . $product['category'] . "<br>";
        continue;
    }

    // Ubacivanje u products tabelu
    $insert = $db->prepare("
        INSERT INTO products (name, description, price, image_url, category_id)
        VALUES (?, ?, ?, ?, ?)
    ");
    $insert->execute([
        $product['name'],
        $product['description'],
        $product['price'],
        $product['image_url'],
        $category['id']
    ]);

    echo "✅ Ubačen: " . $product['name'] . "<br>";
}
