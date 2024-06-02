<?php
    // Подключение к базе данных (замените параметры подключения на ваши)
    $servername = "localhost";
    $username = "root";
    $password = "admin_10052024";
    $dbname = "random_numbers";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
