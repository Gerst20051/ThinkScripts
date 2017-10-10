# The Ask SLM Ribbon is a momentum indicator that uses a combination of three exponential moving averages.
# When the averages are in alinement, with the "superfast" moving average above the "fast" moving average and the fast moving average above the "slow" moving average, the momentum condition is positive.
# A "buy signal" is generated, with an up arrow, when above conditions are met and a "clear bar" occurs; with the low of that bar is above all of the moving averages.
# The positive momentum ends if the superfast moving average touches the fast moving average; then condition is considered neutral and an oppostive arrow will appear.
# Negative momentum and a "Sell signal" are the opposite of the bullish conditions.
# Volume bars can be colored to match the Chart by clicking on Style>Settings>Appearance>Common, and color symbol as ticks

input price = close;
input superfast_length = 8;
input fast_length = 13;
input slow_length = 21;
input displace = 0;

def mov_avg8 = ExpAverage(price[-displace], superfast_length);
def mov_avg13 = ExpAverage(price[-displace], fast_length);
def mov_avg21 = ExpAverage(price[-displace], slow_length);

plot Superfast = mov_avg8;
plot Fast = mov_avg13;
plot Slow = mov_avg21;

def buy = mov_avg8 > mov_avg13 and mov_avg13 > mov_avg21 and low > mov_avg8;
def stopbuy = mov_avg8 <= mov_avg13;
def buynow = !buy[1] and buy;
def buysignal = CompoundValue(1, if buynow and !stopbuy then 1 else if buysignal[1] == 1 and stopbuy then 0 else buysignal[1], 0);

plot Buy_Signal = buysignal[1] == 0 and buysignal == 1;
Buy_Signal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
Buy_Signal.SetDefaultColor(Color.DARK_GREEN);
Buy_Signal.HideTitle();
Alert(condition = buysignal[1] == 0 and buysignal == 1, text = "Buy Signal", sound = Sound.Bell, "alert type" = Alert.BAR);

plot Momentum_Down = buysignal[1] == 1 and buysignal == 0;
Momentum_Down.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
Momentum_Down.SetDefaultColor(Color.PLUM);
Momentum_Down.HideTitle();
Alert(condition = buysignal[1] == 1 and buysignal == 0, text = "Momentum_Down", sound = Sound.Bell, "alert type" = Alert.BAR);

def sell = mov_avg8 < mov_avg13 and mov_avg13 < mov_avg21 and high < mov_avg8;
def stopsell = mov_avg8 >= mov_avg13;
def sellnow = !sell[1] and sell;
def sellsignal = CompoundValue(1, if sellnow and !stopsell then 1 else if sellsignal[1] == 1 and stopsell then 0 else sellsignal[1], 0);

plot Sell_Signal = sellsignal[1] == 0 and sellsignal;
Sell_Signal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
Sell_Signal.SetDefaultColor(Color.RED);
Sell_Signal.HideTitle();
Alert(condition = sellsignal[1] == 0 and sellsignal == 1, text = "Sell Signal", sound = Sound.Bell, "alert type" = Alert.BAR);

plot Momentum_Up = sellsignal[1] == 1 and sellsignal == 0;
Momentum_Up.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
Momentum_Up.SetDefaultColor(Color.PLUM);
Momentum_Up.HideTitle();
Alert(condition = sellsignal[1] == 1 and sellsignal == 0, text = "Momentum_Up", sound = Sound.Bell, "alert type" = Alert.BAR);

plot Colorbars = if buysignal == 1 then 1 else if sellsignal == 1 then 2 else if buysignal == 0 or sellsignal == 0 then 3 else 0;
Colorbars.Hide();
Colorbars.DefineColor("Buy_Signal_Bars", Color.DARK_GREEN);
Colorbars.DefineColor("Sell_Signal_Bars", Color.RED);
Colorbars.DefineColor("Neutral", Color.PLUM);
AssignPriceColor(if Colorbars == 1 then Colorbars.Color("buy_signal_bars") else if Colorbars == 2 then Colorbars.Color("Sell_Signal_bars") else  Colorbars.Color("neutral"));
