Okay, this is more for Andrew to put down his potential problems. 

There are multiple ways to input latitude and longitude coordinates: with degrees, or as a floating point value. We have it set up for the floating point value, but we might need it to be the degree version. 

If we get from the phone, The New_Pod file will need to be updated to not ask for lat and lng, but instead to ask for a file (data file) and then to read the lat and lng from the file data, and place the pod based on that. 

I want the New_Pod code to be solely the creation of the popup, and the parsing/organization of the data from the file. I would love for it to all be stored in an object, but that would be a very complex object, so I'm open to other ideas as to how to achieve our goals. 

