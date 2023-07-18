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
    from app import app, db
    from models.user import User
    from models.dataset import Dataset

    with app.app_context():
        dataset = None
        if id == "all":
            dataset = db.session.query(Dataset).all()
        else:
            dataset = [db.session.query(Dataset).filter_by(id=id).first()]

        if dataset is None:
            res["status"] = "Dataset not found."
            return jsonify(res), 404

        res["status"] = "Dataset found."
        res["dataset"] = [dataset.json() for dataset in dataset]
        return jsonify(res), 200


def post():
    data = request.json

    res = {"status": ""}

    name = data.get("name")
    description = data.get("description")
    address = data.get("address")

    if name is None or description is None or address is None:
        res["status"] = "`name`, `description`, or `address` required."
        return jsonify(res), 400

    from app import app, db
    from models.dataset import Dataset

    with app.app_context():
        dataset = db.session.query(Dataset).filter_by(name=name).first()

        if dataset is not None:
            res["status"] = "Dataset already exists."
            return jsonify(res), 409

        new_dataset = Dataset(
            datasetName=name, description=description, address=address
        )
        new_dataset.save_to_db()

        res["status"] = "New dataset created."
        res["dataset"] = new_dataset.json()

        return jsonify(res), 201


def put(id):
    data = request.json

    name = data.get("name")
    description = data.get("description")
    address = data.get("address")

    res = {"status": ""}

    if name is None or description is None or address is None:
        res["status"] = "`name`, `description`, or `address` required."
        return jsonify(res), 400

    from app import app, db
    from models.dataset import Dataset

    with app.app_context():
        dataset = db.session.query(Dataset).filter_by(id=id).first()

        if dataset is None:
            res["status"] = "Dataset not found."
            return jsonify(res), 404

        dataset.datasetName = name
        dataset.description = description
        dataset.address = address
        dataset.save_to_db()

        res["status"] = "Dataset edited."
        res["dataset"] = dataset.json()
        return jsonify(res), 200


def delete(id):
    res = {"status": ""}

    from app import app, db
    from models.dataset import Dataset

    with app.app_context():
        dataset = db.session.query(Dataset).filter_by(id=id).first()
        if dataset is None:
            res["status"] = "Dataset does not exist."
            return jsonify(res), 404

        dataset.delete_from_db()

        res["status"] = "Dataset deleted."
        return jsonify(res), 200
