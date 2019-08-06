# CheckMyTrades

CheckMyTrades allows investors to pick profitable traders for managing their assets.

## Stories
Trader learns about CheckMyTrades
Trader creates a public post with trade idea
Employee adds a comment
Text: "Are you a profitable trader? If yes - why not publish your trade history here: https://checkmytrades.tech/"
Trader clicks on CheckMyTrades link in comment
Investor learns about CheckMyTrades via trader profile
Trader learns about CheckMyTrades
https://workflowy.com/#/b235f6a47d79
Trader signs up
https://workflowy.com/#/7369824e08fb
Trader adds a link to CheckMyTrades to his profile
URL: https://checkmytrades.tech/CryptoCred 
Trader creates a public post with trade idea
Investor opens Trader profile
Investor clicks on CheckMyTrades link in Trader profile
Investor checks trade history
Investor decides to check whether CryptoCred the Trader is profitable
Investor opens https://checkmytrades.tech/CryptoCred
Investor selects metric calculation parameters
Period
Widget: Select with options
Last 3 months
Last 6 months
Last year
All time
Default: Last 3 months
Note: Set `from` and `to` fields when select changes
#rationale 
We'll add "Custom" option to select, allowing investor to choose custom date interval
Investor reads metrics calculated from CryptoCred trades
#notes 
Absolute values are displayed if Trader enables "Show trade amounts"
Metrics:
Profit: 23% (589 USD)
Drawdown: -40% (-2058 USD)
Final capital: 8150 USD
Investor clicks on "Next page"
Investor subscribes to "new trade" notifications
Investor opens https://checkmytrades.tech/CryptoCred
Investor sees an email subscription form
Investor enters his email
Investor clicks on "Subscribe"
Investor sees "Receive notifications in Telegram: https://t.me/CheckMyTradesBot?start=CryptoCred"
Investor clicks on link
Investor confirms subscription to CryptoCred trades
Trader signs up
Trader opens https://checkmytrades.tech/
Trader clicks "Sign up"
Trader enters his email & password
System sends a confirmation email
Trader confirms his email
Trader adds exchange account
Trader clicks "Add exchange account"
Trader reads: "Read-only permissions required - we can't place orders or initiate withdrawals"
#rationale 
Trader fears that his API key will be used to place orders
Trader selects exchange
Trader reads a complete instruction with screenshots that describes how to get an API key for selected exchange
Trader enters API key
Trader enters API secret
Trader unchecks "Show trade amounts" checkbox
#notes 
Checked by default
Trader submits form
~ System saves API key & secret if form is valid
System checks if API key & secret are valid
System makes a single API request to read trade history
System doesn't make additional API requests to read full trade history
#rationale 
Trader doesn't want to wait
~ System displays errors if form is invalid
[draft] System calculates "Profit" metric
#decisions 
How to calculate metric if position has been taken before selected period?
Ideally: get full trade history, calculate position open and close timestamps, exclude open positions from selected period
How to calculate metric if position has been taken on one exchange and closed on another?
Track all exchanges
Show position as pending if Trader hasn't connected another exchange
How to calculate metric if position has been opened / closed on exchange that is already down?
Allow to manually add trades
Mark them as added manually
How to calculate metric over deposits / withdrawals?
Use position size for calculations
Calculate profit per unit of base asset?
[draft] Trader chooses an unsupported exchange while adding API key
[draft] Investor receives a notification with full trade idea (including stop-loss & take-profit levels)
User requests a feature
User opens https://checkmytrades.tech/
User clicks "Send message" icon in bottom-right corner
User joins Telegram group
User sends a message with feature request
CEO develops CheckMyTrades
CEO publishes service description
CEO finds a trader acquisition channel
#notes 
Traders provide content
CEO validates the channel by receiving 10 subscriptions with min 5% conversion rate
CEO finds an investor acquisition channel
CEO tests "Investor learns about CheckMyTrades via trader profile"
https://workflowy.com/#/56d08e29137d
CEO validates channel by reaching 10 links total & 50 unique visitors per day
#tasks 
Launch "Show your trades" campaign
Ask influencers to disclose their trade history (without disclosing amounts)

## Definitions 

### Trader
* Fears losing status
  * Fears being perceived as unprofitable trader
* Fears losing wealth
  * Fears disclosing his capital amount
  * Fears being frontrun by its followers
    * Allow to hide recent X days of trade history (only show that trade happened)
  * Fears that his API key will be used to place orders / initiate withdrawals

### Investor
* Fears losing wealth
* Fears investing in unprofitable traders / bots
* Fears missing out on investing in profitable traders / bots
  * Profitable traders / bots limit their investment capital, because their strategies become less profitable with higher capital amounts