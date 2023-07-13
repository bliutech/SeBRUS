from flask import request, jsonify


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

    from models.dataset import Dataset

    # dataset = Dataset.query.filter_by(id = dataset_id).first()
    # if dataset is None:
    #    return jsonify({'error': 'Dataset not found'}, {'status': 'failure'}),404
    # else:
    #    return jsonify(dataset.json(), {'status': 'success'}), 200

    res["status"] = "Dataset not found."
    return jsonify(res), 404


def post():
    res = {"status": ""}

    # data = request.json

    # if dataset_datasetName is None or dataset_description is None or dataset_address is None:
    #      return jsonify({'status': 'no datasets'}), 400
    # elif Dataset.query.filter_by(datasetName = dataset_datasetName).first():
    #     return jsonify({}, {'status': 'existing dataset'}), 409
    # else:
    #     new_dataset = Dataset(datasetName = dataset_datasetName, description=dataset_description, address=dataset_address) #is this correct?
    #     new_dataset.save_to_db()
    #     return jsonify(new_dataset.json(), {'status': 'new dataset'}), 200

    res["status"] = "Dataset not found."
    return jsonify(res), 404


# check this!
def put(id):
    res = {"status": ""}

    # data = request.json
    # if dataset_datasetName is None or dataset_description is None or dataset_address is None:
    #      return jsonify({'status': 'dataset does not exist'}), 400
    # elif dataset_datasetName not in data or dataset_description not in data or dataset_address not in data:
    #     return jsonify({}, {'status': 'not in dataset'}), 404
    # else:
    #     new_dataset = Dataset(datasetName = dataset_datasetName, description=dataset_description, address=dataset_address) #is this correct?
    #     new_dataset.save_to_db()
    #     return jsonify(new_dataset.json(), {'status': 'new dataset'}), 200

    res["status"] = "Dataset not found."
    return jsonify(res), 404


def delete(id):
    res = {"status": ""}

    # dataset = Dataset.query.get(dataset_id)
    # if dataset is None:
    #     return jsonify({}, {'status': 'no dataset'}), 404
    # else:
    #     dataset.remove_from_db()
    #     return jsonify({'status': 'dataset removed'}), 200

    res["status"] = "Dataset not found."
    return jsonify(res), 404
