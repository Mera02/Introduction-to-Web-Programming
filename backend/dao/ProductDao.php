<?php
require_once 'BaseDao.php';

class ProductDao extends BaseDao {
    public function __construct() {
        parent::__construct("products");
    }

    public function getByCategory($category_id) {
        $stmt = $this->conn->prepare("SELECT * FROM products WHERE category_id = :category_id");
        $stmt->bindParam(":category_id", $category_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($product) {
        $stmt = $this->conn->prepare(
            "INSERT INTO products (name, description, price, image_url, category_id)
             VALUES (:name, :description, :price, :image_url, :category_id)"
        );
        $stmt->execute([
            ':name' => $product['name'],
            ':description' => $product['description'],
            ':price' => $product['price'],
            ':image_url' => $product['image_url'],
            ':category_id' => $product['category_id']
        ]);
    }
}

?>
