# ST John Carter 10X Bars
# https://groups.yahoo.com/neo/groups/TOS_thinkscript/conversations/topics/31184?reverse=1

declare lower;

input length = 14;
input averageType = AverageType.WILDERS;

def hiDiff = high - high[1];
def loDiff = low[1] - low;

def plusDM = if hiDiff > loDiff and hiDiff > 0 then hiDiff else 0;
def minusDM = if loDiff > hiDiff and loDiff > 0 then loDiff else 0;

def ATR = MovingAverage(averageType, TrueRange(high, close, low), length);
plot "DI+" = 100 * MovingAverage(averageType, plusDM, length) / ATR;
plot "DI-" = 100 * MovingAverage(averageType, minusDM, length) / ATR;

def DX = if ("DI+" + "DI-" > 0) then 100 * AbsValue("DI+" - "DI-") / ("DI+" + "DI-") else 0;
plot ADX = MovingAverage(averageType, DX, length);

"DI+".SetDefaultColor(GetColor(1));
"DI-".SetDefaultColor(GetColor(8));
ADX.SetDefaultColor(GetColor(5));

AddLabel(yes, "Sell20", if "DI-" > "DI+" && ADX > 20 then Color.RED else Color.GRAY);
AddLabel(yes, "Buy20", if "DI-" < "DI+" && ADX > 20 then Color.GREEN else Color.GRAY);

AddLabel(yes, "Sell30", if "DI-" > "DI+" && ADX > 30 then Color.RED else Color.GRAY);
AddLabel(yes, "Buy30", if "DI-" < "DI+" && ADX > 30 then Color.GREEN else Color.GRAY);

AssignPriceColor(if "DI-" > "DI+" && ADX > 20 then Color.RED else if "DI-" < "DI+" && ADX > 20 then Color.GREEN else Color.YELLOW);
