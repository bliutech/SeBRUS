from flask import jsonify, request

import secrets
import string


def router(id):
    if request.method == "GET":
        return get(id)
    if request.method == "POST":
        return post()
    if request.method == "DELETE":
        return delete(id)

    res = {"status": "Unsupported HTTP request method."}

    return jsonify(res), 500


def get(id):
    res = {"status": ""}

    from app import app, db
    from models.user import User
    from models.session import Session

    with app.app_context():
        session = db.session.query(Session).filter_by(id=id).first()

        if session is None:
            res["status"] = "Session not found."
            return jsonify(res), 404

        user = db.session.query(User).filter_by(id=session.user_id).first()

        if user is None:
            res["status"] = "User not found."
            return jsonify(res), 404

        res["status"] = "Success."
        res["user"] = user.json()

        return jsonify(res), 200


def post():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    res = {"status": ""}

    if username is None or password is None:
        res["status"] = "Both `username` and `password` are required."
        return jsonify(res), 400

    from app import app, db
    from models.user import User
    from models.session import Session

    with app.app_context():
        user = (
            db.session.query(User)
            .filter_by(username=username, password=password)
            .first()
        )

        if user is None:
            res["status"] = "Username and password not found."
            return jsonify(res), 404

        token = "".join(
            secrets.choice(string.ascii_uppercase + string.ascii_lowercase)
            for _ in range(24)
        )

        # ensure token is unique
        while db.session.query(Session).filter_by(token=token).first() is not None:
            token = "".join(
                secrets.choice(string.ascii_uppercase + string.ascii_lowercase)
                for _ in range(24)
            )

        session = Session(token, user.id)
        session.save_to_db()

        res["status"] = "Session created."
        res["session"] = session.json()

        return jsonify(res), 201


def delete(id):
    res = {"status": ""}

    from app import app, db
    from models.session import Session

    with app.app_context():
        session = db.session.query(Session).filter_by(id=id).first()

        if session is None:
            res["status"] = "Session token not found."
            return jsonify(res), 404

        session.delete_from_db()

        res["status"] = "Session deleted."

        return jsonify(res), 200
