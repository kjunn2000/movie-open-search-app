import json
import requests

# region = '' # For example, us-west-1
# service = 'es'
# credentials = boto3.Session().get_credentials()
# awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

host = 'http://movie-world.us-east-1.opensearch.localhost.localstack.cloud:4566'
index = 'movies'
url = host + '/' + index + '/_search'

# Lambda execution starts here
def handler(event, context):
    payload = event['body']
    
    data = json.loads(payload)

    query = {
        "size": 25,
        "query": {
            "multi_match": {
                "query": data['movieName'],
                "fields": ["title^4", "plot^2", "actors", "directors"]
            }
        }
    }

    # Elasticsearch 6.x requires an explicit Content-Type header
    headers = { "Content-Type": "application/json" }

    # Make the signed HTTP request
    r = requests.post(url, headers=headers, data=json.dumps(query))

    # Create the response and add some extra content to support CORS
    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": '*'
        },
        "isBase64Encoded": False
    }

    # Add the search results to the response
    response['body'] = r.text
    return response

