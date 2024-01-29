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
	$('#regularPrice').html(`Average Price of <strong>Regular</strong> Gas in New England last month: <strong>${USDollar.format(regularValue)}</strong>`);
	$('#dieselPrice').html(`Average Price of <strong>Diesel</strong> in New England last month: <strong>${USDollar.format(dieselValue)}</strong>`);

	loadTable();
	
	doneProcessing = true;
	
}

function newVehicle()
{
	var newVehicle_Name = $('#nv_nameInput')[0].value;
	var newVehicle_MPG = $('#nv_mpgInput')[0].value;
	var newVehicle_FuelType = fuel_types.GAS;
	if (parseInt($('#nv_fuelTypeSelect')[0].value) == "1")
	{
		newVehicle_FuelType = fuel_types.DIESEL;
	}
	
	var newVehicle_hasName = newVehicle_Name != "";
	var newVehicle_hasValidMPG = !isNaN(Number.parseFloat(newVehicle_MPG));
	var newVehicle_hasValidFuelType = !isNaN(Number.parseFloat(newVehicle_FuelType)) && (newVehicle_FuelType == 0 || newVehicle_FuelType == 1);
	
	if (newVehicle_hasName && newVehicle_hasValidMPG && newVehicle_hasValidFuelType)
	{
		return {
			valid: true,
			vehicle: new vehicle(newVehicle_Name, Number.parseFloat(newVehicle_MPG), newVehicle_FuelType)
		};
	}
	else
	{
		return { valid: false, vehicle: null };
	}
	
}

function changeNewVehicleInput()
{
	var newVehicleCheck = newVehicle();
	if (newVehicleCheck.valid)
	{
		loadTable();
	}
}	

function loadTable()
{
	$('#vehicleTable').html(`<thead><tr><th>Vehicle</th><th>Average MPG</th><th>Miles per Week,Year</th><th>Gas Type</th><th>Gas Price</th><th>Yearly Cost</th></tr></thead><tbody></tbody>`);
	
	for (var i = 0; i < vehicles.length; i += 1)
	{
		var v = vehicles[i];
		addVehicleToTable(v);
	}
	
	var newVehicleCheck = newVehicle();
	if (newVehicleCheck.valid)
	{
		addVehicleToTable(newVehicleCheck.vehicle);
	}
	
}

function addVehicleToTable(vehicle)
{
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	
	var mpw = Number.parseInt($('#mpwInput')[0].value);
	var mpy = mpw*52;
	
	var gasTypeName = "Regular";
	var gasPrice = regularValue;
	
	if (vehicle.fuel_type == fuel_types.DIESEL)
	{
		gasTypeName = "Diesel";
		gasPrice = dieselValue;
	}
	
	var yearlyGallons = mpy / vehicle.mpg;
	var yearlyCost = yearlyGallons * gasPrice;

	$('#vehicleTable > tbody:last-child').append(`<tr>
		<td>${vehicle.name}</td>
		<td>${vehicle.mpg}</td>
		<td>${mpw}, ${mpy}</td>
		<td>${gasTypeName}</td>
		<td>${USDollar.format(gasPrice)}</td>
		<td>${USDollar.format(yearlyCost)}</td>
	</tr>`);	
}