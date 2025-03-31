<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
// $str = "200,150.00MAD";
// $i = 0;
// while(isset($str[$i])) {
//     if (preg_match('/[0-9.,]/', $str[$i])) {
//         print $str[$i];
//     }
//     $i = $i + 1;
// }

$str2 = 'abcde$ddfd @abcd )66der]';
$i = 0;
while(isset($str2[$i])) {
    if (preg_match('/[A-Za-z0-9\s]/', $str2[$i])) {
        print $str2[$i];
    }

    $i = $i + 1;
}
?>
</body>
</html>