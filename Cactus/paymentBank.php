<?php
    $conn = mysqli_connect("localhost","root","","cactus_website");

    $fullname=$_POST['fullname'];
    $address=$_POST['address'];
    $phoneno=$_POST['phoneno'];
    $postcode=$_POST['postcode'];
    $file=$_POST['file'];

    if(!empty($fullname) && !empty($address) ){
        $data="INSERT INTO bank VALUES('',' $fullname','$address','$phoneno',' $postcode','$file')";
        $check = mysqli_query($conn,$data);

        echo"<script type='text/javascript'> alert('Successfully submitted')</script>";
        header("location:placeorder.html");
    }
    else{
        echo"<script type='text/javascript'> alert('Please enter some valid informations')</script>";
    }
?>