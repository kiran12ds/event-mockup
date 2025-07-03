from flask import Flask, request, jsonify

app = Flask(__name__)

# Mock database for PNG asset keywords → affiliate links
MOCK_PRODUCTS = {
    "marigold garland": {
        "label": "Marigold Garland",
        "affiliateLink": "https://www.amazon.com/dp/B09FAKE001?tag=yourtag-20"
    },
    "gold mandap": {
        "label": "Gold Wedding Mandap",
        "affiliateLink": "https://www.etsy.com/listing/123456789/gold-mandap-decor"
    },
    "balloon arch": {
        "label": "Balloon Arch Kit",
        "affiliateLink": "https://www.walmart.com/ip/balloon-arch-fake"
    }
}

@app.route('/api/amazon-search', methods=['GET'])
def mock_amazon_search():
    keyword = request.args.get('keyword', '').lower()

    # Find closest match
    for key, product in MOCK_PRODUCTS.items():
        if key in keyword:
            return jsonify(product)
    
    # Fallback for unknown terms
    return jsonify({
        "label": keyword,
        "affiliateLink": "https://www.amazon.com/s?k=" + keyword.replace(" ", "+")
    })

if __name__ == '__main__':
    app.run(debug=True)
