Okay, this is more for Andrew to put down his potential problems. 

There are multiple ways to input latitude and longitude coordinates: with degrees, or as a floating point value. We have it set up for the floating point value, but we might need it to be the degree version. 

If we get from the phone, The New_Pod file will need to be updated to not ask for lat and lng, but instead to ask for a file (data file) and then to read the lat and lng from the file data, and place the pod based on that. 

I want the New_Pod code to be solely the creation of the popup, and the parsing/organization of the data from the file. I would love for it to all be stored in an object, but that would be a very complex object, so I'm open to other ideas as to how to achieve our goals. 


UPDATE 3/6
(Post integration test 1)


We are going to have two buttons, New_Pod.js, and Update_Pod.js, which will do what they sound like they do. 

New_Pod will take the lat and lng data from the CSV file, and will place the pin, and create the object. This object will parse the CSV file, and construct a series of matrices or files, or something that can hold the successive pieces of information and connect them with a time stamp.

Update_Pod will ignore the lat and lng data from the CSV file, and will find the object based on a unique identifier that they created when they made the New_Pod. I dont know how to make sure that their unique identifier is easy to remember and also not connected to lat and longitude, but I can ask patrick about it. 

Finally, the Graphing.js file will have a bunch of different buttons that you can press to parse the object for data and output all of the data into different graphs with respect to time. 

!!!IMPORTANT!!!
(Maybe consider making this a drop down list, allowing them to plot anything against anything, and then have three buttons: New graph, Delete Graph, and Edit Graph. Consider later...)


UPDATE 3/20
(Thursday before srping break)
Okay, New_Pod should be mostly finished, so this needs to turn into a true instruction manual. A few updates

The doce now creates a .JSON file rather than an object, and that .JSON file is created here. The JSON file needs to have a unique name, so that it is ammendable, which means that we are using the Latitude and Longitude coordinates to name it, in the format of podData_Latidude_Longitude, where latitude and longitude are only the first 4 digits of the measurement. This should give us an error of roughly 15 feet in either direction, which should be enough for a phones gps to give with pretty solid consistency lat/long measurement. Nonetheless, the phone shouldn't have to take lat and long more than once in any location, so I am happy with this.

The .JSON Files first two inputs are the name and description, which is used for the creation of a pod, and then the other inputs are in a list that incriments up by measurment number for every new series of measurements. Look at this image {  ![](JSONFormatting.png)  } to see what I mean. Okay, here goes the full descritpion of the code




New_Pod Information

Hello User! If you are reading this, you are working on server/backend code, and for that I am eternally sorry. Hopefully though, this will help you find the issue in the code, or how this code is not working with yours. 

New_Pod.js was designed to allow the user to easily create a new pod on the map, and with it a seperate .JSON file for managing data within the server. 

Our current setup is as follows. We have the EVA Pod (V1? The finished product from our Capstone), connected to a phone, which is then connected to the internet, or sent to a computer connected to the internet. The user will start by uploading time, lat and longitude to the EVA pod (only for the first measurments gathered, it is then stored in the pod). The EVA pod then outputs a CSV file that has the measurements, lat, lng and time to the users mobile device. That CSV file is then put here, where it is parsed and reorganized. Go to Data_Storage_Information if you want to know the formatting for the data. After being reformatted, A .JSON file is created labeled podData_Latitude_Longitude, where latitude and longitude are the first 4 digits measured (More than 4 digits makes uploading later data potentially erronious). From here, a Pin is created, in the Map_Script.js file, and the data is stored into the .JSON File. 
