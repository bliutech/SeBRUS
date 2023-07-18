from app import db


class ABI(db.Model):
    __tablename__ = "abis"

    id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def __init__(self, id, name):
        abi = db.session.query(self.__class__).all()
        count = len(abi)

        if count != 0:
            if abi[-1].id >= ABI._count:
                ABI._count = abi[-1].id
            else:
                ABI._count = count

        self.id = id
        self.name = name

        ABI._count += 1


    def __repr__(self):
        return "<ABI %r>" % self.name


    def json(self):
        return {"id": self.id, "name": self.name}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
