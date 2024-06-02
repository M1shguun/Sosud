<?php
require_once "connect.php";
$randomNumber = rand(1, 9);
$sql_first_num = "SELECT first_num FROM `numbers` WHERE ID = '$randomNumber'";
$sql_second_num = "SELECT second_num FROM `numbers` WHERE ID = '$randomNumber'";
$sql_third_num = "SELECT third_num FROM `numbers` WHERE ID = '$randomNumber'";

$result_first_num = $conn->query($sql_first_num);
$result_second_num = $conn->query($sql_second_num);
$result_third_num = $conn->query($sql_third_num);

if ($result_first_num->num_rows > 0) {
    $row_1 = $result_first_num->fetch_assoc();
    $first_num = $row_1['first_num'];
}
if ($result_second_num->num_rows > 0) {
    $row_2 = $result_second_num->fetch_assoc();
    $second_num = $row_2['second_num'];
}
if ($result_third_num->num_rows > 0) {
    $row_3 = $result_third_num->fetch_assoc();
    $third_num = $row_3['third_num'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задачі на переливання</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&display=swap" rel="stylesheet">
</head>
<body>
<main>
<header class="section coral">
    Як маючи лише дві ємності <?php echo $first_num; ?>л і <?php echo $second_num; ?>л відміряти <?php echo $third_num; ?>л води?
    <button class="reload-btn" onclick="resetLogAndReload()">
        <i class="material-icons">refresh</i>
    </button>
    <button id="stepBackBtn" class="step-back-btn">Крок назад</button>
    <button id="nextBtn" class="next-btn">Наступна Задача</button>
</header>

    
    <div class="parent">
        <div class="left-side section blue">
            <table>
                <thead>
                    <tr>
                        <th>Ємність 1 (<?php echo $first_num; ?>л)</th>
                        <th>Ємність 2 (<?php echo $second_num; ?>л)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="container">
                                <div class="jug1">
                                <div id="water1" class="liquid" style="height: 0;"></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="container">
                            <div class="jug2">
                                <div id="water2" class="liquid" style="height: 0;"></div>
                            </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <main class="section green">
                <a href="#" onclick="fillContainer1()"><span>Наповнити ємність 1</span></a>
                <a href="#" onclick="fillContainer2()"><span>Наповнити ємність 2</span></a>
                <a href="#" onclick="emptyContainer1()"><span>Спустошити ємність 1</span></a>
                <a href="#" onclick="emptyContainer2()"><span>Спустошити ємність 2</span></a>
                <a href="#" onclick="pourContainer1To2()"><span>Перелити із 1 -> 2</span></a>
                <a href="#" onclick="pourContainer2To1()"><span>Перелити із 2 -> 1</span></a>
        </main>
        <div class="right-side section yellow">
            <div class="scroll">
                <h3>Історія Змін:</h3>
                <table id="logTable">
                    <thead>
                        <tr>
                            <th>Крок</th>
                            <th>Дія</th>
                            <th>Ємність 1</th>
                            <th>Ємність 2</th>
                        </tr>
                    </thead>
                    <tbody id="logBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script>
    var firstNum = <?php echo json_encode($first_num); ?>;
    var secondNum = <?php echo json_encode($second_num); ?>;
    var thirdNum = <?php echo json_encode($third_num); ?>;
    </script>
<script src="script.js"></script>
</main>
</body>
</html>
