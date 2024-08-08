<?php
$conn = mysqli_connect("localhost", "root", "", "cactus_website");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productname = $_POST['productname'] ?? '';
    $price = $_POST['price'] ?? '';
    $quantity = $_POST['quantity'] ?? '';
    $file = $_POST['file'] ?? '';

    if (!empty($productname) && !empty($price) && !empty($quantity) && !empty($file)) {
        $data = "INSERT INTO product (ProductName, Price, Quantity, image) VALUES ('$productname', '$price', '$quantity', '$file')";
        $check = mysqli_query($conn, $data);

        if ($check) {
            header("Location: admin.html");
            exit();
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    } else {
        echo "<script type='text/javascript'>alert('Please submit again');</script>";
    }
}

// Fetching reviews
$select = mysqli_query($conn, "SELECT email, feedback FROM feedback");

if (mysqli_num_rows($select) > 0) {
    echo "<table>";
    echo "<thead><tr><th>Email</th><th>Feedback</th></tr></thead>";
    echo "<tbody>";
    while ($row = mysqli_fetch_assoc($select)) {
        echo "<tr><td>" . $row['email'] . "</td><td>" . $row['feedback'] . "</td></tr>";
    }
    echo "</tbody></table>";
} else {
    echo "<p>No reviews found</p>";
}
?>
