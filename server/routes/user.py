#!/usr/bin/env python3
from flask import jsonify, request


def router():
    if request.method == "GET":
        return get()
    if request.method == "POST":
        return post()
    if request.method == "PUT":
        return put()
    if request.method == "DELETE":
        return delete()
    return jsonify(), 500

def get():  
    
    # getting user

    users = User.query.all()
    return jsonify([user.serialize() for user in users])

def post(): 

    # creating user

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

def put(user_id):

    # updating user

    user = User.query.get(user_id)
    if user:
        data = request.get_json()
        user.username = data.get('username')
        user.password = data.get('password')
        db.session.commit()
        return jsonify(user.serialize())
    return jsonify({'message': 'User not found'}), 404


def delete(user_id):

    # deleting user

    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted'})
    return jsonify({'message': 'User not found'}), 404