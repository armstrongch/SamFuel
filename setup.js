//cd c:/users/chris/documents/html/samfuel

var doneProcessing = false;
var regularValue = 0;
var dieselValue = 0;

function setup()
{
	const Http = new XMLHttpRequest();
	const url= getRequest();
	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange = (e) => {
	  processResult(Http.responseText);
	}
}

function processResult(responseText)
{
	if (responseText.length > 0)
	{
		var obj = JSON.parse(responseText);
		
		var eastCoast = obj.response.data.filter(d => d['area-name'] == "PADD 1");
		
		var regularGas = eastCoast.filter(d => d['product-name'] == "Regular Gasoline");
		var diesel = eastCoast.filter(d => d['product-name'] == "No 2 Diesel");
		
		regularValue = Number.parseFloat(regularGas[0]['value']);
		dieselValue = Number.parseFloat(diesel[0]['value']);
		
		if (!doneProcessing) { loadContent(); }
		
	}
}

function loadContent()
{
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	
	$('#loadingP').css('display', 'none');
	$('#dataDiv').css('display', 'block');
	$('#regularPrice').html(`Average Price of Regular Gas in New England last month: ${USDollar.format(regularValue)}`);
	$('#dieselPrice').html(`Average Price of Diesel in New England last month: ${USDollar.format(dieselValue)}`);

	loadTable();
	
	doneProcessing = true;
	
}

function loadTable()
{
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	
	var mpw = Number.parseInt($('#mpwInput')[0].value);
	var mpy = mpw*52;
	
	$('#vehicleTable').html(`<thead><tr><th>Vehicle</th><th>AverageMPG</th><th>MilesperWeek,Year</th><th>GasType</th><th>GasPrice</th><th>YearlyCost</th></tr></thead><tbody></tbody>`);
	
	/*<p>New Vehicle Name: <input id='nv_nameInput'></p>
	<p>New Vehicle MPG: <input id='nv_mpgInput' ></p>
	<p>New Vehicle Fuel Type:
		<select id='nv_fuelTypeSelect'>
			<option value="0">Regular</option>
			<option value="1">Diesel</option>
		</select>
	</p>*/
	
	var newVehicle_hasName = $('#nv_nameInput')[0].value != "";
	var newVehicle_hasValid
	
	for (var i = 0; i < vehicles.length; i += 1)
	{
		var gasTypeName = "Regular";
		var gasPrice = regularValue;
		
		if (vehicles[i].fuel_type == fuel_types.DIESEL)
		{
			gasTypeName = "Diesel";
			gasPrice = dieselValue;
		}
		
		var yearlyGallons = mpy / vehicles[i].mpg;
		var yearlyCost = yearlyGallons * gasPrice;
		

		$('#vehicleTable > tbody:last-child').append(`<tr>
			<td>${vehicles[i].name}</td>
			<td>${vehicles[i].mpg}</td>
			<td>${mpw}, ${mpy}</td>
			<td>${gasTypeName}</td>
			<td>${USDollar.format(gasPrice)}</td>
			<td>${USDollar.format(yearlyCost)}</td>
		</tr>`);	
	}
	
}
