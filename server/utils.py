from flask import request, jsonify

import functools


def is_authenticated(f):
    def not_authenticated():
        res = {"status": "Not authenticated."}
        return jsonify(res), 401

    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        token = request.cookies.get("session")

        if token is None:
            return not_authenticated()

        from app import app, db
        from models.session import Session

        with app.app_context():
            session = db.session.query(Session).filter_by(token=token).first()

            if session is None:
                return not_authenticated()

        return f(*args, **kwargs)

    return wrapper
