<?php
require_once __DIR__ . '/../config.php';

class BaseDao {
    protected $table;
    protected $conn;

    public function __construct($table) {
        $this->table = $table;
        $this->conn = Database::connect();
    }

    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function insert($data) {
        $keys = implode(",", array_keys($data));
        $placeholders = ":" . implode(", :", array_keys($data));
        $stmt = $this->conn->prepare("INSERT INTO $this->table ($keys) VALUES ($placeholders)");
        $stmt->execute($data);
        return $this->conn->lastInsertId();
    }

    public function add($data) {
        $id = $this->insert($data);
        $data['id'] = $id;
        return $data;
    }

    public function update($id, $data) {
        $updates = "";
        foreach ($data as $key => $value) {
            $updates .= "$key = :$key, ";
        }
        $updates = rtrim($updates, ", ");
        $data['id'] = $id;
        $stmt = $this->conn->prepare("UPDATE $this->table SET $updates WHERE id = :id");
        $stmt->execute($data);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM $this->table WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
    }
}
