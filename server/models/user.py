#!/usr/bin/env python3
from app import db


class User(db.Model):
    __tablename__ = "users"

    _count = 0

    id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

    def __init__(self, username, password):
        # account for existing users before class is first initialized
        count = db.session.query(self.__class__).count()
        if count != 0:
            User._count = count

        # initialze the user
        self.id = User._count
        self.username = username
        self.password = password

        # increment the count to track user ids
        User._count += 1

    def __repr__(self):
        return "<User %r>" % self.username

    def json(self):
        return {"id": self.id, "username": self.username}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
