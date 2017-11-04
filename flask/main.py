"""
Main file where app-engine runs the website
"""

from flask import Flask, render_template, jsonify, make_response
from flask_io import FlaskIO, fields, Schema
from flask_cors import CORS
from flask_restful import marshal_with
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from os import environ
import models
from models import Artist, Work, ArtType, Venue, Medium

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
io = FlaskIO(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

def get_info(page, entries_per_page, num_entries):
    """
    Fill in information for responses containing
    page number, entries_per_page, and total pages and entries
    """
    return {
        'page': page,
        'entries_per_page': entries_per_page,
        'num_pages': num_entries // entries_per_page + 1,
        'num_entries': num_entries
    }

#-------------------#
# Work API Requests #
#-------------------#

@app.route('/work/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
@io.from_query('startswith', fields.String(missing=None))
def get_works(**kwargs):
    """
    API GET request for all works of art in the database
    """
    page = kwargs['page']
    entries_per_page = kwargs['entries_per_page']
    order_by = kwargs['order_by']
    order = kwargs['order']
    startswith = kwargs['startswith']
    # filters = kwargs['filters']

    works = Work.query
    num_entries = len(works.all())

    if order_by:
        if order == 'ascending':
            works = works.order_by(getattr(Work, order_by))
        elif order == 'descending':
            works = works.order_by(desc(getattr(Work, order_by)))

    if startswith:
        works = works.filter(Work.name.startswith(startswith))

    # if filter_attr:

    # set the number of works given in the response
    if entries_per_page:
        works = works.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        offset = (page - 1) * entries_per_page
        works = works.offset(offset)

    works = works.all()
    results = []
    for work in works:
        results.append(get_work_data(work))

    info = get_info(page, entries_per_page, num_entries)

    return jsonify({"info":info, "objects":results})
    # return filters

@app.route('/work/<int:work_id>', methods=['GET'])
def get_work(work_id):
    """
    API GET request for a single work given work id
    """
    work = Work.query.filter_by(id=work_id).first_or_404()
    result = get_work_data(work)
    return jsonify(result)

def get_work_data(work):
    return {
        'id': work.id,
        'name': work.name,
        'artist_id': work.artist_id,
        'art_type_id': work.art_type_id,
        'medium_id': work.medium_id,
        'date': work.date,
        'venue_id': work.venue_id,
        'image_url': work.image_url
    }

#---------------------#
# Artist API Requests #
#---------------------#

@app.route('/artist/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
def get_artists(**kwargs):
    """
    API GET request for all artists in the database
    """
    page = kwargs['page']
    entries_per_page = kwargs['entries_per_page']
    order_by = kwargs['order_by']
    order = kwargs['order']

    artists = Artist.query
    num_entries = len(artists.all())

    if order_by:
        if order == 'ascending':
            artists = artists.order_by(getattr(Artist, order_by))
        elif order == 'descending':
            artists = artists.order_by(desc(getattr(Artist, order_by)))

    # set the number of works given in the response
    if entries_per_page:
        artists = artists.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        offset = (page - 1) * entries_per_page
        artists = artists.offset(offset)

    artists = artists.all()

    results = []
    for artist in artists:
        results.append(get_artist_data(artist))

    info = get_info(page, entries_per_page, num_entries)

    return jsonify({"info":info, "objects":results})

@app.route('/artist/<int:artist_id>', methods=['GET'])
def get_artist(artist_id):
    """
    API GET request for a single artist given its id
    """
    artist = Artist.query.filter_by(id=artist_id).first_or_404()
    result = get_artist_data(artist)
    return jsonify(result)

def get_artist_data(artist):
    return {
        'id': artist.id,
        'name': artist.name,
        'birth': artist.birth,
        'death': artist.death,
        'birthplace': artist.birthplace,
        'deathplace': artist.deathplace,
        'culture': artist.culture,
        'image_url': artist.image_url,
        'art_type_ids': [art_type.id for art_type in artist.art_types],
        'work_ids': [work.id for work in artist.works]
    }

#--------------------#
# Venue API Requests #
#--------------------#

@app.route('/venue/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
def get_venues(**kwargs):
    """
    API GET request for all museums in the database
    """
    page = kwargs['page']
    entries_per_page = kwargs['entries_per_page']
    order_by = kwargs['order_by']
    order = kwargs['order']

    venues = Venue.query
    num_entries = len(venues.all())

    if order_by:
        if order == 'ascending':
            venues = venues.order_by(getattr(Venue, order_by))
        elif order == 'descending':
            venues = venues.order_by(desc(getattr(Venue, order_by)))

    # set the number of works given in the response
    if entries_per_page:
        venues = venues.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        offset = (page - 1) * entries_per_page
        venues = venues.offset(offset)

    venues = venues.all()
    results = []
    for venue in venues:
        results.append(get_venue_data(venue))

    info = get_info(page, entries_per_page, num_entries)

    return jsonify({'info':info, 'objects':results})

@app.route('/venue/<int:venue_id>', methods=['GET'])
def get_venue(venue_id):
    """
    API GET request for a single museum given its id
    """
    venue = Venue.query.filter_by(id=venue_id).first_or_404()
    result = get_venue_data(venue)
    return jsonify(result)

def get_venue_data(venue):
    result = {
        'id':       venue.id,
        'name':     venue.name,
        'street':   venue.street,
        'city':     venue.city,
        'country':  venue.country,
        'zipcode':  venue.zipcode,
        'work_ids': [work.id for work in venue.works]
    }
    return result

#----------------------#
# ArtType API Requests #
#----------------------#

@app.route('/art_type/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
def get_art_types(**kwargs):
    """
    API GET request for all the art_types in the database
    """
    page = kwargs['page']
    entries_per_page = kwargs['entries_per_page']
    order_by = kwargs['order_by']
    order = kwargs['order']

    art_types = ArtType.query
    num_entries = len(art_types.all())

    if order_by:
        if order == 'ascending':
            art_types = art_types.order_by(getattr(ArtType, order_by))
        elif order == 'descending':
            art_types = art_types.order_by(desc(getattr(ArtType, order_by)))

    # set the number of works given in the response
    if entries_per_page:
        art_types = art_types.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        offset = (page - 1) * entries_per_page
        art_types = art_types.offset(offset)

    art_types = art_types.all()

    results = []
    for art_type in art_types:
        results.append(get_art_type_data(art_type))

    info = get_info(page, entries_per_page, num_entries)

    return jsonify({"info":info, "objects":results})

@app.route('/art_type/<int:art_type_id>', methods=['GET'])
def get_art_type(art_type_id):
    """
    API GET request for a single art_type given its id
    """
    art_type = ArtType.query.filter_by(id=art_type_id).first_or_404()
    result = get_art_type_data(art_type)
    return jsonify(result)

def get_art_type_data(art_type):
    result = {
        'id':           art_type.id,
        'name':         art_type.name,
        'artist_ids':   [artist.id for artist in art_type.artists],
        'medium_ids':   [medium.id for medium in art_type.media],
        'work_ids':     [work.id for work in art_type.works]
    }
    return result

#---------------------#
# Medium API Requests #
#---------------------#

@app.route('/medium/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
def get_mediums(**kwargs):
    """
    API GET request for all media types
    """
    page = kwargs['page']
    entries_per_page = kwargs['entries_per_page']
    order_by = kwargs['order_by']
    order = kwargs['order']

    media = Medium.query
    num_entries = len(media.all())

    if order_by:
        if order == 'ascending':
            media = media.order_by(getattr(Medium, order_by))
        elif order == 'descending':
            media = media.order_by(desc(getattr(Medium, order_by)))

    # set the number of works given in the response
    if entries_per_page:
        media = media.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        offset = (page - 1) * entries_per_page
        media = media.offset(offset)

    media = media.all()

    results = []
    for medium in media:
        results.append(get_medium_data(medium))

    info = get_info(page, entries_per_page, num_entries)

    return jsonify({"info":info, "objects":results})

@app.route('/medium/<int:medium_id>', methods=['GET'])
def get_medium(medium_id):
    """
    API GET request for a single medium given its id
    """
    medium = Medium.query.filter_by(id=medium_id).first_or_404()
    result = get_medium_data(medium)
    return jsonify(result)

def get_medium_data(medium):
    return {
        'id': medium.id,
        'name': medium.name,
        'art_type_id': medium.art_type_id,
        'work_ids': [work.id for work in medium.works]
    }


if __name__ == '__main__':
    """
    This is only used when running locally. When running live, gunicorn runs
    the application.
    """
    app.run(host='127.0.0.1', port=8080, debug=True)
