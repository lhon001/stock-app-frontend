# README stock-app-backend
# Motivation/Inspiration
-The 2008/2009 Market Crash left an indelible mark on millennials scaring them from seeing the stock market as an investment tool that will allow them to live comfortable when they retire.

-My hope for this app, in addition to utilizing everything that I have learned these past 15 weeks, is to allow people to view their stocks easily and begin investing in index funds. I also hope to implement a paper trading component that will allow people to trade in fake currency but still see how easy it is to begin investing.

# User Story
-As a user, I can create and account, create a portfolio, search for stocks and save stocks to a portfolio

# Components
* Index
* App
  * -User
    * -CreateUser
    * -DisplayUser

  * -StockContainer
    * -StockInput
    * -DisplayStock

# Model Associations
  * User has_many portfolios
  * User has_many stocks through portfolios

  * Portfolio belongs_to User
  * Portfolio has_many stocks through PortfolioStocks

  * Stock has_many portfolios through PortfolioStocks

  * PortfolioStocks belongs_to Stock
  * PortfolioStocks belongs_to Portfolio

# Data Tables
  * User
      * -name
      * -email
      * -password

  * Portfolio
      * -name
      * -user_id

  * Stock
      * -companyName
      * -symbol

  * PortfolioStocks
      * -stock_id
      * -portfolio_id

# Technologies Used
API: IEX for stock data, TradingView for charting

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# stock-app-backend
