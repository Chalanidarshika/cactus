<?php
    $conn = mysqli_connect("localhost","root","","cactus_website");
    
    
    $username=$_POST['username'];
    $email=$_POST['email'];
    $password=$_POST['password'];

    if(!empty($email) && !empty($password) ){
    $data="INSERT INTO users VALUES('','$username','$email','$password')";
    $check = mysqli_query($conn,$data);
    
    echo"<script type='text/javascript'> alert('Successfully Registered')</script>";
    header("location:login.html");
    }
    else{
        echo"<script type='text/javascript'> alert('Please enter some valid information')</script>";   
    }

    
?>