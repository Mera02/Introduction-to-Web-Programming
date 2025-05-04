# Introduction-to-Web-Programming

## 🗂️ Projektna Struktura
Ovaj projekat predstavlja REST API backend za restoran (Ćevabdžinica Zmaj), razvijen u PHP-u koristeći FlightPHP framework. 
Sadrži kompletne CRUD operacije, validaciju, OpenAPI dokumentaciju i jednostavan frontend.

---

### ✅ Milestone 3 - Completed Features

- [x] **Business Logic Implementation**
  - Napravljeni su servisi za sve entitete (`ProductService`, `UserService`, `OrderService`, itd).
  - Validacije su implementirane (npr. prazna polja, negativne cijene, nevalidni email/URL).
  - Logika je modularna i može se lako proširivati.

- [x] **Presentation Layer**
  - Urađena je Swagger vizualizacija pomoću `swagger/index.html`.

- [x] **OpenAPI Dokumentacija**
  - Svi endpointi su dokumentovani u `openapi.yaml`.
  - Swagger generiše vizualnu dokumentaciju za testiranje i pregled.

- [x] **Deliverables**
  - CRUD endpointi postoje za sve entitete.
  - Backend dokumentacija je u potpunosti pokrivena po OpenAPI standardu.

---



## 🧩 Entiteti

- **Users** – registracija, login, role (admin/user)
- **Products** – proizvodi u meniju
- **Categories** – npr. "Pića", "Porcije"
- **Orders** – narudžbe korisnika
- **Order Items** – stavke unutar narudžbi

---

## 🧠 Business logika i validacija

Za svaki entitet postoji Service sloj (npr. `ProductService.php`) koji uključuje:
- Validaciju (npr. da cijena ne može biti negativna)
- Obradu grešaka
- Odvajanje logike od ruta

Testirano je kroz Postman:
- Nedozvoljen unos negativne cijene
- Nedostajuća polja (npr. ime proizvoda)
- Nevalidan URL slike
- Duplicirani email pri registraciji

---

## 🔌 OpenAPI Dokumentacija (Swagger)

Swagger je dostupan na:
```
http://localhost/FarisMeric/Introduction-to-Web-Programming/frontend/swagger/index.html
```

Omogućava testiranje svih ruta putem browsera bez Postmana.

---

## 📦 MySQL Baza – Setup

**Da, potrebno je importovati bazu u phpMyAdmin!**

### Koraci:
1. Otvori `http://localhost/phpmyadmin`
2. Kreiraj novu bazu: `cevabdzinica_zmaj`
3. Klikni na bazu → tab **Import**
4. Izaberi fajl `cevabdzinica_zmaj.sql`
5. Klikni **Go**

---

## 🧪 Postman – Testiranje API-ja

### Osnovni URL:
```
http://localhost/FarisMeric/Introduction-to-Web-Programming/backend
```

### Headers:
```
Content-Type: application/json
```

### Primjeri:

**POST /users**
```json
{
  "first_name": "Test",
  "last_name": "User",
  "email": "test@example.com",
  "password": "test123",
  "phone": "061111111",
  "role": "user"
}
```

**POST /products**
```json
{
  "name": "Pljeskavica",
  "price": 7.5,
  "category_id": 1
}
```

**GET /orders** – Vrati sve narudžbe
**DELETE /categories/2** – Obriši kategoriju sa ID 2

---

## 🧬 Baza – Shema

Shema baze nalazi se u:
```
frontend/database-schema.jpg
```

---

## 🧹 Napomena
- Uklonjeni su nepotrebni komentari i test fajlovi
- Validacija implementirana u svim servisima
- Swagger pokriva sve rute

---