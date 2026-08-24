# WHMCS Integration Setup

The Dounvile server reads the following values exclusively from the project secret manager. Do not expose these values in any variable prefixed with `VITE_`, and do not put them in browser code.

| Secret | Purpose |
| --- | --- |
| `WHMCS_URL` | HTTPS endpoint for the WHMCS API, typically the `includes/api.php` URL. |
| `WHMCS_API_IDENTIFIER` | WHMCS API identifier used by server-to-server requests. |
| `WHMCS_API_SECRET` | WHMCS API secret used only on the server. |
| `WHMCS_API_ACCESS_KEY` | Optional legacy access key, where the WHMCS installation requires it. |

The application rejects non-HTTPS endpoints as unconfigured. The public catalog procedure returns only availability state and approved pricing data; it never returns endpoint details, identifiers, tokens, or secrets. Customer data is queried only after a server-side Dounvile-user to WHMCS-client identity link is established. Administrator summaries additionally require the authenticated `admin` role.
