# #!/usr/bin/env python3
from app import db
from . import user


def init():
    from app import app

    with app.app_context():
        db.create_all()
