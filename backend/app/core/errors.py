from fastapi import HTTPException, status


def integration_unavailable(name: str) -> HTTPException:
    return HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=f"{name} integration is not configured.")
