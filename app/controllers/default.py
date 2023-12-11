from flask import render_template, redirect, url_for, flash, request, session
import app.requests_poke as rp
from app import app
import requests

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/favorites')
def favorites():
    return render_template('favorites.html', titulo='Favoritos')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/detail')
def detail():
    try:
        pokemon_id = request.args.get('id')
        
        return render_template('detail.html', pokemon=rp.get_pokemon_details(pokemon_id))
    except Exception as e:
        print(e)
        return redirect(url_for('home'))

@app.route('/signin')
def signin():
    return render_template('signin.html', titulo='Login')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/logout')
def logout():
    session['usuario_logado'] = None
    flash('Logout efetuado com sucesso!')
    return redirect(url_for('home'))




