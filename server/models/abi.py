from app import db


class ABI(db.Model):
    __tablename__ = "abis"

    # TODO: add columns
    id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)

    # TODO: add constructor
    def __init__(self):
        pass

    # TODO: add __repr__
    def __repr__(self):
        pass

    # TODO: add json
    def json(self):
        return {}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
