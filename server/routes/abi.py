from flask import request, jsonify
from models.abi import ABI


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
    with app.app_context():
        abi = ABI.query.filter_by(id=id).first()
        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404
        else:
            res["status"] = "ABI found."
            return jsonify(res), 200


def post():
    res = {"status": ""}
    data = request.json 
    id = data.get("id")
    name = data.get("name")
    abi = abi.get("abi")

    from app import app, db
    import json
    dictionary = {
        "name": name,
        "id": id,
        "abi": abi
    }

    with open("output.json", "w") as outfile:
        json.dump(dictionary, outfile)

    with app.app_context(): #did i do this part correctly?
        abi = ABI.query.filter_by(id=id).first()
        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404
        else:
            res["status"] = "ABI found."
            return jsonify(res), 200


def put(id):
    res = {"status": ""}
    abi = request.json  # is this what it means when it says an abi field?
    id = abi.get("id")
    name = abi.get("name")
    abi = abi.get("abi")

    from app import app, db
    import json
    dictionary = {
        "name": name,
        "id": id,
        "abi": abi
    }

    with open("output.json", "w") as outfile:
        json.dump(dictionary, outfile)

    with app.app_context(): #not quite sure if this is correct
        abi = ABI.query.filter_by(id=id).first()
        if name is None or id is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404
        elif name not in abi or id not in abi:
            res["status"] = "not in ABI."
            return jsonify(res), 400
        else:
            new_ABI = abi(
                name=name, id=id, abi=abi
            )
            res["status"] = "new ABI."
            new_ABI.save_to_db()
            return jsonify(res), 200


def delete(id):
    res = {"status": ""}

    from app import app, db

    with app.app_context():
        abi = ABI.query.get(id)
        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404
        else:
            res["status"] = "ABI removed."
            abi.delete_from_db()
            return jsonify(res), 200