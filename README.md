# web-pentesting-demo-app
This web application has been developed to demonstrate possible vulnerabilities of web applications and to compare tools for pentesting.


## Included vulnerabilities
- Modification of Transferred Data
- Unpublished Web Page
- SQL Injection
- XSS (Reflected & Stored)
- Possible Username enumeration
- Possible Username and Password Brute-Force
- Outdated Hashing Functions for Passwords
- Upload with Path Traversal

## Deployment (docker-compose)
1. Clone repository with ``git clone https://github.com/pentest-tool-comparison/demo-app.git``
2. Navigate to the directory
3. Run ``docker-compose up`` (If it fails on first start, try restarting it)
4. Open your Web Browser and navigate to http://localhost:3000

## Deployment (manual)
1. Clone repository with ``git clone https://github.com/pentest-tool-comparison/demo-app.git``
2. Navigate to the directory and run ``npm install``
3. Build and run Database by executing 
```
docker build -t demo-app-db ./mysql
docker run --name demo-app-db -p 3306:3306 -d demo-app-db
```
4. Start web-app ``npm run start``
5. Open your Web Browser and navigate to http://localhost:3000

## Miscellaneous
- The default data inside the database is set inside the file: ``./mysql/2_default_data.sql``. All user accounts with their according password can be found here.
- The default database password for the user "demo-app" is "12345678". It can be changed in the file ``./mysql/0_init.sql`` and by setting the environment variable "DB_PASSWORD" in ``./Dockerfile``.