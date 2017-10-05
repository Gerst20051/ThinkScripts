# John Ehlers' Forward and Reversed EMA
# https://www.reddit.com/r/wallstreetbets/comments/6l2w9t/another_tos_script_john_ehlers_forward_and/

input tradesize = 1;
input AA = 0.1;

def CC = 1 - AA;
def EMA = AA * close + CC * EMA[1];
def RE1 = CC * EMA + EMA[1];
def RE2 = Power(CC, 2) * RE1 + RE1[1];
def RE3 = Power(CC, 4) * RE2 + RE2[1];
def RE4 = Power(CC, 8) * RE3 + RE3[1];
def RE5 = Power(CC, 16) * RE4 + RE4[1];
def RE6 = Power(CC, 32) * RE5 + RE5[1];
def RE7 = Power(CC, 64) * RE6 + RE6[1];
def RE8 = Power(CC, 128) * RE7 + RE7[1];
def Signal = EMA - AA * RE8;
def svalue = Signal;
def zeroline = 0;

################ LONG ENTRY
def longsignal = Signal > 0;

################ SHORT ENTRY
def signalshort = Signal < 0;

################ LONG EXIT
def longexit = Signal < 0;

################ SHORT EXIT
def shortexit = Signal > 0;

################ ENTRY ORDERS
AddOrder(OrderType.BUY_TO_OPEN, longsignal, open[-1], tradesize, Color.CYAN, Color.CYAN);
AddOrder(OrderType.SELL_TO_OPEN, signalshort, open[-1], tradesize, Color.GREEN, Color.GREEN);

################ EXIT ORDERS
AddOrder(OrderType.SELL_TO_CLOSE, longexit, open[-1], tradesize, Color.MAGENTA, Color.MAGENTA);
AddOrder(OrderType.BUY_TO_CLOSE, shortexit, open[-1], tradesize, Color.MAGENTA, Color.MAGENTA);
