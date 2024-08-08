<?php
$conn = mysqli_connect("localhost", "root", "", "cactus_website");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!empty($email) && !empty($password)) {
        if ($email == 'admin@gmail.com' && $password == 'admin') {
            header("Location: admin.html");
            die;
        } else {
            $query = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
            $result = mysqli_query($conn, $query);

            if ($result) {
                if ($result && mysqli_num_rows($result) > 0) {
                    $user_data = mysqli_fetch_assoc($result);

                    if ($user_data['password'] == $password) {
                        header("Location: home.html");
                        die;
                    }
                }
            }
            echo "<script type='text/javascript'>alert('Wrong username or password');</script>";
        }
    } else {
        echo "<script type='text/javascript'>alert('Please fill in both fields');</script>";
    }
}
?>
