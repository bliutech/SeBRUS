import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import routes.user as user
import routes.session as session

import config

from utils import is_authenticated

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, config.DATABASE_NAME
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app, resources={r"/api/*": {"origins": "*"}})
db = SQLAlchemy(app=app)


# debugging endpoint
@app.route("/api", methods=["GET", "POST", "PUT", "DELETE"])
@is_authenticated
def api_handler():
    data = request.json
    print(data)
    return jsonify(data)


# user endpoint
@app.route("/api/user", defaults={"id": None}, methods=["POST"])
@app.route("/api/user/<id>", methods=["GET", "PUT", "DELETE"])
def user_handler(id):
    return user.router(id)


# session endpoint
@app.route("/api/session", defaults={"id": None}, methods=["POST"])
@app.route("/api/session/<id>", methods=["GET", "DELETE"])
def session_handler(id):
    return session.router(id)


if __name__ == "__main__":
    with app.app_context():
        from models.user import User
        from models.session import Session

        db.metadata._add_table(User.__tablename__, None, User.__table__)
        db.metadata._add_table(Session.__tablename__, None, Session.__table__)
        db.create_all()

    app.run(host="0.0.0.0", port=5000, debug=True)
