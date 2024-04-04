# ScorpAHD (in progress)
Program zarządzania akademikiem to system stworzony do efektywnego zarządzania studentami, zapewniający bezpieczne przechowywanie i ochronę ich danych osobowych. Program ten obejmuje kilka kluczowych funkcji:

Szyfrowanie i przechowywanie danych: Program zapewnia wysoki poziom bezpieczeństwa i poufności danych osobowych studentów. Dane są przechowywane w bezpiecznym środowisku, zapewniając dostęp tylko dla upoważnionych osób.

Powiadomienia i harmonogram wydarzeń: Program automatycznie informuje studentów za pomocą poczty elektronicznej o nadchodzących wydarzeniach, seminarach, ważnych terminach i innych wydarzeniach w życiu akademickim. Pomaga to studentom być na bieżąco z ważnymi wydarzeniami i lepiej planować swoje życie akademickie.

Ogólnie program ten ma na celu stworzenie komfortowego i bezpiecznego środowiska dla studentów, zapewniając im najlepsze warunki do nauki i mieszkania w akademikach oraz utrzymując komunikację i informowanie za pomocą nowoczesnych technologii. **Dodatkowo warto zauważyć, że aplikacja nadal jest rozwijana i ulepszana.**

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

## Konfiguracja wysyłania wiadomości e-mail

Aby skonfigurować wysyłanie wiadomości e-mail, wykonaj następujące kroki:

