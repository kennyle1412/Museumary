#!/usr/bin/env python3

import requests
from API_KEYS import WALTER_KEY#, REQUIREMENTS
from models import db, Work, Artist, ArtType, Venue, Medium

BASE_URL = 'http://api.thewalters.org/v1/'
IMAGE_URL = 'http://static.thewalters.org/images/'

OBJ_URL = BASE_URL + 'objects'
COL_URL = BASE_URL + 'collections'

ignored_creators = [
	'venetian', 'irish', 'near', 'copy', 'workshop', 'master', 'painter',
	'after', 'attributed', 'style', 'house', 'follower', 'circle'
]

ignored_values = ['active', 'ca.', 'died']

def valid_item(item):
	# for key in REQUIREMENTS:
	# 	if not item[key]:
	# 		return False

	creator = [a for a in item.get('Creator').split() \
			   if '?' not in a and a.lower() not in ignored_values]

	creator_raw = ''.join(creator)

	if len(creator) < 2 or creator[0].lower() in ignored_creators or \
			   '(' not in creator_raw or ')' not in creator_raw:
		return False

	return True

def parse_artist_name(artist_raw):
	paren = artist_raw.find('(')
	return artist_raw[:paren].strip()

def parse_artist_culture(artist_raw):
	lparen = artist_raw.find('(')
	rparen = artist_raw.find(')')

	artist_raw = artist_raw[lparen+1:rparen].replace(',', '').split()
	culture = artist_raw[0]

	if culture not in ignored_values and culture not in s and not any(char.isdigit() for char in culture):
		return culture

	return None

def parse_artist_dates(artist_raw):
	return ''

def get_artist_entry(item):
	artist_raw = item.get('Creator')
	name = parse_artist_name(artist_raw)

	artist = Artist.query.filter_by(name=name).first()

	if not artist:
		artist = Artist()
		artist.name = parse_artist_name(artist_raw)
		artist.culture = parse_artist_culture(artist_raw)

		db.session.add(artist)

	return artist

    # birth = db.Column(db.Integer)
    # death = db.Column(db.Integer)
    # birthplace = db.Column(db.String(128))
    # deathplace = db.Column(db.String(128))
    # culture = db.Column(db.String(64))
    # image_url = db.Column(db.String(512))

def get_venue_entry(item):
	venue = Venue.query.filter_by(name='The Walters Art Museum').first()
	assert venue

	return venue

def get_arttype_entry(item):
	arttype_raw = item.get('Classification')
	arttype = ArtType.query.filter_by(name=artist_raw).first()

	if not arttype:
		arttype = ArtType()
		arttype.name = artist_raw

		#db.session.add(arttype)

	return arttype

def get_medium_entry(item):
	medium_raw = item.get('Medium')
	medium = Medium.query.filter_by(name=medium_raw).first()

	if not medium:
		medium = Medium()
		medium.name = medium_raw

		#db.session.add(medium)

	return medium

def get_work_entry(item):
	work = Work()

	b_year = item.get('DateBeginYear')
	e_year = item.get('DateEndYear')

	b_year = str(b_year) if b_year else '?'
	e_year = str(e_year) if e_year else '?'

	description = item.get('Description')
	image_url = item.get('PrimaryImage').get('Raw')

	work.name = item.get('Title')
	work.date = '{}-{}'.format(b_year, e_year)
	work.description = description[:1024] if description else None
	work.image_url = image_url

    # art_type_id = db.Column(db.Integer, db.ForeignKey('art_type.id'))
    # medium = db.relationship("Medium", back_populates="works")
    # medium_id = db.Column(db.Integer, db.ForeignKey('medium.id'))

	return work


if __name__ == '__main__':
	NUM_PAGES = 1
	params = dict(apikey=WALTER_KEY)

	# venue = Venue.query.filter_by(name='The Walters Art Museum').first()

	s = []
	for i in range(1, NUM_PAGES+1):
		params['Page'] = i
		r = requests.get(url=OBJ_URL, params=params)
		json = r.json()

		for item in json['Items']:
			if not valid_item(item):
				continue

			print(item.get('Medium'))
			print(item.get('Classification'))

			# work = get_work_entry(item)

			# print(work.name)
			# print(work.description)
			# print(work.image_url)

			# artist_raw = item.get('Creator')
			# lparen = artist_raw.find('(')
			# rparen = artist_raw.find(')')

			# artist_raw = artist_raw[lparen+1:rparen].replace(',', '').replace(' - ', '-')
			# for i in ignored_values:
			# 	artist_raw = artist_raw.replace(i, '')
			# artist_raw = artist_raw.split()

			# print(artist_raw)

			# print(item.get('PrimaryImage').get('Raw'))

			# if Work.query.filter_by(name=item.get('Title')).first():
			# 	continue

			# print(item.get('Medium')) #Query database
			# print(item.get('Classification')) #artype

			# work = get_work_entry(item) # need to set artype, and medium
			# artist = get_artist_entry(item)

			# work.venue = venue
			# work.artist = artist

			# db.session.add(work)

		if not json.get('NextPage'):
			break

	# db.session.commit()

	# with open('ehnicities.txt', 'w') as f:
	# 	for i in s:
	# 		f.write(i + '\n')



