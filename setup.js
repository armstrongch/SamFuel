//cd c:/users/chris/documents/html/samfuel

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
		
		var regularGasValue = Number.parseFloat(regularGas[0]['value']);
		var dieselValue = Number.parseFloat(diesel[0]['value']);
		
		loadContent(regularGasValue, dieselValue);
	}
}

function loadContent(regularValue, dieselValue)
{
	$('#loadingP').css('display', 'none');
	$('#dataDiv').css('display', 'block');
	$('#regularPrice').html(`Regular Gas: ${regularValue}`);
	$('#dieselPrice').html(`Diesel: ${dieselValue}`);

	var mpw = Number.parseInt($('#mpwInput')[0].value);
	var mpy = mpw*52;
	
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
			<td>${gasPrice}</td>
			<td>${yearlyCost}</td>
		</tr>`);	
	}
	
}
