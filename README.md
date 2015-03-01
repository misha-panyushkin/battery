Creation and launch by default:
```
var b = Battery(params /*Object*/);
```
or 
```
var b = new Battery(params /*Object*/);
```

Any field inside `params` object could be omitted:
```
{
    wasted: Integer, // is battery already wasted or not [default:0].
    quantity: Number, // initial battery charge quantity [default:0].
    capacity: Number, // battery capacity [default:100].
    lifetime: Number, // battery lifetime in milliseconds, ommited for infinity lifetime [default:null].
    timeunit: Number, // step in milliseconds for charging and uncharging thing [default:1000].
}
```

Charging and uncharging the __Battery__ instance take place via connections to the instance.

Public API:
```
.setConnection(chargeHandler /*Function*/, unchargeHandler /*Function*/) // creates a connection to the battery;
// chargeHandler receives single argument - charger method which takes single input parameter - charging value and returns battery charge quantity;
// unchargeHandler receives single argument - uncharger method which takes single input parameter - uncharging value and returns battery uncharge quantity;
// returns connection id.

.removeConnection(id) // removes the connection to the battery by id.
```

By default, __Battery__ creates timer for each instace and handle each connection with the specified timeunit step.