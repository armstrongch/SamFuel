var fuel_types = 
{
	GAS: 0,
	DIESEL: 1
}

function vehicle(in_name, in_mpg, in_fuel_type)
{
	this.name = in_name;
	this.mpg = in_mpg;
	this.fuel_type = in_fuel_type;
}

var vehicles = [
	new vehicle("Truck", 8.5, fuel_types.GAS),
	new vehicle("Beetle", 22, fuel_types.GAS),
	new vehicle("TDI", 42, fuel_types.DIESEL),
	new vehicle("Mercedez 300D", 26, fuel_types.DIESEL),
	new vehicle("Buick", 16, fuel_types.GAS),
];
