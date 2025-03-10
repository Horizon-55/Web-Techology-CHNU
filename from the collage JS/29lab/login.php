<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "webdevelopment";
    function GetQueryTables($servername, $username, $password, $dbname) {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname;", $username, $password);
        if (!$conn) {
            die("Помилка підключення: " . mysqli_connect_error());
        }
        // виконання запиту
        $query = "SELECT * FROM Login";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $desiredRow = $stmt->fetch(PDO::FETCH_ASSOC);
        return $desiredRow;
    };
    $desiredRow = GetQueryTables($servername, $username, $password, $dbname);
    // Перевірка на логін та пароль
    $error = '';
    if (!empty($_POST['username']) && !empty($_POST['password'])) {
        $login = $_POST['username'];
        $password = $_POST['password'];
        if ($desiredRow && $login === $desiredRow["login"] && $password === $desiredRow["password"]) {
            header('Location: welcome.php');
        } else {
            $error = 'Неправильний логін або пароль';
        }
    }
?> 
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style/style.css">
        <title>Login Page & Sing Up Form</title>
    </head>
    <body>
        <section class="wrapper">
            <div class="form singup">
                    <header>SingUp</header>
                    <form method="post">
                        <input type="hidden" name="opt" value="login">
                        <input type="text" placeholder="Full Name" required>
                        <input type="text" placeholder="Email Addreess" required>
                        <input type="password" placeholder="Password" required>
                        <div class="checkbox">
                            <input type="checkbox" id="singupCheck">
                            <label for="singupCheck">I accept all terms & condition</label>
                        </div>
                        <input type="submit" value="SingUp">
                    </form>
                </div>
                
                
                <div class="form login">
                    <header>Login</header>
                    <form method="post">
                        <input type="hidden" name="opt" value="login">
                        <input type="text" placeholder="Login" name="username" required>
                        <input type="password" placeholder="Password" name="password" required>
                        <a href="#">Fogot password?</a>
                        <input type="submit" value="Login">
                        <?=$error?>
                    </form>
                </div>
        </section>
    </body>
    <script src="js/script.js"></script>
    </html>
