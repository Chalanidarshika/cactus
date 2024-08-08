<?php
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "cactus_website");

if (!$conn) {
    echo json_encode(['error' => 'Failed to connect to database']);
    exit;
}

$select = mysqli_query($conn, "SELECT ProductName, Price, Quantity, image FROM product");

if (!$select) {
    echo json_encode(['error' => 'Error executing query']);
    exit;
}

$products = [];
while ($row = mysqli_fetch_assoc($select)) {
    $products[] = $row;
}

echo json_encode($products);

mysqli_close($conn);
