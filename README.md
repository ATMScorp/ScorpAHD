# ScorpAHD
Program zarządzania akademikiem to system stworzony do efektywnego zarządzania studentami, zapewniający bezpieczne przechowywanie i ochronę ich danych osobowych. Program ten obejmuje kilka kluczowych funkcji:

Szyfrowanie i przechowywanie danych: Program zapewnia wysoki poziom bezpieczeństwa i poufności danych osobowych studentów. Dane są przechowywane w bezpiecznym środowisku, zapewniając dostęp tylko dla upoważnionych osób.

Powiadomienia i harmonogram wydarzeń: Program automatycznie informuje studentów za pomocą poczty elektronicznej o nadchodzących wydarzeniach, seminarach, ważnych terminach i innych wydarzeniach w życiu akademickim. Pomaga to studentom być na bieżąco z ważnymi wydarzeniami i lepiej planować swoje życie akademickie.

Ogólnie program ten ma na celu stworzenie komfortowego i bezpiecznego środowiska dla studentów, zapewniając im najlepsze warunki do nauki i mieszkania w akademikach oraz utrzymując komunikację i informowanie za pomocą nowoczesnych technologii.

# Instrukcje dotyczące uruchomienia aplikacji

Aplikacja została stworzona przy użyciu Spring Boot i Angular.

## Konfiguracja bazy danych

1. Zainstaluj i skonfiguruj MySQL.
2. Utwórz bazę danych `academic_db`.
3. Wypełnij plik `application.yml` w folderze `src/main/resources` danymi dotyczącymi połączenia z bazą danych:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/academic_db  # URL do Twojej bazy danych MySQL
    username:  # Nazwa użytkownika do dostępu do bazy danych
    password:  # Hasło do dostępu do bazy danych
    driver-class-name: com.mysql.cj.jdbc.Driver  # Nazwa klasy sterownika dla MySQL
  jpa:
    hibernate:
      ddl-auto: update  # Strategia aktualizacji schematu bazy danych (update - automatyczna aktualizacja)
    show-sql: true  # Wyświetlanie zapytań SQL w konsoli
    properties:
      hibernate:
        format_sql: true  # Formatowanie zapytań SQL dla lepszej czytelności
    database: mysql  # Typ bazy danych (MySQL)
    database-platform: org.hibernate.dialect.MySQLDialect  # Dialekt MySQL dla Hibernate
```

## Uruchamianie części serwerowej (Spring Boot)

1. **Upewnij się, że masz zainstalowaną Javę na swoim komputerze.**
2. **Otwórz projekt w swoim IDE.**
3. **Uruchom aplikację, uruchamiając klasę `ScorpAhdSpringApplication` jako aplikację Java.**
4. **Serwer będzie dostępny pod adresem [http://localhost:8080](http://localhost:8080).**

## Uruchamianie części klientowej (Angular)

1. **Upewnij się, że masz zainstalowany Node.js i Angular CLI.**
2. **Uruchom aplikację, wykonując polecenie `ng serve`.**
3. **Aplikacja kliencka będzie dostępna pod adresem [http://localhost:4200](http://localhost:4200).**

## Opis funkcji dostępnych dla admin'a

### Dodawanie studenta

- **Opis:** Ta funkcja pozwala administratorowi dodać nowego studenta do bazy danych.
- **Endpoint:** `POST /admin/student`
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/dc805b01-4efe-430f-8cc9-5503aba49d0f)
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/333c53f7-2083-49bb-9407-426bceb46812)
  
### Pobieranie listy studentów

- **Opis:** Ta funkcja pozwala administratorowi pobrać listę wszystkich studentów z bazy danych.
- **Endpoint:** `GET /admin/dashboard`
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/285d955f-8000-4ca9-9047-a87fb1d833b5)
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/70a80436-8ee4-427e-8648-df09844f1f41)

### Aktualizacja danych studenta

- **Opis:** Ta funkcja pozwala administratorowi zaktualizować dane istniejącego studenta.
- **Endpoint:** `POST /admin/dashboard/update/{studentId}`
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/ddc09e92-5c38-4291-88e5-024dcf7775dd)
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/7c346588-7792-4e49-9cae-996ddac8b377)

### Usuwanie studenta

- **Opis:** Ta funkcja pozwala administratorowi usunąć istniejącego studenta z bazy danych.
- **Endpoint:** `DELETE /admin/dashboard/{studentId}`
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/12c376ff-ab98-4e4b-84a1-60b35bb44600)

## Opis funkcji dostępnych dla studenta

### Pobieranie informacji o sobie

- **Opis:** Ta funkcja pozwala zalogowanemu studentowi pobrać informacje o swoim profilu.
- **Endpoint:** `GET /student/profile/{studentId}`
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/783a91af-ca68-42dd-8324-f226cf726bd4)

### Aktualizacja własnych danych

- **Opis:** Ta funkcja pozwala zalogowanemu studentowi zaktualizować swoje dane w systemie.
- **Endpoint:** `POST /student/update/{studentId}`
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/065cdd65-b2d6-42aa-a3ab-cd2cebdf9db8)
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/18f69707-3bd5-46a9-ad2a-e92fcb091966)

