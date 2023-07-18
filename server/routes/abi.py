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


def get(id, name): #pretty sure this incorrect, but i wasn't super sure how to go about it.
    res = {"status": ""}

    from app import app, db
    with app.app_context():
        abi = ABI.query.filter_by(id=id).first()
        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404
        else:
            res["status"] = "ABI found."

            import json
            with open('abi/' + name + '/.json', 'r') as openfile:
                abi = json.load(openfile) #changed write to read, i think i was writing the wrong code for this earlier LOL
                print(abi)
                print(type(abi))
                res['abi'] = abi
            #not sure if this is what you meant?
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
    abi = json.dumps(dictionary, indent=4)

    with open("abi/" + name + "/.json", "w") as outfile:
        outfile.write(abi)

    with app.app_context():
        abi = ABI.query.filter_by(id=id).first()
        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404
        else:
            res["status"] = "ABI found."
            return jsonify(res), 200


def put(id):
    res = {"status": ""}
    data = request.json
    id = data.get("id")
    name = data.get("name")
    abi = data.get("abi")

    from app import app, db
    import json
    dictionary = {
        "name": name,
        "id": id,
        "abi": abi
    }

    abi = json.dumps(dictionary, indent=4)

    with open("abi/" + name + "/.json", "w") as outfile:
        outfile.write(abi)

    with app.app_context():
        abi = db.session.query(ABI).filter_by(id=id).first()

        if name is None or id is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404
        elif name not in abi or id not in abi:
            res["status"] = "Not in ABI."
            return jsonify(res), 400
        else:
            new_ABI = abi(
                name=name, id=id, abi=abi
            )
            res["status"] = "New ABI."
            new_ABI.save_to_db()
            return jsonify(res), 200


def delete(id):
    import os
    res = {"status": ""}
    data = request.json
    name = data.get("name")

    from app import app, db

    with app.app_context():
        abi = ABI.query.get(id)
        if abi is None:
            res["status"] = "ABI not found."
            return jsonify(res), 404
        else:
            res["status"] = "ABI removed."
            abi.delete_from_db()
            file_path = 'abi/' + name + '.json'
            os.remove(file_path) #good?
            return jsonify(res), 200