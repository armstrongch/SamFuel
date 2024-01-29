function getRequest()
{
	var key = "ZlHegspJec";
	key += "rZTgV4F5Ql";
	key += "3iNNsHTceP";
	key += "MOq6Anmb17";
	
	var date = new Date();
	
	var startYear = date.getFullYear();
	var endYear = startYear;
	
	
	var startMonth = date.getMonth();
	var endMonth = date.getMonth()+1;
	
	if (startMonth == 0)
	{
		startMonth = 12;
		startYear -= 1;
	}
	
	//test
		/*startMonth = 5;
		endMonth = 6;
		startYear = 2023;
		endYear = 2023;*/
	//test
	
	var endMonthString = endMonth.toString();
	if (endMonthString.length < 2) { endMonthString = "0" + endMonthString; }
	
	var startMonthString = startMonth.toString();
	if (startMonthString.length < 2) { startMonthString = "0" + startMonthString; }
	
	var startDateString = `${startYear}-${startMonthString}`;
	var endDateString = `${endYear}-${endMonthString}`;

	
	return `https://api.eia.gov/v2/petroleum/pri/gnd/data/?frequency=monthly&data[0]=value&start=${startDateString}&end=${endDateString}&sort[0][column]=duoarea&sort[0][direction]=asc&offset=0&length=5000&api_key=${key}`;
}