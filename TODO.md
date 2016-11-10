* Allow users to join games
    * Create Game Plays Table
        * Capture userId, betAmount, hash of (userId, betAmount, serverBetSeed)
    * Create Ledger
        * Id
        * User_id
        * source_txn_id - Bitcoin Transaction ID
        * balance_before
        * balance_after
        * balance_type - Allows us to hold multiple user balances (Currencies)
        * Txn Types: Deposit, Withdrawal, Transfer, Bet, Cancel Bet, Winnings, House Cut, Invest
    * Socket.io
        * Create Global Channel for Games
        * Global Chat Channel
        * 