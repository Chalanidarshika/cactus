<?php
    $conn = mysqli_connect("localhost","root","","cactus_website");

    $email=$_POST['email'];
    $feedback=$_POST['feedback'];

    if(!empty($email) && !empty($feedback) ){
        $data="INSERT INTO feedback VALUES('','$email','$feedback')";
        $check = mysqli_query($conn,$data);
        header("location:contactus.html");

        echo"<script type='text/javascript'> alert('Successfully submitted')</script>";
        
    }
    else{
        echo"<script type='text/javascript'> alert('Please enter some valid informations')</script>";
    }
?>