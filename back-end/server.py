from dotenv import load_dotenv
import os

load_dotenv()

import bcrypt
import mysql.connector

mybd = mysql.connector.connect(
    host=os.getenv("HOST"),
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD")
)

# Helper function to validate password based on the received username
def validate_user_password(username, password):
    mycursor = mybd.cursor()
    mycursor.execute('SELECT password FROM User WHERE username = %s', (username,))
    user = mycursor.fetchone()
    if not user:
        return False
    stored_hash = user[0]
    return bcrypt.checkpw(password.encode('utf-8'), stored_hash)

# Helper function to receive user profile information based on the received username
def get_user_profile_information(username):
    mycursor = mybd.cursor(dictionary=True)
    mycursor.execute("""
        SELECT
            p.full_name,
            p.email,
            p.cellphone,
            p.major
        FROM 
            User u
        JOIN 
            Profile p ON u.id = p.user_id
        WHERE 
            u.username = %s
    """, (username,))
    user_profile = mycursor.fetchone()
    return user_profile

class ProtectedHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == 'auth/login':

            try:
                length = int(self.headers.get('Content-Length', 0))
                data = json.loads(self.rfile.read(length))
                username = data.get('username')
                password = data.get('password')
            except:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Unexpected error')
                return
            
            # Checks if the required login information was provided
            if not username or not password: 
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Username and password required to login')

            # Checks if the user exists and its password matches with the one in the database
            if not validate_user_password(username, password):
                self.send_response(401)
                self.end_headers()
                self.wfile.write(b'Invalid credentials or user doent exist.')
                return
            
            # Uppon user validation, servers its profile information
            user_profile = get_user_profile_information(username)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(user_profile).encode())

        else:
            self.send_response(404)
            self.end_headers()
            return