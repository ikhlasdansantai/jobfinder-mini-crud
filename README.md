# Jobfinder
![tugas_dua_done](https://github.com/ikhlasdansantai/jobfinder-mini-crud/assets/95151018/890b309e-bdb2-419e-bed7-3090421cb416)
![tugas_dua](https://github.com/ikhlasdansantai/jobfinder-mini-crud/assets/95151018/fbad2ec4-090c-4e62-9a05-7687218b2e73)

Website ini meliputi beberapa fitur MVP, khususnya **CRUD**, disini kita mendemokan sebagi admin, yang bisa membuat program kerja, mengedit program kerja, dan menghapus program kerja.

Mohon maaf jika ada yang masih belum mobile friendly:v, mengingat fitur utama yang ingin ditonjolkan pada web ini adalah CRUD nya saja.

## Endpoint
ada beberapa point, yang ingin saya sampaikan, jangan lupa model dari id `JobProgram`, diganti jadi `cuid` aja, klo `uuid` agak susah dibacanya:V  

GET /api/user/programs
- Mendapatkan semua data programs
GET /api/user/program/:id
- Mendapatkan data program secara spesifik

POST /api/user/program
- membuat program baru, mengingat karena untuk handle user nya masih statis, dan hanya 1 user yang tersedia, sehingga userId nya dikirim secara statis seperti ini
request body:
```json
{
    "name": string,
    "description": string,
    "userId": "1b0363fa-922f-4a38-beeb-083817495be7",
    "location": string?
    "image": string?
}
```

PATCH /api/user/program/:id
- mengedit program berdasarkan id dari parameter url
```json
{
    "name": string,
    "description": string,
    "userId": "1b0363fa-922f-4a38-beeb-083817495be7",
    "location": string?
}
```

PUT /api/user/program/:id
- mengedit program berdasarkan id dari parameter url (menambal semua data objek nya, semua request body harus terpenuhi)
```json
{
    "name": string,
    "description": string,
    "userId": "1b0363fa-922f-4a38-beeb-083817495be7",
    "location": string,
    "image": string
}
```

DELETE /api/user/program/:id
- menghapus program berdasarkan id dari parameter url

ENV file:
```env
DATABASE_URL=
```

teknologi yang digunakan: 
- NextJS + Typescript
- Tailwindcss
- Shadcn
- Prisma + Postgresql
