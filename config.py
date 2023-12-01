import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = True
SECRET_KEY = os.getenv('SECRET_KEY')