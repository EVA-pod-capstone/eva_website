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
