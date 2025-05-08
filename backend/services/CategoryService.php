<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/CategoryDao.php';

class CategoryService extends BaseService {

    public function __construct() {
        $dao = new CategoryDao();
        parent::__construct($dao);
    }

    private function validateCategory($category) {
        if (!isset($category['name']) || trim($category['name']) === '') {
            throw new Exception("Category name is required.");
        }
    }

    public function create($category) {
        $this->validateCategory($category);
        return parent::create($category);
    }

    public function update($id, $category) {
        $this->validateCategory($category);
        return parent::update($id, $category);
    }
}
