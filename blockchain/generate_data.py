#!/usr/bin/env python3

"""
generate_data.py - A helper script to generate data for the blockchain. This script will generate
                    data for the MNIST, CIFAR10, and FashionMNIST datasets.

Usage:
    python generate_data.py <dataset_name>

Dependencies:
    pip install torch torchvision
"""


import sys
import base64
from torchvision import datasets, transforms

if len(sys.argv) != 2:
    print("Usage: python generate_data.py <dataset_name>")
    exit(1)

dataset = None
dataset_name = sys.argv[1]

print("Generating data for dataset:", dataset_name)

if dataset_name == "MNIST":
    dataset = datasets.MNIST("./data", train=True, download=True)
elif dataset_name == "CIFAR10":
    dataset = datasets.CIFAR10("./data", train=True, download=True)
elif dataset_name == "FashionMNIST":
    dataset = datasets.FashionMNIST("./data", train=True, download=True)
else:
    print("Invalid dataset name.")
    exit(1)

print("Dataset:", dataset)

test_data = dataset.data

for i, tensor in enumerate(test_data):
    img = transforms.ToPILImage()(test_data[1])
    base64_img = base64.b64encode(img.tobytes())
    img.save("data/" + str(i) + ".png")
    break
