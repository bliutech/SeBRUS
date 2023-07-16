from flask import request, jsonify

import functools

from models.session import Session


def is_authenticated(f):
    def not_authenticated():
        res = {"status": "Not authenticated."}
        return jsonify(res), 401

    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        token = request.cookies.get("session")

        from app import app, db

        with app.app_context():
            session = db.session.query(Session).filter_by(token=token).first()

            if session is None:
                return not_authenticated()

        return f(*args, **kwargs)

    return wrapper
