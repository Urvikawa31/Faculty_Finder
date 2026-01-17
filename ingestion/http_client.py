import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

DEFAULT_HEADERS = {
    "User-Agent": "FacultyFinderBot/1.0"
}

def get_session(
    total_retries: int = 3,
    backoff_factor: float = 1.0,
    timeout: int = 15
):
    """
    Returns a requests.Session configured with retry and exponential backoff.

    Retries on:
    - Connection errors
    - HTTP 500, 502, 503, 504

    Backoff pattern:
    1s → 2s → 4s
    """

    session = requests.Session()
    session.headers.update(DEFAULT_HEADERS)

    retries = Retry(
        total=total_retries,
        connect=total_retries,
        read=total_retries,
        backoff_factor=backoff_factor,
        status_forcelist=[500, 502, 503, 504],
        allowed_methods=["GET"],
        raise_on_status=False
    )

    adapter = HTTPAdapter(max_retries=retries)
    session.mount("http://", adapter)
    session.mount("https://", adapter)

    # Attach timeout as a session attribute (clean pattern)
    session.request = _inject_timeout(session.request, timeout)

    return session


def _inject_timeout(request_func, timeout):
    def wrapper(*args, **kwargs):
        kwargs.setdefault("timeout", timeout)
        return request_func(*args, **kwargs)
    return wrapper