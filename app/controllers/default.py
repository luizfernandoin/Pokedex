from flask import render_template, redirect, url_for, flash, request, session
from app import app

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/favorites')
def favorites():
    return render_template('favorites.html', titulo='Favoritos')

@app.route('/about')
def about():
    return render_template('about.html')


# está é a rota proximo que deve ser implementada para careagar as informações linkada ao card clicado
@app.route('/detail')
def detail():
    return render_template('detail.html')

# add routes evolution pokémons


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




