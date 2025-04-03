Data Storage Information

The data from the CSV file is stored as follows 
"Time, Latitude, Longitude, SoilHumidity, TempSoil, PH, AirHum, Airpress, Airtemp, Co2, light, Sulfer Benzine Ammonia MQ, Hydrogen MQ, Carbon Monoxide MQ, Methane MQ";


Name | Description | Lat | Lng |Measurements: (| Meas# | Time | SHum | STemp | Ph | SBA MQ | H MQ | CO MQ | Meth MQ | AHum | ATemp | APress | CO2 | Light | )
  1     1:11   123   123   123     123    123    123    123     123      123      123    123      123    123    123   
  2...................................................................................................................
  3...................................................................................................................

The data is reformatted in the above format, which is also found in JSON_Formatting.png. The data is going to be split into constant and changing data, first. Name, Description, Latitude and longitude are all giong to be constant in the file, and only need to be written at the beginning. After that, the measurments category is going to be looped, with each line outputting a new piece of data at a specific time frame for each variable. This part contains the Measurment Number, the Time, All of the soil and air measurements. 







  