<?php
require_once 'BaseDao.php';

class CategoryDao extends BaseDao {
    public function __construct() {
        parent::__construct("categories");
    }
    //ubacivanje u bazu
    public function getByName($name) {
    $stmt = $this->conn->prepare("SELECT * FROM categories WHERE LOWER(name) = LOWER(?)");
    $stmt->execute([$name]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
}


?>
