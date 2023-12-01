from flask import render_template, redirect, url_for, flash, request, session
from app import app

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signin')
def signin():
    return render_template('signin.html')

@app.route('/signout')
def signout():
    return render_template('signout.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/detail')
def detail():
    return render_template('detail.html')


# add routes evolution pokémons

