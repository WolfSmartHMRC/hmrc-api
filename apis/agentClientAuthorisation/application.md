# Agent Client Authorisation API documentation version 0.0
https://api.service.hmrc.gov.uk/

### Overview
An API for agents and clients akin to the paper 64-8 form.
  
The production version of this API is not yet available, only the test version which should be accessed using your test credentials.  Breaking changes are expected before this API is finalised.

### Versioning
Specific versions are requested by providing an Accept header. When
backwards-incompatible API changes are made, a new version will be released.
Backwards-compatible changes are released in the current version without the
need to change your Accept header.  See our
[reference guide](/api-documentation/docs/reference-guide#versioning)
for more on versioning.

### Errors
HMRC uses standard
[HTTP status codes](/api-documentation/docs/reference-guide#http-status-codes)
to indicate the success or failure of an API request. In general, status codes
in the 2xx range indicate success. Status codes in the 4xx range indicate a
client error, and have a consistently formed JSON response body. Codes in the
5xx range indicate errors on the HMRC server. API-specific errors are shown in
the relevant resource's response detail. See our
[reference guide](/api-documentation/docs/reference-guide#errors)
for more on errors.

---

## /agent-client-authorisation/agencies/{arn}/invitations/sent

### /agent-client-authorisation/agencies/{arn}/invitations/sent

* **get** *(secured)*: Retrieves a list of invitations sent by the agency.
* **post** *(secured)*: 

### /agent-client-authorisation/agencies/{arn}/invitations/sent/{invitationId}

* **get** *(secured)*: Retrieve a sent invitation.

### /agent-client-authorisation/agencies/{arn}/invitations/sent/{invitationId}/cancel

* **put** *(secured)*: Cancel an invitation.

## /agent-client-authorisation/clients/{clientId}/invitations/received

### /agent-client-authorisation/clients/{clientId}/invitations/received

* **get** *(secured)*: Retrieves a list of invitations received by a client

### /agent-client-authorisation/clients/{clientId}/invitations/received/{invitationId}

* **get** *(secured)*: Retrieve a received invitation.

### /agent-client-authorisation/clients/{clientId}/invitations/received/{invitationId}/accept

* **put** *(secured)*: Accept an invitation.

### /agent-client-authorisation/clients/{clientId}/invitations/received/{invitationId}/reject

* **put** *(secured)*: Reject an invitation.

