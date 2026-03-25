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


def get_cwe_summary(cwe_id: str):
    """Return a smaller, easier-to-use CWE summary object."""
    data = get_cwe_by_id(cwe_id)

    weaknesses = data.get("Weaknesses", [])
    if not weaknesses:
        return {
            "id": cwe_id,
            "name": "Unknown CWE",
            "description": "No description returned from CWE API.",
        }

    weakness = weaknesses[0]

    return {
        "id": f"CWE-{weakness.get('ID', 'Unknown')}",
        "name": weakness.get("Name", "Unknown CWE"),
        "description": weakness.get("Description", "No description available."),
    }
