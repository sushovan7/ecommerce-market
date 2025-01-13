export const welcomeEmail = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            color: #4caf50;
            font-size: 24px;
            font-weight: bold;
            padding: 10px 0;
        }
        .content {
            text-align: center;
            font-size: 16px;
            color: #555;
            padding: 10px 20px;
        }
        .otp {
            display: inline-block;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            color: #333;
            padding: 10px 20px;
            border: 1px dashed #4caf50;
            background-color: #f7fdf7;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 20px;
        }
        .footer a {
            color: #4caf50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Welcome to BuyNova!
        </div>
        <div class="content">
            <p>Hi [User's Name],</p>
            <p>Thank you for joining BuyNova! To start exploring amazing deals and products, please verify your email address using the OTP below:</p>
            <div class="otp">[OTP_CODE]</div>
            <p >This OTP is valid for 15 minutes.</p>
            <p>If you didn’t request this email, please ignore it.</p>
        </div>
        <div class="footer">
            <p>Need help? <a href="[Support Link]">Contact Us</a></p>
        </div>
    </div>
</body>
</html>

`;

export const verifyEmail = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            color: #4caf50;
            font-size: 24px;
            font-weight: bold;
            padding: 10px 0;
        }
        .content {
            text-align: center;
            font-size: 16px;
            color: #555;
            padding: 10px 20px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 20px;
        }
        .footer a {
            color: #4caf50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Email Verified Successfully!
        </div>
        <div class="content">
            <p>Hi [User's Name],</p>
            <p>We’re excited to let you know that your email has been successfully verified. Welcome to BuyNova!</p>
            <p>You can now explore the latest deals, shop for your favorite products, and enjoy seamless shopping.</p>
            <p>If you have any questions or need assistance, feel free to visit our <a href="[Support Link]">Support Center</a>.</p>
        </div>
        <div class="footer">
            <p>Thank you for choosing BuyNova!</p>
        </div>
    </div>
</body>
</html>

`;

export const resetPasswordOtp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset OTP Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            color: #4caf50;
            font-size: 24px;
            font-weight: bold;
            padding: 10px 0;
        }
        .content {
            text-align: left;
            font-size: 16px;
            color: #555;
            padding: 10px 20px;
        }
        .otp {
            display: inline-block;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            color: #333;
            padding: 10px 20px;
            border: 1px solid #4caf50;
            background-color: #f7fdf7;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 20px;
        }
        .footer a {
            color: #4caf50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Reset Your OTP Password
        </div>
        <div class="content">
            <p>Hi [User's Name],</p>
            <p>We received a request to reset your OTP password. Please use the following OTP to reset your password:</p>
            <div class="otp">[OTP_CODE]</div>
            <p>This OTP is valid for 15 minutes. If you didn’t request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Need help? <a href="[Support Link]">Contact Us</a></p>
        </div>
    </div>
</body>
</html>
`;
