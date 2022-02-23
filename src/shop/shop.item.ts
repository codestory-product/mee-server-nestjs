const BODY_ITEMS = {
    'item0': 0,
    'item1': 1000,
    'item2': 3000,
    'item3': 4000,
    'item4': 8000,
    'item5': 3000,
    'item6': 2000,
    'item7': 1000,
    'item8': 2000,
    'item9': 1000
};

const HAIR_ITEMS = {
    'item10': 0,
    'item11': 2000,
    'item12': 3000,
    'item13': 3000,
    'item14': 5000,
    'item15': 6000,
    'item16': 8000,
    'item17': 8000,
    'item18': 8000
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