W pliku application.yml dodaj sekcję mail zawierającą informacje o serwerze SMTP, takie jak host, port, nazwę użytkownika(może być adres e-mail) 
i hasło do uwierzytelnienia serwera SMTP(how to create an application password you can watch in this video https://www.youtube.com/watch?v=J4CtP1MBtOE by Tony Teaches Tech).

```yaml
mail:
  host: smtp.gmail.com # Host serwera SMTP
  port: 587 # Port serwera SMTP
  username: # Nazwa użytkownika do uwierzytelniania serwera SMTP
  password: # Hasło do uwierzytelniania serwera SMTP
  properties:
    mail:
      smtp:
        auth: true # Włączenie uwierzytelniania SMTP
        starttls:
          enable: true # Włączenie STARTTLS dla bezpiecznego połączenia
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

![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/22187ae9-c53d-4ca0-a826-3806e5d0ef39)


## Opis funkcji dostępnych dla admin'a

### Dodawanie studenta

- **Opis:** Ta funkcja pozwala administratorowi dodać nowego studenta do bazy danych.
- **Endpoint:** `POST /admin/student`
- **Instrukcje:** Aby dodać nowego studenta, administrator musi wypełnić formularz zawierający dane nowego studenta, takie jak imię, nazwisko, adres e-mail, numer telefonu, itp. Po wypełnieniu formularza i zatwierdzeniu, nowy student zostanie dodany do bazy danych.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/dc805b01-4efe-430f-8cc9-5503aba49d0f)
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/333c53f7-2083-49bb-9407-426bceb46812)
  
### Pobieranie listy studentów

- **Opis:** Ta funkcja pozwala administratorowi pobrać listę wszystkich studentów z bazy danych.
- **Endpoint:** `GET /admin/dashboard`
- **Instrukcje:** Po wywołaniu tego endpointu, administrator otrzyma listę wszystkich studentów znajdujących się w systemie wraz z ich danymi osobowymi, takimi jak imię, nazwisko, adres e-mail, numer telefonu, itp.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/285d955f-8000-4ca9-9047-a87fb1d833b5)
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/70a80436-8ee4-427e-8648-df09844f1f41)

### Aktualizacja danych studenta

- **Opis:** Ta funkcja pozwala administratorowi zaktualizować dane istniejącego studenta.
- **Endpoint:** `POST /admin/dashboard/update/{studentId}`
- **Instrukcje:** Administrator musi wybrać studenta, którego dane chce zaktualizować, a następnie wypełnić formularz zawierający nowe dane studenta. Po zatwierdzeniu formularza, dane studenta zostaną zaktualizowane w bazie danych.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/ddc09e92-5c38-4291-88e5-024dcf7775dd)
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/7c346588-7792-4e49-9cae-996ddac8b377)

### Usuwanie studenta

- **Opis:** Ta funkcja pozwala administratorowi usunąć istniejącego studenta z bazy danych.
- **Endpoint:** `DELETE /admin/dashboard/{studentId}`
- **Instrukcje:** Administrator musi wybrać studenta, którego chce usunąć, a następnie potwierdzić operację usuwania. Po potwierdzeniu, student zostanie usunięty z bazy danych.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/12c376ff-ab98-4e4b-84a1-60b35bb44600)

### Wysyłanie wiadomości e-mail

- **Opis:** Ta funkcja pozwala zalogowanemu administratorowi wysyłać wiadomości e-mail do innych użytkowników systemu.
- **Endpoint:** `POST /admin/send`
- **Instrukcje:** Administrator może wysłać wiadomość e-mail do innych użytkowników systemu, wprowadzając adresy e-mail odbiorców, temat wiadomości, treść wiadomości oraz opcjonalnie załączniki.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/c90c3b1b-3fa3-469d-8556-b43ab92e854b)

### Wysyłanie e-maili do wszystkich użytkowników

- **Opis:** Ta funkcja pozwala administratorowi wysłać wiadomość e-mail do wszystkich użytkowników systemu.
- **Endpoint:** `POST /admin/send/send-to-all`
- **Instrukcje:** Administrator może wysłać wiadomość e-mail do wszystkich użytkowników systemu, wprowadzając temat wiadomości, treść wiadomości oraz opcjonalnie załączniki. Po zatwierdzeniu, wiadomość zostanie wysłana do wszystkich użytkowników.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/baecfc61-59ad-4246-afc1-18b39ba9bb77)

### Dodanie event'a

- **Opis:** Ta funkcja pozwala administratorowi dodać nowe wydarzenie do systemu.
- **Endpoint:** `POST /admin/event`
- **Instrukcje** Administrator musi wypełnić formularz zawierający szczegóły nowego wydarzenia, takie jak tytuł, opis, lokalizacja, czas rozpoczęcia i zakończenia. Po wypełnieniu formularza i zatwierdzeniu, nowe wydarzenie zostanie dodane do systemu.
 ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/f33b5751-6b66-4ba2-9c54-8a4adac4098e)
![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/80418142-ffb0-4a9e-9d02-48bc7a95a660)

### Aktualizacja event'a

- **Opis:** Ta funkcja pozwala administratorowi zaktualizować istniejące wydarzenie.
- **Endpoint:** `PUT /admin/event/{eventId}`
- **Instrukcje** Administrator musi wybrać wydarzenie, którego dane chce zaktualizować, a następnie wypełnić formularz zawierający nowe dane wydarzenia. Po zatwierdzeniu formularza, dane wydarzenia zostaną zaktualizowane w systemie.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/50f7e725-110a-49cf-8ecc-53097cba6172)
![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/dd7a77b4-8bbe-4a8f-937c-5b4db156144c)

### Usuwanie event'a

- **Opis:** Ta funkcja pozwala administratorowi usunąć istniejące wydarzenie z systemu.
- **Endpoint:** `DELETE /admin/event/{eventId}`
- **Instrukcje** Administrator musi wybrać wydarzenie, które chce usunąć, a następnie potwierdzić operację usuwania. Po potwierdzeniu, wydarzenie zostanie usunięte z systemu.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/3ed583bc-8591-4b9c-bc8a-4aa9b5b10f11)

## Opis funkcji dostępnych dla studenta

### Pobieranie informacji o sobie

- **Opis:** Ta funkcja pozwala zalogowanemu studentowi pobrać informacje o swoim profilu.
- **Endpoint:** `GET /student/profile/{studentId}`
- **Instrukcje** Po wywołaniu tego endpointu, student otrzyma informacje zawierające jego dane osobowe, takie jak imię, nazwisko, adres e-mail, numer telefonu, itp.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/783a91af-ca68-42dd-8324-f226cf726bd4)

### Aktualizacja własnych danych

- **Opis:** Ta funkcja pozwala zalogowanemu studentowi zaktualizować swoje dane w systemie.
- **Endpoint:** `POST /student/update/{studentId}`
- **Instrukcje** Student musi wypełnić formularz zawierający nowe dane, które chce zaktualizować, a następnie zatwierdzić formularz. Po zatwierdzeniu, dane studenta zostaną zaktualizowane w systemie.
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/2d7dc841-0785-4214-806c-954dc1ccead0)
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/18f69707-3bd5-46a9-ad2a-e92fcb091966)

  ### Pobieranie listy wydarzeń

- **Opis:** Ten endpoint pozwala studentowi uzyskać listę dostępnych dla niego wydarzeń.
- **Endpoint:** `GET /student/news`
- **Instrukcje** Zwraca listę wydarzeń, które są dostępne dla studenta. 
  ![image](https://github.com/ATMScorp/ScorpAHD/assets/149021941/78fc9118-9c9c-4101-8053-625fd541ac30)


