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
    # TODO: implement getting user
    return jsonify(), 200

def post():
    # TODO: implement creating user
    return jsonify(), 200

def put():
    # TODO: implement updating user
    return jsonify(), 200

def delete():
    # TODO: implement deleting user
    return jsonify(), 200