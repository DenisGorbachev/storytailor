# Storytailor

User stories describe ideal system behavior. They have different formats: some are easier to read, some are easier to write.

**Storytailor** solves the dilemma by compiling easy-to-read stories from easy-to-write code.

## Stories

Storytailor is developed using Storytailor itself (just like compilers of certain programming languages). Below are the stories that describe ideal Storytailor behavior.

### Designer progressively designs a project

* Designer writes a [book](#book) in Markdown.
* Designer defines models:
  * Designer replaces manual definitions with generated definitions.
* Designer defines events:
  * Designer replaces manual stories with generated stories.

### Designer writes a story

* Designer interviews User to figure out desirable system behavior.
* Designer writes a story as a sequence of events.
* <span id="designer-requests-feedback-from-user">Designer requests feedback from User</span>:
  * Questions:
    * Is the story realistic?
    * Does the story miss any important events?
    * Does the story outcome match your expectations?
* If feedback implies changes:
  * Designer modifies the story according to user feedback.
  * Designer requests feedback from User ([loop](#designer-requests-feedback-from-user)).
* If feedback doesn't imply changes:
  * Designer sends the story to Programmer.

### Designer writes a multi-level story

_Draft:_
* [Designer writes a story](#designer-writes-a-story) that has multiple related continuations:
  * Example:
    * ~ Bob does submit the form with correct values
    * ~ Bob doesn't submit the form with correct values

Options:
* Render a multi-level list
* Render multiple linear stories

Notes:
* Programmer wants to see all continuations to design a good application.
* Programmer wants to see multiple linear stories to be able to implement them one-by-one.
* Tester wants to see multiple linear stories to be able to test them one-by-one.

### Follower subscribes to designer stories

* Follower reads designer story
* Follower decides that he wants to receive notifications when designer publishes another story
* Follower subscribes to designer stories
  * Follower subscribes by submitting an email form
  * Follower subscribes by joining a Telegram channel
  * Follower subscribes by following a Twitter account
  * Follower subscribes by following a Facebook account

### Designer receives feedback on changes

* [Designer writes a story](#designer-writes-a-story).
* Designer clicks "Update" in Storytailor interface.
* Storytailor pulls the changes from [data source](#data-source).
* Storytailor updates the stories in database.
* User receives a notification
  * ~ Designer sends a link to diff to User:
    * URL: https://storytailor.io/DenGorbachev/checkmytrades/definitions/trader?from=1c002dd&to=35cfb2b
  * ~ Storytailor sends a notification with a link to diff.
* User provides feedback via inline comments.
  
### Designer adds validator to a story / Designer writes a story according to high-level spec

_Draft:_
* Designer realizes that story has to correspond to high-level format in order to be correct:
  * Example:
    * Sales pitch must be written according to AIDA formula.
    * Startup development should be structured as series of experiments (Build-Measure-Learn loop).
    * Product development should include a feedback loop.

### Designer reuses definition from another project

* [Designer writes a story](#designer-writes-a-story).
* Designer decides to add a definition for "Acquisition channel"
* Designer imports "Acquisition channel" definition from sales book.

### Designer reuses stories from another project

* Designer creates a new project.
* Designer realizes it needs the same user management stories:
  * Sign up.
  * Reset password.
  * Change email.
  * Change password.
* Designer imports "User management" book in the new project.

### Programmer defines a model

* Programmer  defines a `Trade` model:
  ```
    * Fields:
      * Symbol
        * Example: "BTCUSD"
        * Type: String
      * Price
        * Example: 7500.0
        * Type: Float
      * Amount
        * Example: 10.0
        * Type: Float
    * Validations:
      * On insert:
        * Validate that available balance of current user is higher than sum of already placed order amounts + new order amount
  ```
* Programmer runs Storytailor to generate a definition.

### Programmer reuses designer model definition

* [Designer defines a model for definition](#designer-defines-a-model-for-definition).
* [Designer writes a story](#designer-writes-a-story) that uses prior model definition.
* Programmer implements a story.
  * Programmer reuses model definition in the code.
  
Note: code reuse is only possible if stories & their implementations are written in the same language.

### Designer adds comment to object property

* Designer starts writing a story
  * Title: "Exchange updates latest price"
* Designer adds event:
  ```
  * Exchange adds a trade to latest trade list:
    * Price: 10000 USD.
    * Amount: 1 BTC.
    * Type: sell.
  ```
* Designer decides to explain `Type: sell` point.
* Designer modifies the point to `Type: sell (because Bob placed a sell order after Alice)`.

### Designer marks the story as draft

* [Designer writes a story](#designer-writes-a-story).
* Designer adds `_Draft:_` marker before event list.
  * Rationale:
    * Designer writes a draft of story X.
    * Designer links to story X from story Y.
    * Designer unmarks story X as draft.
    * ++ Designer doesn't need to fix the link in story Y.
    * -- Designer has to fix the link in story Y.  

### Designer defines a loop within the story

_Draft:_

### Designer requests feedback

* [Designer writes a story](#designer-writes-a-story).
* Designer deploys the app.
* App sends a notification to each subscribed user.

### Designer receives feedback in the form of counter-story

* [Designer writes a story](#designer-writes-a-story).
* Expert reads the story.
* Expert adds a comment that is also formatted as a story.

### Designer receives feedback in the form of diff to current story

* [Designer writes a story](#designer-writes-a-story).
* Expert reads the story.
* Expert adds a comment that represents the same story but with changed steps.

Note: add "Copy parent story".

### Designer shares a private story

* [Designer writes a story](#designer-writes-a-story) that contains sensitive details:
  * Examples:
    * Salary.
    * Password.
    * API key.
* Designer specifies users that should have access to the story by adding their emails to `permissions` key.
* Storytailor checks story permissions before displaying it.

### Designer encrypts a private story within public repository

* [Designer writes a story](#designer-writes-a-story).
* Designer uses git encryption to create an unreadable public file with the story.
* Designer adds decryption password to deployment environment variables
* Designer deploys app.
* App decrypts the story.
* App displays the story to specific users (defined by story `permissions` key). 

### User personalizes story via account creation form

* [Designer writes a story](#designer-writes-a-story) using Alice as hypothetical user. 
* Bob opens story.
* Bob clicks "Personalize story"
* Bob creates an account with Storytailor.
  * Email: bob@example.com
  * Name: Bob
* Bob reads a personalized story where "Alice" is replaced with "Bob". 

### User personalizes story via inline context form

* [Designer writes a story](#designer-writes-a-story):
  * Alice trades on Coinbase if she is a US resident.
  * Alice trades on BitMEX if she is not a US resident.
* Storytailor generates an inline form:
  * Fields:
    * Are you a US resident?
      * Widget: Checkbox.
  * Buttons:
    * Apply:
      * On click: gray out story events that aren't applicable in speficied context.
    * Save as defaults:
      * On click:
        * Same as apply + save form values to account.
          * Note: allow to specify account property namespace via field name.

### Designer generates a book from Markdown

* Designer writes a book in Markdown.
* Designer writes a book loader in JS.
* User opens book page.
* [Storytailor autolinks pages](#storytailor-autolinks-pages)

### User reads table of contents

* User opens book.
* User reads table of contents.
  * User notices sections.
  * User notices page links within sections.

### Storytailor generates stories from events

* Programmer defines [events](#event)
  * Notes:
    * If Programmer wishes to test concurrency resilience, he should define more granular events
* System generates stories as event sequences
* Programmer defines updates for each step in event sequence
  * Update is a database update (insertion, removal, modification)
  
Essentially, Programmer asserts that two states are equal: test state (local flat arrays) and system state (database).

### Storytailor autolinks pages

* Storytailor displays page.
* Storytailor sorts other pages by title length.
  * Rationale: Storytailor wants to autolink more specific stories / definitions first
  * Example:
    * Designer writes a story with two steps:
      * Use exchange
      * Use peer-to-peer exchange
* Storytailor autolinks manually linked pages.
* Storytailor autolinks existing pages by fing-replacing every piece of text that is equal to existing page title. 
  * Storytailor doesn't autolink mentions surrounded by "][" (example: `]trader[`)
  * Storytailor doesn't autolink mentions within existing links.
  * Storytailor doesn't autolink mentions within linked steps.

### Storytailor places full stops at the end of the points

* Storytailor generates stories.
* Storytailor places full stops at the end of the points.

### Programmer deploys Storytailor on Now

* Programmer adds Now-specific configuration for Storytailor 
* Programmer creates an account on Now
* Programmer deploys Storyteller to Now

## Definitions

* Project is [Models](#model) + [Events](#event).
* [Objects](#object) + [Cases](#case) are specific [Models](#model) + [Events](#event).
* [Books](#book), [Sections](#section), [Pages](#page) describe [Objects](#object) + [Cases](#case) in reader-friendly format.

### Model

Model is a high-level data type. 

Notes:
* Model represents a table in PostgreSQL.
* Model represents a collection in MongoDB.

### Event

Event is a transition from state A to state B, which results in atomic database update. 

Fields:
* Name
* Args

Notes:
* Event can represent an API request
* Event can represent the passage of time
* Event can represent a change in external system behavior

### Object

Object is a unit of data that conforms to predefined [model](#model).

Notes:
* Object represents a row in a relational database.

### Case

Case is a named sequence of [events](#event).

Fields:
* Name
* Events

Notes:
* Case may be generated by Storytailor.
* Case can be used to generate a test.

### Book

Book is a collection of sections that contain pages.

Notes:
* Book is just a logical group of related content.

### Section

Section is a collection of pages.

Notes:
* Section is just a container for related pages.

### Page

Page is a piece of content.

Notes:
* Page may include notes & visualizations that simplify understanding.

### Story

Story is a page rendered from [case](#case).

Notes:
* Story can be used as:
  * Marketing collateral:
    * Teach people about how things work.
    * Motivate prospects to take action.
  * Task specifications:
    * Reach agreement with a client.
    * Describe work to potential hires.
    * Write tests for programmers.
  * Unit of knowledge:
    * Approve the result of customer discovery.
    * Share company plans with teams.
    * Motivate yourself.
* Story may require "setup" before "run":
  * A story of "Customer buys shoes online" requires setting up an online shop.
  * In this sense, a story is like a function that reads from database upon entry & writes to database upon exit.
* Story may render events in different forms:
  * Long form: all properties specified via nested list.
    * User signs up
      * Email: alice@example.com
      * Username: alice
      * Password: k34ekst93en
      * Subscribe to newsletter: yes
  * Short form: only story-relevant properties specified via nested list.
    * User signs up
      * Email: alice@example.com
      * Username: alice
  * Inline form: only story-relevant properties specified inline.
    * User signs up (username: alice)
* Story may replace direct renders of events with story-specific shortcuts:
  * Examples:
    * Without shortcuts:
    ```
      * Investor buys Spacemine Energy Token (SET):
        * Price: X
      * Investor waits until Spacemine becomes popular.
      * Investor sells Spacemine Energy Token (SET):
        * Price: Y (Y > X).
    ```
    * With shortcuts:
    ```
      * Investor buys Spacemine Energy Token (SET).
      * Investor waits until Spacemine becomes popular.
      * Investor sells Spacemine Energy Token (SET) for higher price.
    ```
    
### Definition

Definition is a page rendered from [object](#object).

Examples:
* "Alice" definition is generated from User object (`{email: 'alice@example.com'}`) 

Notes:
* Definition may be specified manually.
  * Example:
    * "Direct acquisition method" definition is specified manually.

### Data source

Data source is an API that provides read access to [books](#book).

Examples:
* GitHub (books in Markdown)
  * Can use REST API
  * Can't have step IDs
  * Can store code for story generator
* Workflowy (books in native format)
  * Can't use REST API
  * Can have step IDs
  * Can't store code for story generator
* Dynalist (books in native format)
  * Can use REST API
  * Can have step IDs
  * Can't store code for story generator
