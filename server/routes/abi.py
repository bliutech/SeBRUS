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


# TODO: implement GET handler
def get(id):
    res = {"status": ""}

    from app import app, db

    abi = ABI.query.filter_by(id=id).first()
    if abi is None:
        res["status"] = "ABI not found."
        return jsonify(res), 404
    else:
        res["status"] = "ABI found"
        return jsonify(res), 200


# TODO: implement POST handler
def post(id):
    res = {"status": ""}
    abi = request.json  # is this what it means when it says an abi field?
    id = abi.get("id")
    fileName = abi.get("fileName")

    from app import app, db

    if ABI.query.filter_by(id=id).first():
        res["status"] = "ABI not found."
        return jsonify(res), 404
    elif ABI.query.filter_by(fileName=fileName).first():
        res["status"] = "existing ABI"
        return jsonify(res), 409
    else:  # not super sure about this else statement...
        res["status"] = "ABI found"
        return jsonify(res), 200


# TODO: implement PUT handler
def put(id):
    res = {"status": ""}
    abi = request.json  # is this what it means when it says an abi field?
    id = abi.get("id")
    fileName = abi.get("fileName")

    from app import app, db

    if fileName is None or id is None:
        res["status"] = "ABI not found."
        return jsonify(res), 404
    elif fileName not in abi or id not in abi:
        res["status"] = "not in ABI"
        return jsonify(res), 400  # are these numbers correct?
    else:
        new_ABI = abi(
            fileName=fileName, id=id  # do i need to do abi as well??? also hi :))
        )
        res["status"] = "new ABI"
        new_ABI.save_to_db()  # i'm not sure if this is correct
        return jsonify(res), 200


# TODO: implement DELETE handler
def delete(id):
    res = {"status": ""}

    abi = ABI.query.get(id)
    from app import app, db

    if ABI is None:
        res["status"] = "ABI not found."
        return jsonify(res), 404
    else:
        res["status"] = "ABI removed"
        return jsonify(res), 200
