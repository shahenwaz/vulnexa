"""Service functions for talking to the MITRE CWE API."""

import requests

BASE_URL = "https://cwe-api.mitre.org/api/v1"


def get_cwe_by_id(cwe_id: str):
    """Fetch a CWE weakness by ID from the MITRE CWE API."""
    normalized_id = cwe_id.upper().replace("CWE-", "").strip()
    url = f"{BASE_URL}/cwe/weakness/{normalized_id}"

    response = requests.get(url, timeout=20)
    response.raise_for_status()

    return response.json()
