# Explore Caravan Parks

Aplikasi Node.js berorientasi layanan untuk explore caravan dan campervan parks.

---

## Prasyarat
- [Node.js](https://nodejs.org/) 
- [Docker](https://www.docker.com/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Cluster Kubernetes yang berjalan] (misal: Minikube, Docker Desktop, dll.)

---

## 1. Variabel Lingkungan
Buat file `.env` di root proyek:
```
DB_NAME=soa_explore_caravan_parks
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_PREFIX=mysql
PORT=3000
```

---

## 2. Jalanin apps menggunakan docker

1. **Buat `docker-compose.yml`**:
    ```yaml
    version: '3.8'
    services:
      mysql:
        image: mysql:5.7
        container_name: caravan-mysql
        environment:
          MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
          MYSQL_DATABASE: soa_explore_caravan_parks
        ports:
          - "3306:3306"
        volumes:
          - mysql-data:/var/lib/mysql

      app:
        build: .
        container_name: caravan-app
        ports:
          - "3000:3000"
        env_file:
          - .env
        depends_on:
          - mysql

    volumes:
      mysql-data:
    ```

2. **Jalankan servicenya:**
    ```sh
    docker-compose up --build
    ```

3. **Import database:**
    ```sh
    docker cp soa_explore_caravan_parks.sql caravan-mysql:/tmp/
    docker exec -it caravan-mysql bash
    mysql -u root soa_explore_caravan_parks < /tmp/soa_explore_caravan_parks.sql
    exit
    ```

4. **Akses aplikasi:**
    - Buka [https://localhost:3000](https://localhost:3000) (terima peringatan sertifikat self-signed)

---

## 3. Menjalankan dengan Docker Saja

1. **Build image aplikasi:**
    ```sh
    docker build -t caravan-app:latest .
    ```
2. **Jalankan MySQL:**
    ```sh
    docker run --name caravan-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e MYSQL_DATABASE=soa_explore_caravan_parks -p 3306:3306 -d mysql:5.7
    ```
3. **Jalankan aplikasi:**
    ```sh
    docker run --name caravan-app --link caravan-mysql:mysql -p 3000:3000 --env-file .env caravan-app:latest
    ```
4. **Import database:**
    ```sh
    docker cp soa_explore_caravan_parks.sql caravan-mysql:/tmp/
    docker exec -it caravan-mysql bash
    mysql -u root soa_explore_caravan_parks < /tmp/soa_explore_caravan_parks.sql
    exit
    ```
5. **Akses aplikasi:**
    - Buka [https://localhost:3000](https://localhost:3000)

---

## 4. Menjalankan di Kubernetes

1. **Apply manifest Kubernetes:**
    ```sh
    kubectl apply -f k8s/mysql-pvc.yaml
    kubectl apply -f k8s/configmap.yaml
    kubectl apply -f k8s/secret.yaml
    kubectl apply -f k8s/mysql-deployment.yaml
    kubectl apply -f k8s/mysql-service.yaml
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    ```
2. **Tunggu pod berjalan:**
    ```sh
    kubectl get pods
    # mysql dan caravan-app harus 1/1 Running
    ```
3. **Import database:**
    ```sh
    kubectl get pods # CAri nama podnya sql
    kubectl cp soa_explore_caravan_parks.sql <mysql-pod-name>:/tmp/soa_explore_caravan_parks.sql
    kubectl exec -it <mysql-pod-name> -- /bin/bash
    mysql -u root soa_explore_caravan_parks < /tmp/soa_explore_caravan_parks.sql
    exit
    ```
4. **Port-forward untuk akses aplikasi:**
    ```sh
    kubectl port-forward svc/caravan-app 3000:3000
    ```
    - Buka [https://localhost:3000](https://localhost:3000) (terima peringatan sertifikat self-signed)

---

## 5. Sertifikat SSL
- Aplikasi menggunakan HTTPS secara default. Untuk pengembangan lokal, sertifikat self-signed digunakan (lihat folder `ssl/`).
- Jika perlu membuat sertifikat baru, gunakan `mkcert.exe` atau alat serupa.

---

## 6. Troubleshooting
- Jika halaman kosong atau koneksi reset, cek log pod/container:
    - Docker: `docker logs <container-name>`
    - Kubernetes: `kubectl logs <pod-name>`
- Pastikan MySQL berjalan dan database sudah diimport.
- Gunakan `https://` (bukan `http://`) untuk mengakses aplikasi.

---
