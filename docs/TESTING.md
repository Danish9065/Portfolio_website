# Testing

Frontend:

```bash
npm --prefix frontend install
npm --prefix frontend run build
npm --prefix frontend run lint
```

Backend:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
PYTHONPATH=backend pytest backend/tests
```

Manual QA:

- Visit every public route.
- Confirm admin routes reject protected actions without login.
- Submit contact with missing credentials and verify honest error state.
- Open chat without Gemini and verify fallback text.
- Check mobile navigation and reduced-motion fallback.
