# food-delivery
---
## Environment variables & secrets 

Important: Do NOT commit real secrets into the repo. Use the provided ackend/.env.example as a template and set real values in environment variables or a secrets manager.

Steps to use environment variables locally:
1. Copy ackend/.env.example to ackend/.env.
2. Edit ackend/.env and fill in real values (do not commit this file).

If a secret was accidentally committed (like in this repository):
- Rotate the compromised secret immediately (Stripe key, DB credentials, JWT secret, etc.).
- Replace the secret in your local files and CI environment.
- Consider revoking keys and creating new ones on the provider dashboard.

If you notice secrets in the Git history, they may have been exposed — treat them as compromised and rotate them now.

---

