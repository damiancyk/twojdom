<html>
<head>
<title>twojdom.pl - projekt</title>
<link rel="stylesheet" type="text/css" href="style.css" />
</head>
<?php
function connect(){
	$link = mysql_connect('localhost','root','');
	mysql_select_db('baza_twojdom',$link);
}

function showData(){
$query="SELECT * FROM `Dom` WHERE Id_Dom=".$_GET['Id_Dom'];

    $result = mysql_query($query)
        or die('Error (query)');
    if (mysql_num_rows($result) > 0) {        
        while ($r = mysql_fetch_object($result)) {
		echo "<table>";
		echo "<th colspan=2> <h1> $r->Nazwa</h1> </th>";
            echo "<tr>";
            echo "<td><img src='../model/$r->Id_Dom/preview.jpg' </td>";
			echo "<td><i>cena: </i> $r->Cena <br><i>kondygnacji: </i>$r->Kondygnacji   <i>powierzchnia: </i>$r->Powierzchnia<br><i>jednorodzinny: </i>$r->Jednorodzinny</td>";
            echo "</tr>";
			echo "<th colspan=2><h2>$r->Opis";
			?>
			<br/>
			<input type="button" value="galeria zdjêæ" onclick="window.location='/twojdom/document/galeria.php?Id_Dom=<?php echo $_GET['Id_Dom'] ?>'">
			<input type="button" value="z³ó¿ zamówienie" onclick="window.location='/twojdom/document/zamowienie.php?Id_Dom=<?php echo $_GET['Id_Dom'] ?>'">
			<?php
			echo "</th></table>";
        }
    }
	}
?>

<?php include 'header.php'; ?>
<body onload="webGLStart();">
<div id="description">
<div id="vieww">
<?php
if(file_exists("../model/".$_GET['Id_Dom']."/wall.js")){

$id=$_GET['Id_Dom'];
echo "<a href='projekt.php?Id_Dom=$id'> KLIKNIJ!!";
echo "<img src='../image/3D.gif'>";
echo "</a>";
}
?>
</div>

	<?php
		connect();
		showData();
	?>
	
<br/>
		<input type=button name=backButton value="<-powrot" onclick="javascript:history.back()">

<br/>

    <img src="../model/<?php echo $_GET['Id_Dom'] ?>/gallery/1.jpg">

	
	</div>

</body>
</html>
<?php include 'footer.php'; ?>
