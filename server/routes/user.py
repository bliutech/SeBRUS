from flask import jsonify, request

from models.user import User


# user router
def router(id):
    if request.method == "GET":
        return get(id)
    if request.method == "POST":
        return post()
    if request.method == "PUT":
        return put(id)
    if request.method == "DELETE":
        return delete(id)

    res = {"status": "Unsupported HTTP request method."}

    return jsonify(res), 500


# retrieve user from database by id
def get(id):
    if id is None:
        res = {"status": "User ID required."}
        return jsonify(res), 400

    res = {"status": ""}

    from app import app, db

    with app.app_context():
        users = []

        if id == "all":
            users = db.session.query(User).all()
        else:
            users = db.session.query(User).filter_by(id=id).all()

        if len(users) == 0:
            res["status"] = "User not found."
            return jsonify(res), 404

        res["users"] = [user.json() for user in users]

        return jsonify(res), 200


# create user
def post():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    res = {"status": ""}

    if username is None or password is None:
        res["status"] = "Both `username` and `password` are required."
        return jsonify(res), 400

    from app import app, db

    with app.app_context():
        user = db.session.query(User).filter_by(username=username).first()

        if user is not None:
            res["status"] = "User already exists."
            return jsonify(res), 409

        new_user = User(username=username, password=password)
        new_user.save_to_db()

        res["status"] = "User created."
        res["user"] = new_user.json()

        return jsonify(res), 201


# update user
def put(id):
    data = request.json
    username = data.get("username")
    password = data.get("password")

    res = {"status": ""}

    if username is None or password is None:
        res["status"] = "Both `username` and `password` are required."
        return jsonify(res), 400

    from app import app, db

    with app.app_context():
        user = db.session.query(User).filter_by(id=id).first()

        if user is None:
            res["status"] = "User does not exist."
            return jsonify(res), 404

        user.username = username
        user.password = password
        user.save_to_db()

        res["status"] = "User edited."
        res["user"] = user.json()

        return jsonify(res), 200


# delete user
def delete(id):
    res = {"status": ""}

    from app import app, db

    with app.app_context():
        user = db.session.query(User).filter_by(id=id).first()

        if user is None:
            res["status"] = "User does not exist."
            return jsonify(res), 404

        user.delete_from_db()

        res["status"] = "User deleted."
        return jsonify(res), 200
