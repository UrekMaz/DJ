import base64
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
from email.mime.text import MIMEText

# Replace with your actual service account key file path
PRIVATE_KEY_FILE = "path/to/service_account.json"

# Create Gmail API credentials
credentials = service_account.Credentials.from_service_account_file(
    PRIVATE_KEY_FILE,
    scopes=["https://www.googleapis.com/auth/gmail.send"]
)

# Initialize Gmail API client
gmail_service = build("gmail", "v1", credentials=credentials)

# Function to send an email
def send_email():
    message = MIMEText("Hello, this is a test email from my Langflow Gmail agent!")
    message["to"] = "dcmaureenmiranda@gmail.com"  # Replace with the recipient's email
    message["from"] = "maureen.miranda.22.spit.ac.in"  # Must match the authenticated email
    message["subject"] = "Test Email"

    encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    response = gmail_service.users().messages().send(
        userId="me",
        body={"raw": encoded_message}
    ).execute()

    print("Email sent! Message ID:", response["id"])

# Run the function
send_email()
