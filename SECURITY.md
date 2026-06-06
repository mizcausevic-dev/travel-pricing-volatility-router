# Security

This repository uses synthetic route and fare evidence only.

Do not commit:

- passenger records, loyalty identifiers, payment data, or supplier contracts
- credentials, private keys, deploy tokens, or local machine paths
- live fare inventory extracts or partner-seat data

Before release, run local verification plus the standard sensitive-string and local-path scanner.
