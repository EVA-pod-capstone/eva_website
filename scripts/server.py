from http.server import SimpleHTTPRequestHandler, HTTPServer
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow all origins
        super().end_headers()

# Initialize and start the server
if __name__ == "__main__":
    # Change the working directory to the 'scripts/' folder
    os.chdir(os.path.dirname(__file__))  # Set the working directory to the location of this script

    server_address = ('localhost', 8000)  # Host and port
    httpd = HTTPServer(server_address, CORSRequestHandler)
    print("Serving on http://localhost:8000")
    httpd.serve_forever()