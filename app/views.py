from flask import render_template, request, flash, redirect, url_for
from app import app
import processor
import json
from .form import SearchForm

q = 'soccer'

@app.route('/' , methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    form = SearchForm();
    if form.validate_on_submit():
        flash('Search for query="%s"' %
              (form.search_query.data))
        q = form.search_query.data

        print("In index() : ", str(q))
        return redirect(url_for('search', query=q))
    return render_template('index.html', title = 'Home', form = form)

@app.route('/search/<query>', methods=['GET'])
def search(query):
    print("In search() : ", str(query))
    results = processor.getSubreddits(str(query))
    results_json = json.dumps(results)
    print(results_json)
    print(type(results_json))
    return render_template('display.html', title='Search Results' , jsonResults = results_json)