<?php
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    if (isset($_POST["name"]) && isset($_POST["Email"]) && isset($_POST["tel"]) && isset($_POST["date"]))
    {
        echo "<h1>Hello Mr <span style='color: red;'>".$_POST["name"]."</span></h1>";
        echo "
        <table style='border: 1px solid;'>
        <thead >
            <tr style='border: 1px solid;'>
                <th style='border: 1px solid;'> Email</th>
                <th style='border: 1px solid;'> Date de naissance     </th>
                <th style='border: 1px solid;'> telephone</th>
            </tr>
        </thead>
        <tbody>
            <tr >
                <td style='border: 1px solid;'> ".$_POST["Email"]."</td>
                <td style='border: 1px solid;'>".$_POST["date"]."</td>
                <td style='border: 1px solid;'>".$_POST["tel"]."</td>
            </tr>
        </tbody>
        </table>";

        // echo $_POST["Email"];
        // echo $_POST["tel"];
        // echo $_POST["date"];
    }
    else {
        echo "EROOOOOOOOOR";
    }
}
else {
    echo "request eroooor";
}

?>