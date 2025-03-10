<?php
session_start();
    $error = '';
    if (!empty($_SESSION['login'])) {
        header('Location: welcome.php');
    }
 if (!empty($_POST['username']) && !empty($_POST['password'])) {
    $login = $_POST['username'];
    $password = $_POST['password'];
    if ($login == 'admin' && $password == '123') {
        $_SESSION['login'] = $login;
        header('Location: welcome.php');
        die();
    } else{
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
