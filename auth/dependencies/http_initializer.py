import requests


class HTTPClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def _make_request(self, method, endpoint, data=None):
        url = f"{self.base_url}/{endpoint}"
        try:
            response = requests.request(method, url, json=data)
            response.raise_for_status()  # Raise an exception for HTTP errors
            return response
        except requests.exceptions.RequestException as e:
            raise Exception(f"Request error: {e}")
        except Exception as e:
            raise Exception(f"An error occurred: {e}")

    def get(self, endpoint):
        return self._make_request("GET", endpoint)

    def post(self, endpoint, data=None):
        return self._make_request("POST", endpoint, data)

    def put(self, endpoint, data=None):
        return self._make_request("PUT", endpoint, data)

    def delete(self, endpoint):
        return self._make_request("DELETE", endpoint)


