# [EVA Website](https://github.com/EVA-pod-capstone/eva_website)

This is the code for the EVA Online website. We hosted it on a Raspberry Pi for our project, instructions for which can be found at https://www.raspberrypi.com/documentation/computers/remote-access.html#set-up-an-apache-web-server. This code can be put directly into /var/www/html on the Pi if going this route. There must be permissions for anyone to write to the uploaded data folder. You also must provide a Google Maps API key in the top of the index.html file to properly load the map.

The website provides EVA data storage, sharing, and plotting. The user can upload the csv file that is output by the EVA Pod, and it will automatically save this on the backend and place a pin on the map. Clicking on the pin will retrieve the data and allow the user to plot or add to it. The user can also see all the other pods in the community and their data. The plots use Plotly to allow the user to interactively change what they are looking at.

This project uses php to store uploaded data in json files in the /uploads directory. Each pod location is given its own file and new data will be appended to the end. Each new pod is also added to the AllLatLng.json file, for quickly reading all pins and populating the map. The only way to delete data would be to go into the server manually and delete the associated file.

### To set up a new EVA Pod
1. Choose a suitable location for the EVA Pod for your study. Avoid areas where water will pool. Insert the batteries into each module, snap shut the enclosures, and mount the EVA Pod to a tree or post using the velcro strap or with a hook. Stick the MOSS (Mushroom Offgassing Soil Sensor) into the ground.
2. Press the Connect button. This will start the wifi server. Connect your phone to the EVA Pod's wifi and then visit its control page at https://192.168.4.1. You will need to allow location data. Press the buttons to send the EVA Pod your current timestamp and latitude/longitude coordinates.
    1. It requires these initial values to assign place and time to its future measurements. If it is ever moved, location should be sent again to update the stored value. If it dies, it will lose track of time so time should be sent again.
    2.  **Press the Connect button again when finished to turn off the wifi server.**
4. The EVA Pod will automatically begins its data collection cycle (waking up to take measurements and sleeping between). It can be left alone for 2 weeks.
5. When ready to retrieve the collected data from the EVA Pod, press the Connect button to begin the wifi server again and connect to the webpage as before. This time, select the Download data button, wait until you receive the csv data file, and then press the Delete data button to clear the memory on the EVA Pod.
    1. If the EVA Pod runs out of storage space, it will stop taking new measurements.
    2. If the EVA Pod runs out of battery, it will stop taking new measurements but still contain the data it took before it dies, which can be recovered once it regains power.
6. When you are able to, navigate to the website and click Add New Pod. Select the data file you downloaded from the EVA Pod. Upload it and you will see the pin appear on the map and the data will be available graphically if you click this pin.
7. When adding new data to the same EVA Pod in the same location, click on Update Pod instead and upload the file with the new data. This will be appended to the existing data.
