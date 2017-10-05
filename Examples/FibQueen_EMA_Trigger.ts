# FibQueen_EMA_Trigger
# http://www.simpleroptions.com/members/How-to-install-the-Fibqueen-EMA-Trigger-in-Think-or-Swim.cfm
# https://www.meetup.com/Dancing-Naked-On-Wall-Street/messages/43299622/

def price = close;
def fast_length = 8;
def slow_length = 34;
def displace = 0;
def fastema = ExpAverage(price[-displace], fast_length);
def slowema = ExpAverage(price[-displace], slow_length);

plot crossover = if fastema > slowema then 1 else 0;
crossover.AssignValueColor(if fastema > slowema then Color.BLUE else color.DARK_RED);

AssignBackgroundColor(if fastema > slowema then Color.BLUE else Color.DARK_RED);
