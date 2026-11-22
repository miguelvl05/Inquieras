# Inquieras

Aplicación web con **Django + Django REST Framework** (backend), **React + Vite** (frontend) y **MySQL en Railway** (base de datos), todo levantado con **Docker Compose**.

```
inquieras/
├── backend/            # Django (proyecto "config", app "core")
├── frontend/           # React + Vite
├── docker-compose.yml
├── .env.example        # Plantilla de variables (el .env real NO se sube)
└── README.md
```

## Requisitos

- Docker Desktop (con Docker Compose)
- Git
- Acceso a la base de datos MySQL del proyecto en Railway

No hace falta instalar Python ni Node en tu máquina: todo corre dentro de los contenedores.

## Puesta en marcha (primera vez)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/<organizacion-o-usuario>/inquieras.git
   cd inquieras
   ```
2. Crear tu archivo de entorno a partir de la plantilla y llenarlo con los datos que comparte el equipo (por un canal privado, nunca por GitHub):
   ```bash
   cp .env.example .env
   ```
3. Construir y levantar:
   ```bash
   docker compose up --build
   ```
4. Aplicar migraciones (en otra terminal, solo la primera vez o cuando haya migraciones nuevas):
   ```bash
   docker compose exec backend python manage.py migrate
   ```
5. Abrir:
   - Frontend: http://localhost:5173 (muestra si el backend y la base de datos responden)
   - API: http://localhost:8000/api/health/
   - Admin de Django: http://localhost:8000/admin/

## Base de datos en Railway

En el servicio MySQL de Railway, pestaña **Variables** o **Connect**, copien la conexión **pública** (`MYSQL_PUBLIC_URL`, host del tipo `xxxx.proxy.rlwy.net`). La interna (`mysql.railway.internal`) solo funciona entre servicios desplegados dentro de Railway, no desde sus computadores.

Pueden ponerla completa en `DATABASE_URL` (formato `mysql://usuario:clave@host:puerto/base`) o por partes en `DB_HOST`, `DB_PORT`, etc.

⚠️ Como todos comparten la misma base de datos, **coordinen las migraciones**: no hagan `migrate` con migraciones de una rama que todavía no se ha fusionado a `develop`.

## Comandos útiles

| Acción | Comando |
|---|---|
| Levantar todo | `docker compose up` |
| Levantar en segundo plano | `docker compose up -d` |
| Ver logs | `docker compose logs -f backend` |
| Detener | `docker compose down` |
| Crear superusuario | `docker compose exec backend python manage.py createsuperuser` |
| Crear una app de Django | `docker compose exec backend python manage.py startapp nombre_app` |
| Crear migraciones | `docker compose exec backend python manage.py makemigrations` |
| Aplicar migraciones | `docker compose exec backend python manage.py migrate` |
| Shell de Django | `docker compose exec backend python manage.py shell` |
| Instalar paquete de npm | `docker compose exec frontend npm install nombre-paquete` |

**Al agregar dependencias:** en Python, agréguenla a `backend/requirements.txt`; en Node, instálenla con el comando de la tabla (actualiza `package.json` y `package-lock.json`). En ambos casos, quien baje esos cambios debe correr `docker compose up --build` (en el frontend, si no ve el paquete: `docker compose down -v && docker compose up --build`).

## Flujo de trabajo en Git

- `main`: versión estable. Nadie hace push directo.
- `develop`: integración del equipo. Nadie hace push directo.
- Ramas de trabajo desde `develop`, una por historia de usuario o tarea:
  `feature/hu-01-catalogo-productos`, `fix/login-google`, etc.

Ciclo de cada tarea:

```bash
git checkout develop
git pull
git checkout -b feature/hu-xx-descripcion
# ... trabajar y hacer commits pequeños ...
git push -u origin feature/hu-xx-descripcion
```

Luego abrir un **Pull Request hacia `develop`** en GitHub, pedir revisión a un compañero y fusionar cuando esté aprobado.

Mensajes de commit sugeridos: `feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`, `chore: ...`.
