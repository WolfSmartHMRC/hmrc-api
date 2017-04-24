# Self Assessment (MTD) API documentation version 1.0
https://api.service.hmrc.gov.uk/

### Overview
The Making Tax Digital (MTD) Self Assessment API allows software packages to provide a taxpayer's financial data for 
their self-employment and UK property businesses, and other personal income, and to request and view their tax 
calculation. This data includes income, expenses, and allowances etc. for each business, as well as personal savings 
interest and dividends. 

To meet their obligations, taxpayers are required to submit regular financial updates for 
each of their businesses. Typically these updates cover four 3-month _obligation periods_, with one set of 
_obligation periods_ per business per accounting period. To meet the taxpayer's obligation for a particular _obligation period_
for a business:
* Supply summarised transactions for income and expenditure for the the whole of the _obligation period_ for that specific business
* Request a tax calculation

The data for each _obligation period_ can be provided either as a single _update period_, 
or as multiple smaller _update periods_, covering the whole period so long as there are no gaps, and no overlaps 
amongst the _update periods_.

More accurate tax calculations can be provided when businesses' allowances and adjustments, and personal savings 
and dividend income are also provided, though these details are not required to meet obligations.

### Unauthorised Agents (Filing Only Agents) ###

Where an agent is not authorised by the taxpayer to fully represent the taxpayer, then the agent is only allowed to 
send data to HMRC. These agents are sometimes referred to as Filing Only Agents, meaning that they can submit (file) taxpayer 
data to HMRC, but cannot retrieve existing data.

* Read (i.e. GET) requests are rejected
* Write (i.e. POST and PUT) requests are processed normally; however, certain errors may be generalised to protect user information.

The above restrictions mean it is not possible for an unauthorised agent to use the APIs to obtain certain data 
necessary to submit an update. For example, pre-existing business identifiers or pre-existing periodic update identifiers 
must be recorded on creation, or obtained from a source that does have access, e.g. the taxpayer.

### Notes ###
* This API is usable only for taxpayers subscribed to Making Tax Digital (MTD) and only for tax years 2017/18 onwards.
* Self-employment and UK property businesses will be known to HMRC  as part of the MTD subscription process.
* Some APIs may be marked "test only"; this means that they are not available for use in production.

### Terminology
### Obligations ###

The _obligations_ are defined as a set of date periods for which a taxpayer must provide summary 
income and expense data. Each obligation has a start date and an end date which together define the _obligation period_. 
For MTD, each business has multiple obligations which are based on its accounting period. 
Please read below for more detail.

### Update Period ###
An _update period_ is defined as a set of summarised income and expenses for a period of 
time within an obligation, covering from 1 day to the whole obligation, containing totalled income and expenses 
broken down by category. Please read below for more detail.

### Annual Summary ###
An _annual summary_ is defined as a set of summary data for a tax year, containing allowances and adjustments 
broken down by category. Please read below for more detail.

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

### Error Codes
Below are some example errors, for specific errors refer to the individual resources below 


HTTP status : 400

Example error responses returned if invalid values are present in the url. 
<pre class="snippet--block code_text">
{
  "code": "NINO_INVALID",
  "message": "The provided Nino is invalid"
}
</pre>

<pre class="snippet--block code_text">
{
  "code": "TAX_YEAR_INVALID",
  "message": "Tax year invalid"
}
</pre>

Example error response returned if invalid values are present in the body of POST/PUT.
<pre class="snippet--block code_text">
{
  "code": "INVALID_REQUEST",
  "message": "Invalid request",
    "errors": [
    {
      "code": "INVALID_MONETARY_AMOUNT",
      "message": "amounts should be non-negative numbers with up to 2 decimal places",
      "path": "/allowances/annualInvestmentAllowance"
    },
    {
      "code": "INVALID_MONETARY_AMOUNT",
      "message": "amounts should be non-negative numbers with up to 2 decimal places",
      "path": "/adjustments/averagingAdjustment"
    }
  ]
}
</pre>



HTTP status : 403
<pre class="snippet--block code_text">
{
  "code": "BUSINESS_ERROR",
  "message": "Business validation error",
  "errors": [
    {
      "code": "TOO_MANY_SOURCES",
      "message": "The maximum number of Self-Employment incomes sources is 1",
      "path": ""
    }
  ]
}
</pre>



---

## /self-assessment

### /self-assessment/ni/{nino}/self-employments

* **post** *(secured)*: Add a self-employment business. This API is not available in production.
* **get** *(secured)*: List all self-employment businesses

