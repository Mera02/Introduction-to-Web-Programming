<?php
require_once __DIR__ . '/../dao/ProductDao.php';
require_once __DIR__ . '/BaseService.php';

class ProductService extends BaseService {

    public function __construct() {
        $this->dao = new ProductDao();
    }

    public function getByCategory($category_id) {
        return $this->dao->getByCategory($category_id);
    }

    public function create($product) {
        $this->validateProduct($product);
        return parent::create($product);
    }

    public function update($id, $product) {
        $this->validateProduct($product);
        return parent::update($id, $product);
    }

    public function add($product) {
        $this->validateProduct($product);
        return $this->dao->add($product);
    }

    private function validateProduct($product) {
        if (!isset($product['name']) || strlen(trim($product['name'])) === 0) {
            throw new Exception("Product name is required.");
        }

        if (!isset($product['price']) || !is_numeric($product['price']) || $product['price'] <= 0) {
            throw new Exception("Price must be a positive number.");
        }

        if (!isset($product['category_id']) || !is_numeric($product['category_id']) || $product['category_id'] <= 0) {
            throw new Exception("Valid category ID is required.");
        }

        if (isset($product['image_url']) && $product['image_url'] !== null && !filter_var($product['image_url'], FILTER_VALIDATE_URL)) {
            throw new Exception("Invalid image URL.");
        }

        // Optional: validate description if needed
        if (isset($product['description']) && !is_string($product['description'])) {
            throw new Exception("Description must be a string.");
        }
    }
}
