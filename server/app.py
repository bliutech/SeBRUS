#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

import config

from os.path import exists

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = config.DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


@app.route("/api", methods=["GET", "POST", "PUT", "DELETE"])
def api():
    data = request.get_json()
    print(data)
    return jsonify(data)


@app.route("/api/user/<id>", methods=["GET", "POST", "PUT", "DELETE"])
def user(id):
    data = request.get_json()
    print(data)
    return jsonify(data)


if __name__ == "__main__":
    if not exists(config.DATABASE_URI[9:]):
        import models

        models.init()
    app.run(debug=True, host="0.0.0.0", port=5000)
