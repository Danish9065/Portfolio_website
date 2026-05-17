# API Contract

Contact request:

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "purpose": "job",
  "company": "Optional",
  "budget": "Optional",
  "message": "At least 20 characters"
}
```

Contact response:

```json
{
  "status": "success | partial_success | error",
  "message": "Honest delivery/storage result",
  "inquiry_id": "uuid or null",
  "email_sent": true,
  "stored": true
}
```

Chat request:

```json
{
  "message": "What projects are featured?",
  "session_id": "optional"
}
```

Chat response:

```json
{
  "message": "Grounded answer or credential fallback",
  "session_id": "uuid",
  "configured": false
}
```
