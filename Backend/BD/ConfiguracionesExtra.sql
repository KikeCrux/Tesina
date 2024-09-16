ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sandia2016.!';
FLUSH PRIVILEGES;

SELECT user, host, plugin FROM mysql.user;
