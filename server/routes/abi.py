from flask import request, jsonify

import os
import json

from config import ABI_FOLDER


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


def get(id):
    res = {"status": ""}

    from app import app, db
    from models.abi import ABI

    with app.app_context():
        abi = db.session.query(ABI).filter_by(id=id).first()

        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404

        res["status"] = "ABI found."

        with open("abi/" + abi.name + ".json", "r") as f:
            abi = json.load(f)

        res["abi"] = abi
        return jsonify(res), 200


def post():
    res = {"status": ""}

    data = request.json

    name = data.get("name")
    abi_param = data.get("abi")

    from app import app, db
    from models.abi import ABI

    with app.app_context():
        abi = db.session.query(ABI).filter_by(name=name).first()

        if abi is not None:
            res["status"] = "ABI already exists."
            return jsonify(res), 409

        abi = ABI(name=name)

        with open("abi/" + name + ".json", "w") as f:
            f.write(json.dumps(abi_param, indent=4))

        abi.save_to_db()

        res["status"] = "ABI registered."
        res["abi"] = abi.json()
        return jsonify(res), 201


def put(id):
    res = {"status": ""}

    data = request.json

    name = data.get("name")
    abi_param = data.get("abi")

    if name is None or abi is None:
        res["status"] = "`name` and `abi` are required."
        return jsonify(res), 400

    from app import app, db
    from models.abi import ABI

    with app.app_context():
        abi = db.session.query(ABI).filter_by(id=id).first()

        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404

        abi.name = name

        file_path = os.path.join(ABI_FOLDER, name + ".json")

        with open(file_path, "w") as outfile:
            outfile.write(json.dumps(abi_param, indent=4))

        res["status"] = "Updated ABI."
        res["abi"] = abi_param
        return jsonify(res), 200


def delete(id):
    res = {"status": ""}

    from app import app, db
    from models.abi import ABI

    with app.app_context():
        abi = db.session.query(ABI).filter_by(id=id).first()

        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404

        file_path = os.path.join(ABI_FOLDER, abi.name + ".json")
        os.remove(file_path)

        abi.delete_from_db()

        res["status"] = "ABI removed."
        return jsonify(res), 200