### /self-assessment/ni/{nino}/self-employments/{selfEmploymentId}
Self-employment business

* **put** *(secured)*: Update a self-employment business. This API is not available in production.
* **get** *(secured)*: Get a self-employment business

### /self-assessment/ni/{nino}/self-employments/{selfEmploymentId}/obligations

* **get** *(secured)*: Retrieve self-employment business obligations

### /self-assessment/ni/{nino}/self-employments/{selfEmploymentId}/periods

* **post** *(secured)*: Create a self-employment update period for submission of periodic data i.e incomes and expenses
* **get** *(secured)*: List all self-employment update periods. This API is not available in production.

### /self-assessment/ni/{nino}/self-employments/{selfEmploymentId}/periods/{periodId}

* **get** *(secured)*: Get a single self-employment update period for a given identifier. This API is not available in production.
* **put** *(secured)*: Update a self-employment update period. This API is not available in production.

### /self-assessment/ni/{nino}/self-employments/{selfEmploymentId}/{taxYear}

* **put** *(secured)*: Update a self-employment annual summary for a tax year. This API is not available in production.
* **get** *(secured)*: Get a self-employment annual summary for a tax year. This API is not available in production.

### /self-assessment/ni/{nino}/uk-properties

* **post** *(secured)*: Add a UK property business. This API is not available in production.
* **get** *(secured)*: Get a UK property business

### /self-assessment/ni/{nino}/uk-properties/obligations

* **get** *(secured)*: Retrieve all UK property business obligations

### /self-assessment/ni/{nino}/uk-properties/other/periods

* **post** *(secured)*: Create a non FHL UK property update period for submission of periodic data i.e incomes and expenses
* **get** *(secured)*: List all non FHL UK property update periods. This API is not available in production.

### /self-assessment/ni/{nino}/uk-properties/other/periods/{periodId}

* **get** *(secured)*: Get a non FHL UK property update period for a given identifier. This API is not available in production.
* **put** *(secured)*: Update a non FHL UK property update period. This API is not available in production.

### /self-assessment/ni/{nino}/uk-properties/other/{taxYear}

* **put** *(secured)*: Update a non-FHL UK property business annual summary for a tax year. This API is not available in production.
* **get** *(secured)*: Get non FHL UK property business for a tax year. This API is not available in production.

### /self-assessment/ni/{nino}/uk-properties/furnished-holiday-lettings/periods

* **post** *(secured)*: Create a FHL UK property update period for submission of periodic data i.e incomes and expenses
* **get** *(secured)*: List all FHL UK property update periods. This API is not available in production.

### /self-assessment/ni/{nino}/uk-properties/furnished-holiday-lettings/periods/{periodId}

* **get** *(secured)*: Get a FHL UK property update period for a given identifier. This API is not available in production.
* **put** *(secured)*: Update a FHL UK property update period. This API is not available in production.

### /self-assessment/ni/{nino}/uk-properties/furnished-holiday-lettings/{taxYear}

* **put** *(secured)*: Update a FHL UK property business annual summary for a tax year. This API is not available in production.
* **get** *(secured)*: Get a FHL UK property business annual summary for a tax year. This API is not available in production.

### /self-assessment/ni/{nino}/dividends/{taxYear}

* **put** *(secured)*: Update a dividends income annual summary for a tax year. This API is not available in production.
* **get** *(secured)*: Get dividends income for a tax year. This API is not available in production.

### /self-assessment/ni/{nino}/savings-accounts

* **post** *(secured)*: Add a savings account. This API is not available in production.
* **get** *(secured)*: List all savings accounts. This API is not available in production.

### /self-assessment/ni/{nino}/savings-accounts/{savingsAccountId}

* **put** *(secured)*: Update a savings account. This API is not available in production.
* **get** *(secured)*: Get a savings account. This API is not available in production.

### /self-assessment/ni/{nino}/savings-accounts/{savingsAccountId}/{taxYear}

* **put** *(secured)*: Update a savings account annual summary for a given tax year. This API is not available in production.
* **get** *(secured)*: Get a savings account annual summary for a given tax year. This API is not available in production.

### /self-assessment/ni/{nino}/calculations

* **post** *(secured)*: Trigger a tax calculation. Please note that this API will return pre-defined responses that are representative of what may be returned in a future version of this API.

### /self-assessment/ni/{nino}/calculations/{taxCalculationId}

* **get** *(secured)*: Retrieve a tax calculation. Please note that this API will return pre-defined responses that are representative of what may be returned in a future version of this API.

