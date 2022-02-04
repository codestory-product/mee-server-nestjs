const BODY_ITEMS = {
    'item0': 0,
    'item1': 0,
    'item2': 0,
    'item3': 0,
    'item4': 0,
    'item5': 0,
    'item6': 0,
    'item7': 0,
    'item8': 0,
    'item9': 0
};

const HAIR_ITEMS = {
    'item10': 0,
    'item11': 0,
    'item12': 0,
    'item13': 0,
    'item14': 0,
    'item15': 0,
    'item16': 0,
    'item17': 0,
    'item18': 0
}

function foundItemPrice(itemName: string, itemType: string): number {
    if(itemType === 'hair') {
        if(HAIR_ITEMS[itemName] === undefined) {
            return -1;
        }
        
        return HAIR_ITEMS[itemName];
    }
    else if(itemType === 'body') {
        if(BODY_ITEMS[itemName] === undefined) {
            return -1;
        }
        
        return BODY_ITEMS[itemName];
    }
    else {
        return -1;
    }
} 

export { BODY_ITEMS, HAIR_ITEMS, foundItemPrice };