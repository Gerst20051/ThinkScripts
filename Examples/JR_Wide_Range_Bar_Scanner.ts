# Josiah Redding's WIDE RANGE BAR scanner
# Shows any stocks that meet Alphonso Esposito's criteria for the WRB strategy.
# My other gap scans and studies for TOS are at my site at http://thinkorswim.net

# CUSTOMIZABLE SETTINGS:
# ATR multiple = min 2.5x the normal average true range for the stock
# Avg Volume multiple = I chose a min. of 125% of average volume (1.25)
# ATR / Avg Volume length = moving average lookback period in bars
# Wick % = 10% by default. Can't have > 10% wick on side of the direction of the bar. (Up bar needs < 10% wick on the top). (.10)
# Retrace % = 40% by default. (.40)

# YOU CAN CUSTOMIZE THIS SECTION'S VALUES:
input atrMult = 2.5;
input avgVolMult = 1.25;
input atrLength = 20;
input volAvgLength = 20;
input wickPercent = .10;
input percentRetrace = .40;
input showRetraceLine = Yes;

# DON'T TOUCH THE CODE BELOW HERE
def wrb = TrueRange(high = high, close = close, low = low) > ATR(length = atrLength, "average type" = "SIMPLE") * atrMult;
def highVol = volume >= SimpleMovingAvg(length = volAvgLength, price = volume) * avgVolMult;
def downDay = close < open;
def topWickSize = if downDay then high - open else high - close;
def bottomWickSize = if downDay then close - low else open - low;
def barSize = high - low;
def topWickPercent = topWickSize / barSize;
def bottomWickPercent = bottomWickSize / barSize;
def meetsWickPercent = (downDay and bottomWickPercent <= wickPercent) or (!downDay and topWickPercent <= wickPercent);

plot meetsCriteria = wrb and meetsWickPercent and highVol;
