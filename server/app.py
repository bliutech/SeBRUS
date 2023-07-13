import os

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

import config

import routes.user as user
import routes.dataset as dataset

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, config.DATABASE_NAME
)
db = SQLAlchemy(app=app)


# debugging endpoint
@app.route("/api", methods=["GET", "POST", "PUT", "DELETE"])
def api_handler():
    data = request.json
    print(data)
    return jsonify(data)


# user endpoint
@app.route("/api/user", defaults={"id": None}, methods=["POST"])
@app.route("/api/user/<id>", methods=["GET", "PUT", "DELETE"])
def user_handler(id):
    return user.router(id)


@app.route("/api/dataset", defaults={"id": None}, methods=["POST"])
@app.route("/api/dataset/<id>", methods=["GET", "PUT", "DELETE"])
def dataset(id):
    # TODO: Replace this implementation with a call to the dataset router
    data = request.get_json()
    print(data)
    return jsonify(data)


if __name__ == "__main__":
    with app.app_context():
        from models.user import User
        from models.dataset import Dataset

        db.metadata._add_table(User.__tablename__, None, User.__table__)
        db.metadata._add_table(Dataset.__tablename__, None, Dataset.__table__)
        db.create_all()

    app.run(host="0.0.0.0", port=5000, debug=True)
