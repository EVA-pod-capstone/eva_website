Explaining Script.js/Working on Graphing.js

Script.js Explaination
There are three different functions in this file
----------------------
Init()
Creates an event listener that actually opnes handleFileSelect when the file inside of the [Choose File] button changes. 
-------------------------
handleFileSelect(event)
first, what is event? event is an object that holds the information of all the events that have happened recently, so specifically the alteration of the [Choose File] button to the CSV file. This basically pulls the information about the file into the handleFileSelect function. 

It then logs the event into the console, and starts pulling data out of the event. It creates xValues and yValues, two arrays used in graphing. 
Then it seperates the CSV file into separate lines of data and then parses that data into xValues and yValues, ignoring the header. Then it creates a chart using the header values to label the graph and then plots the data in the graph. 

The graph is a line graph, and there are a few params that make it look prettier, but thats easy money. 

Okay, thats the Script.js function. Now breaking the work up. 

The parsing of the data will be done in New_Pod and Update_Pod, so go to those files and Text files to see how this is integrated. 

The graphing will be done in Graphing.js , so go there or to the Grpahing text file for that information. 