from flask import request, jsonify

# from models.abi import Abi


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

    res["status"] = "ABI not found."

    return jsonify(res), 404


# TODO: implement POST handler
def post(id):
    res = {"status": ""}

    from app import app, db

    res["status"] = "ABI not found."

    return jsonify(res), 404


# TODO: implement PUT handler
def put(id):
    res = {"status": ""}

    from app import app, db

    res["status"] = "ABI not found."

    return jsonify(res), 404


# TODO: implement DELETE handler
def delete(id):
    res = {"status": ""}

    from app import app, db

    res["status"] = "ABI not found."

    return jsonify(res), 404
