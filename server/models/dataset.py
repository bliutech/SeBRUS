from app import db


class Dataset(db.Model):
    __tablename__ = "datasets"

    id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    datasetName = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(80), unique=True, nullable=False)
    address = db.Column(db.String(80), unique=True, nullable=False)
    count = 0

    def __init__(self, id, datasetName, description, address):
        count = id
        self.datasetName = datasetName
        self.description = description
        self.address = address
        Dataset.count += 1

    def json(self):
        return {
            "id": self.id,
            "datasetName": self.datasetName,
            "description": self.description,
            "address": self.address,
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
