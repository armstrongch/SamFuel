//cd c:/users/chris/documents/html/samfuel

function setup()
{
	for (var i = 0; i < vehicles.length; i += 1)
	{
		$('#vehicleTable > tbody:last-child').append(`<tr>
			<td>${vehicles[i].name}</td>
			<td>${vehicles[i].mpg}</td>
			<td>Miles per Week, Year</td>
			<td>Gas Type</td><td>Gas Price</td>
			<td>Yearly Cost</td>
		</tr>`);	
	}
	
	$('#requestIFrame').prop('src', nearbySearchQueryString);
	
	var results = jQuery.parseJSON()
}