import os

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

import config

import routes.user as user

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


if __name__ == "__main__":
    with app.app_context():
        from models.user import User

        db.metadata._add_table(User.__tablename__, None, User.__table__)
        db.create_all()

    app.run(host="0.0.0.0", port=5000, debug=True)
