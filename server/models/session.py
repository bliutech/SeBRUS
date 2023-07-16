from app import db


class Session(db.Model):
    __tablename__ = "sessions"

    _count = 0

    id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    token = db.Column(db.String(24), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __init__(self, token, user_id):
        # account for existing sessions before class is first initialized
        count = db.session.query(self.__class__).count()
        if count != 0:
            Session._count = count

        # initialze the session
        self.id = Session._count
        self.token = token
        self.user_id = user_id

        # increment the count to track session ids
        Session._count += 1

    def __repr__(self):
        return "<Session %r>" % self.token

    def json(self):
        return {"id": self.id, "token": self.token, "user_id": self.user_id}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
