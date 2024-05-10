# Felhők hálózati szolgáltatásai laboratórium nagy házi

[![Actions Status](https://github.com/ironhamma/felholabor-nagyhf/workflows/Test,%20build%20and%20release/badge.svg)](https://github.com/ironhamma/felholabor-nagyhf/actions)

A nagyházi feladat egy CI/CD környezet létrehozása és ennek használatával egy olyan web szolgáltatás létrehozása, amely az alábbi funkciókat látja el:

- Kép és hozzá tartozó leírás feltöltése (kép és leírás páros tárolás)
- A feltöltött képen automatikus autó detektálás és a megtalált autók bekeretezésével a kép megjelenítése a weboldalon
- A weboldal “üzemeltetői” képesek legyenek feliratkozni az oldalra, azaz kapjanak értesítést az összes eddigi és az új feltöltött képekről úgy, hogy kiküldésre kerül számukra a képhez tartozó leírás és a rendszer által detektált autók száma a feltöltött képen

### A megoldásom:

A házi feladat megoldásom 5 komponenst használ, melyek:

- Python Flask API: Az autó detektálás megvalósításához
- Node.js API: A képfeltöltéshez és a képek kilistázásához
- MySQL adatbázis: A képek és a hozzájuk kapcsolódó adatok tárolásához
- React frontend: A weboldal felhasználói felületének megjelenítéséhez
- RabbitMQ Message Queue: A feliratkozott adminisztrátorok számára történő emailek kiküldéséhez 

## Lokális használat

1. A `frontend` és `backend` mappákban az `npm install` parancs futtatása
2. A `detection` mappában a `pip install -r requirements.txt` parancs futtatása
3. A `frontend` és `backend` mappákban a `.env.example` fájl alapján egy `.env` fájl létrehozása
4. A `mq` mappában a Dockerfile buildelése és elindítása
5. A `detection` mappában a `python detection.py` parancs futtatása
6. MySQL adatbázis indítása, amely tartalmaz egy `labor_hf` nevű táblát
7. A `backend` mappában az `npm run dev` parancs futtatása
8. A `frontend` mappában az `npm run dev` parancs futtatása
9. Ezen a ponton a detection API, a node.js backend és a frontend is el kellett induljon, a frontend elérhető a `http://localhost:5173/` URL-en


## Lokális konténerizált használat

1. A `root` mappában a Dockerfile buildelése a `docker build -f ./frontend/Dockerfile -t labor-frontend .`˙ parancs futtatásával
2. A `root` mappában a Dockerfile buildelése a `docker build -f ./backend/Dockerfile -t backend .` parancs futtatásával
3. A `root` mappában a Dockerfile buildelése a `docker build -f ./detection/Dockerfile -t detection .` parancs futtatásával
3. A `root` mappában a Dockerfile buildelése a `docker build -f ./db/Dockerfile -t db .` parancs futtatásával
4. A `root` mappában a Dockerfile buildelése a `docker build -f ./mq/Dockerfile -t labor-mq .` parancs futtatásával
5. A `dev` könyvtárban a `docker-compose up -d` parancs futtatása
6. Pár példa kép található a `dev/examples` mappában


## CI/CD használata
A kódban történő módosítás után PUSH eseményre lefut a `Test, build and release` Github Actions workflow

A workflow lépései:
- Tesztek futtatása
- Build
- - Docker image-ek készítése a `detection`, `mq`, `db`, `backend` és `frontend` könyvtárakban található Dockerfile alapján
- - Docker image-ek feltöltése a projekthez tartozó Dockerhub repository-ba, a commithoz tartozó hash-t használva tag-ként
- Deploy
- - ArgoCD-ben alkalmazás létrehozása, amely a repo-t targeteli.
- - `Values.yaml`-ben a `mailUser` és `mailPassword` paraméterek megadása. (Itt a rendszer egy Gmail-es email címet és egy Gmail alkalmazás tokent vár)
- - Tunnel indítása a frontend számára a `minikube service -n argo-hf-ns frontend`
- - Ha a frontend nem érné el a backendet a `kubectl port-forward service/backend -n argo-hf-ns 5000:5000` parancs futtatásával kiajánlható localhost-ra a backend és úgy már biztosan el fogja érni

## Verzió követelmények lokális használatra
- Node.js v18.0.0 or higher
- Python 3.7.9 or higher
- npm package manager
- mysql
- RabbitMQ szerver (vagy Dockerben való futtatása a repo-ban lévő image alapján)