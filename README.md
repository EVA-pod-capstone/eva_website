# EVA website

This is the code for the EVA Online website. We hosted it on a Raspberry Pi for our project, instructions for which can be found at https://www.raspberrypi.com/documentation/computers/remote-access.html#set-up-an-apache-web-server. This code can be put directly into /var/www/html on the Pi if going this route. There must be permissions for anyone to write to the uploaded data folder.

The website provides EVA data storage, sharing, and plotting. The user can upload the csv file that is output by the EVA Pod, and it will automatically save this on the backend and place a pin on the map. Clicking on the pin will retrieve the data and allow the user to plot or add to it. The user can also see all the other pods in the community and their data. The plots use Plotly to allow the user to interactively change what they are looking at.

This project uses php to store uploaded data in json files in the /uploads directory. Each pod location is given its own file and new data will be appended to the end. Each new pod is also added to the AllLatLng.json file, for quickly reading all pins and populating the map. The only way to delete data would be to go into the server manually and delete the associated file.
