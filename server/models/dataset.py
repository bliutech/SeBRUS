from app import db


class Dataset(db.Model):
    __tablename__ = "datasets"

    id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), unique=True, nullable=False)
    abi_id = db.Column(db.Integer, db.ForeignKey("abis.id"), nullable=False)

    _count = 0

    def __init__(self, name, description, address, abi_id):
        datasets = db.session.query(self.__class__).all()
        count = len(datasets)

        if count != 0:
            if datasets[-1].id >= Dataset._count:
                Dataset._count = datasets[-1].id + 1
            else:
                Dataset._count = count

        self.id = Dataset._count
        self.name = name
        self.description = description
        self.address = address
        self.abi_id = abi_id

        Dataset._count += 1

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "address": self.address,
            "abi_id": self.abi_id,
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
