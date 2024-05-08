# Setup database

1. Create user and database for had project

```sql
CREATE USER 'had_user'@'localhost' IDENTIFIED BY 'had_user';
GRANT ALL PRIVILEGES ON *.* TO 'had_user'@'localhost' WITH GRANT OPTION;
CREATE DATABASE reception_db;
```

2. Enter MySQL as had_user

```bash
mysql -u had_user -p
# password is had_user
```

3. See data

```sql
SHOW DATABASES;
USE had_db;
SHOW TABLES;
SELECT * FROM patient;
```

# Start frontend

1. Install ionic-react
2. Start frontend server

```bash
ionic serve
```

# Forms in Ionic

* [Forms And Validation In Ionic React — Smashing Magazine](https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/)
* [control](https://react-hook-form.com/docs/useform/control)
* [Controller](https://react-hook-form.com/docs/usecontroller/controller)







## How to add a doctor encounter in IPD?

Get all the data from form -> namely

prescription data
medicine data

Add prescription Data to prescription table and get the id
Add medicine data to medicine table and get the id
Add the prescriptionId and medicineId to another join table
Add the doctor encounter to Doctor Encounter table