#!/usr/bin/env python3

from flask import Flask, json, request
from flask_cors import CORS
from dataclasses import dataclass


@dataclass
class State:
    name:   str = ""
    age:    int = 0


state = State()

api = Flask(__name__)
CORS(api)


def create_response(data=None, status=200):
    success = status < 400
    response = {"success": success}
    if data is not None:
        response["data"] = data

    headers = {
        "ContentType": "application/json",
    }

    return json.dumps(response), status, headers


@api.route("/heartbeat", methods=["GET"])
def get_heartbeat():
    return create_response()


@api.route("/person", methods=["GET", "PUT"])
def handle_person():
    if request.method == "GET":
        return get_person()
    else:
        return put_person()


def get_person():
    return create_response(
        {
            "name": state.name,
            "age": state.age
        }
    )


def put_person():
    body = request.get_json()
    missing_name = "name" not in body
    missing_age = "age" not in body
    if missing_age or missing_name:
        return create_response(status=500)

    state.name = body["name"]
    state.age = body["age"]

    return create_response()
