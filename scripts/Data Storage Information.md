Data Storage Information

The data from the CSV file is stored as follows 
"Time, Latitude, Longitude, SoilHumidity, TempSoil, PH, AirHum, Airpress, Airtemp, Co2, light, Sulfer Benzine Ammonia MQ, Hydrogen MQ, Carbon Monoxide MQ, Methane MQ";

This string is nice, but It might change at some time in the future, in both size and order, so we aren't just copying and pasting the CSV data into an object. Instead we are going to search for a key word, and then a place it in its correct place, creating a table of values that should look like this

Name | Description | Meas# | Time | Lat | Lng | SHum | STemp | Ph | SBA MQ | H MQ | CO MQ | Meth MQ | AHum | ATemp | APress | CO2 | Light | 
  1     1:11   123   123   123     123    123    123    123     123      123      123    123      123    123    123   
  2...................................................................................................................
  3...................................................................................................................

  A few notes about this. Theoretically, other data measured could be added, but that would require old fields that did not have that measurements to remain blank or to be filled with some unknown value

  The data is structured so that data 1 - 4 are identifiers, which can be used to identify which pod this is refering to when uploadig data, the time that the measurements were taken, and which measurement this was in the history of the device (Meas # is added here, not in the CSV file). 








  