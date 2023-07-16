from flask import request, jsonify
from models.dataset import Dataset
from app import app, db

with app.app_context():
      datasets = db.session.query(Dataset).all()


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

def get(id):
    res = {"status": ""}

    dataset = Dataset.query.filter_by(id=id).first()
    if dataset is None:
        res = {"status": "failure"}
        return jsonify({"error": "Dataset not found"}, res), 404
    else:
        res = {"status": "success"}
        return jsonify(dataset.json(), res), 200


def post():
    res = {"status": ""}

    data = request.json
    datasetName = data.get("datasetName")
    description = data.get("description")
    address = data.get("address")

    if (
        datasetName is None
        or description is None
        or address is None
    ):
        res = {"status": "no datasets"}
        return jsonify(res), 400
    elif Dataset.query.filter_by(datasetName=datasetName).first():
        res = {"status": "existing dataset"}
        return jsonify({}, res), 409
    else:
        new_dataset = Dataset(
            datasetName=datasetName,
            description=description,
            address=address,
        ) 
        res = {"status": "new dataset"}
        new_dataset.save_to_db()
        return jsonify(new_dataset.json(), res), 200


# check this!
def put(id):
    res = {"status": ""}

    data = request.json
    datasetName = data.get("datasetName")
    description = data.get("description")
    address = data.get("address")

    if (
        datasetName is None
        or description is None
        or address is None
    ):
        res = {"status": "dataset does not exist"}
        return jsonify(res), 400
    elif (
        datasetName not in data
        or description not in data
        or address not in data
    ):
        res = {"status": "not in dataset"}
        return jsonify({}, res), 404
    else:
        new_dataset = Dataset(
            datasetName=datasetName,
            description=description,
            address=address,
        )  # is this correct?
        res = {"status": "new dataset"}
        new_dataset.save_to_db()
        return jsonify(new_dataset.json(), res), 200


def delete(id):
    res = {"status": ""}

    dataset = Dataset.query.get(id)
    if dataset is None:
        res = {"status": "no dataset"}
        return jsonify({}, res), 404
    else:
        res = {"status": "dataset removed"}
        dataset.remove_from_db()
        return jsonify(res), 200