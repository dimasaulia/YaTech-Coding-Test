# YaTech Coding Test

Program Untuk Membuat Refresh Token

---

## Instalasi & Setup

Untuk menjalankan sistem ini instal seluruh library yang diperlukan, jalankan perintah ini.

```
yarn install
```

Setelah menginstall seluruh library persipakan url ke databse serta buat 128 karakter string. Duplikasi file `.example.env` menjadi `.env`. Isi setiap data pada file tersebut.

```
ENV = "DEVELOPMENT"
DATABASE_URL = "postgresql://username:pass@host:port/db_name?schema=public"
REFRESH_TOKEN_SECRET = "128_char"
ACCESS_TOKEN_SECRET = "128_char"
```

Setelah mengatur environment, lakukan migrasi database menggunakan perintah:

```
yarn db:migrate
```

## Api List

Sistem ini memiliki beberapa endpoint, sistem ini memiliki fitur untuk registrasi, login, logout dan menu dashboard sederhana. Di bawah ini adalah daftar API yang tesedia.

### API Dashboard

#### Index

Halaman ini bisa diakses oleh siapapun tanpa perlu login ataupun melakukan registrasi akun.

**Endpoint** : POST `/api/v1/dashboard`

**Request Body** : `{}`

**Request Header** : `{}`

**Response Body** :

```json
{
    "success": true,
    "message": "Hallo Ini Adalah Public Dashboard",
    "data": "Selamat Datang Di API Yatech Studio (PT. Generasi Emas Persada)"
}
```

#### Data

Halaman ini hanya bisa diakses oleh user yang sudah melakukan registrasi dan login.

**Endpoint** : POST `/api/v1/dashboard/data`

**Request Headers** :

```json
{
    "Authorization": "Bearer ACCESS_TOKEN"
}
```

**Request Body** : `{}`

**Response Body** :

```json
{
    "success": true,
    "message": "Dashboard Data",
    "data": "Dashboard ini bersifat rahasia dan hanya bisa diakses oleh user yang sudah login"
}
```

### API User

#### Register

Halaman ini hanya bisa diakses oleh user yang sudah logout, jika user masih ter-login user tidak akan bisa mengakses halaman ini. User yang akan mendaftar perlu menyiapkan username dan email yang unik. Password setidaknya harus terdiri 1 Huruf Besar, 1 Huruf kecil, 1 Karakter, 1 Angka, dan minimal 8 karakter.

**Endpoint** : POST `/api/v1/user/register`

**Request Headers** : `{}`

**Request Body** :

```json
{
    "username": "some_username",
    "password": "$0M3_password",
    "email": "some_username@gmail.com"
}
```

**Success Response Body** :

```json
{
    "success": true,
    "message": "Register success",
    "data": {
        "username": "some_username",
        "email": "some_username@gmail.com",
        "emailIsVerified": false,
        "accountIsVerified": false
    }
}
```

**Failed Response Body** :

```json
{
    "success": false,
    "message": "Error message",
    "data": null
}
```

#### Login

Halaman ini digunakan untuk mendapatkan access token beserta refresh token. Pengguna harus ter-logout terlebih dahulu.

**Endpoint** : POST `/api/v1/user/login`

**Request Headers** : `{}`

**Request Body** :

```json
{
    "username": "some_username",
    "password": "$0M3_password"
}
```

**Success Response Body** :

```json
{
    "success": true,
    "message": "Loggin success",
    "data": {
        "username": "some_username",
        "refreshToken": "some string",
        "accessToken": "some string"
    }
}
```

**Failed Response Body** :

```json
{
    "success": false,
    "message": "Error message",
    "data": null
}
```

#### Logout

Halaman ini digunakan untuk menghapus refresh token dari database. User harus login terlebih dahulu sebelum mengakses fitur ini.

**Endpoint** : POST `/api/v1/user/logout`

**Request Headers** :

```json
{
    "Authorization": "Bearer ACCESS_TOKEN"
}
```

**Request Body** :

```json
{
    "refreshToken": "REFRESH TOKEN"
}
```

**Success Response Body** :

```json
{
    "success": true,
    "message": "Logout success",
    "data": {
        "user": {
            "username": "some_username",
            "id": "user-id-uuid"
        }
    }
}
```

**Failed Response Body** :

```json
{
    "success": false,
    "message": "Error message",
    "data": null
}
```

#### Logout

Access token hanya berusia 30s (agar tidak perlu menunggu terlalu lama). Untuk bisa mengakses `/api/v1/dashboard/data` pengguna harus memiliki access token. Access token bisa didapatkan menggunakan tautan berikut ini.

**Endpoint** : POST `/api/v1/user/token`

**Request Headers** : `{}`

**Request Body** :

```json
{
    "refreshToken": "REFRESH TOKEN"
}
```

**Success Response Body** :

```json
{
    "success": true,
    "message": "Logout success",
    "data": {
        "accessToken": "Some String Of Access Token"
}
```

**Failed Response Body** :

```json
{
    "success": false,
    "message": "Error message",
    "data": null
}
```
