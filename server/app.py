from flask import Flask, request, jsonify
import boto3
import hashlib
import hmac
import json
import time
import requests

app = Flask(__name__)

ACCESS_KEY = 'YOUR_AMAZON_ACCESS_KEY'
SECRET_KEY = 'YOUR_AMAZON_SECRET_KEY'
ASSOCIATE_TAG = 'yourtag-20'

def get_affiliate_link(keyword):
    url = 'https://webservices.amazon.com/paapi5/searchitems'
    payload = {
        "Keywords": keyword,
        "PartnerTag": ASSOCIATE_TAG,
        "PartnerType": "Associates",
        "Marketplace": "www.amazon.com",
        "Resources": [
            "Images.Primary.Small",
            "ItemInfo.Title",
            "Offers.Listings.Price",
            "DetailPageURL"
        ]
    }

    headers = {
        'Content-Type': 'application/json',
        'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems'
    }

    session = boto3.session.Session()
    credentials = session.get_credentials()
    client = session.client(
        'sts',
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY,
        region_name='us-east-1'
    )

    signed = requests.post(url, data=json.dumps(payload), headers=headers, auth=client)
    data = signed.json()
    try:
        return data['SearchResult']['Items'][0]['DetailPageURL']
    except:
        return None

@app.route('/api/amazon-search')
def amazon_search():
    keyword = request.args.get('keyword')
    if not keyword:
        return jsonify({'error': 'Missing keyword'}), 400
    link = get_affiliate_link(keyword)
    return jsonify({'affiliateLink': link or '#'})


if __name__ == '__main__':
    app.run(debug=True)
